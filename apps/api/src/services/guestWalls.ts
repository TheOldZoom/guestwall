import { prisma } from "../libs/prisma";
import { GuestWallError } from "../libs/errors";

export { GuestWallError };

const PAGE_SIZE = 20;

const reservedGuestWallNames = new Set([
  "privacy",
  "terms",
  "about",
  "contact",
  "api",
  "auth",
  "profile",
  "dashboard",
  "index",
  "status",
  "faq",
  "legal",
]);

const wallSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  createdAt: true,
  owner: {
    select: {
      id: true,
      username: true,
      displayName: true,
    },
  },
  guestWallSettings: {
    select: {
      requireApproval: true,
    },
  },
} as const;

export function isReservedGuestWallName(slug: string) {
  return reservedGuestWallNames.has(slug.toLowerCase().trim());
}

type RawWall = {
  guestWallSettings: { requireApproval: boolean }[];
} & Record<string, unknown>;

function formatWall<T extends RawWall>(wall: T) {
  const { guestWallSettings, ...rest } = wall;
  return {
    ...rest,
    requireApproval: guestWallSettings[0]?.requireApproval ?? false,
  };
}

async function getOwnedWall(slug: string, userId: string) {
  const wall = await prisma.guestWall.findUnique({
    where: { slug },
    select: { id: true, ownerId: true },
  });

  if (!wall) {
    throw new GuestWallError("GuestWall not found", 404);
  }

  if (wall.ownerId !== userId) {
    throw new GuestWallError("Forbidden", 403);
  }

  return wall;
}

export async function getGuestWallBySlug(slug: string) {
  const wall = await prisma.guestWall.findUnique({
    where: {
      slug,
    },
    select: wallSelect,
  });

  if (!wall) {
    throw new GuestWallError("GuestWall not found", 404);
  }

  return formatWall(wall);
}

export async function createGuestWall(
  data: {
    slug: string;
    title: string;
    description?: string;
    requireApproval: boolean;
  },
  ownerId: string,
) {
  const slug = data.slug.toLowerCase().trim();

  if (isReservedGuestWallName(slug)) {
    throw new GuestWallError("Slug is reserved", 400);
  }

  const existingWall = await prisma.guestWall.findUnique({
    where: {
      slug,
    },
  });

  if (existingWall) {
    throw new GuestWallError("GuestWall already exists", 409);
  }

  const wall = await prisma.guestWall.create({
    data: {
      slug,
      title: data.title.trim(),
      description: data.description?.trim(),
      ownerId,
      guestWallSettings: {
        create: {
          requireApproval: data.requireApproval,
        },
      },
    },
    select: wallSelect,
  });

  if (!wall) {
    throw new GuestWallError("Failed to create GuestWall", 500);
  }

  return formatWall(wall);
}

export async function updateGuestWall(
  slug: string,
  data: {
    title?: string;
    description?: string;
    requireApproval?: boolean;
  },
  userId: string,
) {
  if (
    data.title === undefined &&
    data.description === undefined &&
    data.requireApproval === undefined
  ) {
    throw new GuestWallError("No fields to update", 400);
  }

  const wall = await getOwnedWall(slug, userId);

  const updated = await prisma.guestWall.update({
    where: { id: wall.id },
    data: {
      ...(data.title !== undefined && { title: data.title.trim() }),
      ...(data.description !== undefined && {
        description: data.description.trim() || null,
      }),
      ...(data.requireApproval !== undefined && {
        guestWallSettings: {
          updateMany: {
            where: {},
            data: { requireApproval: data.requireApproval },
          },
        },
      }),
    },
    select: wallSelect,
  });

  return formatWall(updated);
}

export async function deleteGuestWall(slug: string, userId: string) {
  const wall = await getOwnedWall(slug, userId);

  await prisma.$transaction([
    prisma.guestWallEntry.deleteMany({ where: { guestWallId: wall.id } }),
    prisma.guestWallSetting.deleteMany({ where: { guestWallId: wall.id } }),
    prisma.guestWall.delete({ where: { id: wall.id } }),
  ]);
}

type WallCursor = {
  createdAt: string;
  id: string;
};

export async function getGuestWallsByOwner(userId: string, cursor?: string) {
  let cursorData: WallCursor | undefined;

  if (cursor) {
    try {
      cursorData = JSON.parse(Buffer.from(cursor, "base64url").toString());
    } catch {
      throw new GuestWallError("Invalid cursor", 400);
    }
  }

  const walls = await prisma.guestWall.findMany({
    where: {
      ownerId: userId,
      ...(cursorData && {
        OR: [
          { createdAt: { lt: new Date(cursorData.createdAt) } },
          {
            createdAt: new Date(cursorData.createdAt),
            id: { lt: cursorData.id },
          },
        ],
      }),
    },
    select: wallSelect,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: PAGE_SIZE + 1,
  });

  const hasNextPage = walls.length > PAGE_SIZE;
  if (hasNextPage) {
    walls.pop();
  }

  const lastWall = walls[walls.length - 1];

  const nextCursor =
    hasNextPage && lastWall
      ? Buffer.from(
          JSON.stringify({
            createdAt: (lastWall.createdAt as Date).toISOString(),
            id: lastWall.id,
          }),
        ).toString("base64url")
      : null;

  return {
    guestWalls: walls.map(formatWall),
    nextCursor,
  };
}
