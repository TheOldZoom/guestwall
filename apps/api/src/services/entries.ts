import { prisma } from "../libs/prisma";
import { GuestWallError } from "./guestWalls";

const PAGE_SIZE = 20;

type EntryCursor = {
  pinned: boolean;
  createdAt: string;
  id: string;
};

export async function getEntriesByGuestWallSlug(slug: string, cursor?: string) {
  const wall = await prisma.guestWall.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (!wall) {
    throw new GuestWallError("GuestWall not found", 404);
  }

  let cursorData: EntryCursor | undefined;

  if (cursor) {
    try {
      cursorData = JSON.parse(Buffer.from(cursor, "base64url").toString());
    } catch {
      throw new GuestWallError("Invalid cursor", 400);
    }
  }

  const entries = await prisma.guestWallEntry.findMany({
    where: {
      guestWallId: wall.id,
      status: "APPROVED" as const,

      ...(cursorData && {
        OR: [
          {
            pinned: cursorData.pinned,
            createdAt: {
              lt: new Date(cursorData.createdAt),
            },
          },
          {
            pinned: cursorData.pinned,
            createdAt: new Date(cursorData.createdAt),
            id: {
              lt: cursorData.id,
            },
          },
          ...(cursorData.pinned ? [{ pinned: false }] : []),
        ],
      }),
    },

    select: {
      id: true,
      name: true,
      content: true,
      website: true,
      pinned: true,
      createdAt: true,
    },

    orderBy: [
      {
        pinned: "desc",
      },
      {
        createdAt: "desc",
      },
      {
        id: "desc",
      },
    ],

    take: PAGE_SIZE + 1,
  });

  const hasNextPage = entries.length > PAGE_SIZE;

  if (hasNextPage) {
    entries.pop();
  }

  const lastEntry = entries[entries.length - 1];

  const nextCursor =
    hasNextPage && lastEntry
      ? Buffer.from(
          JSON.stringify({
            pinned: lastEntry.pinned,
            createdAt: lastEntry.createdAt.toISOString(),
            id: lastEntry.id,
          }),
        ).toString("base64url")
      : null;

  return {
    entries,
    nextCursor,
  };
}

export async function createEntry(
  slug: string,
  data: {
    name: string;
    content: string;
    website?: string;
  },
) {
  const wall = await prisma.guestWall.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      guestWallSettings: {
        select: {
          requireApproval: true,
        },
      },
    },
  });

  if (!wall) {
    throw new GuestWallError("GuestWall not found", 404);
  }

  const requireApproval = wall.guestWallSettings[0]?.requireApproval ?? false;

  const entry = await prisma.guestWallEntry.create({
    data: {
      guestWallId: wall.id,
      name: data.name.trim(),
      content: data.content.trim(),
      website: data.website?.trim() || null,
      status: requireApproval ? "PENDING" : "APPROVED",
    },
    select: {
      id: true,
      name: true,
      content: true,
      website: true,
      status: true,
      createdAt: true,
    },
  });

  return entry;
}
