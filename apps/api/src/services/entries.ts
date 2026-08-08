import { prisma } from "../libs/prisma";
import { GuestWallError } from "./guestWalls";
import { containsBannedWord } from "../libs/profanityFilter";

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

  const name = data.name.trim();
  const content = data.content.trim();

  const flagged = containsBannedWord(name) || containsBannedWord(content);

  const entry = await prisma.guestWallEntry.create({
    data: {
      guestWallId: wall.id,
      name,
      content,
      website: data.website?.trim() || null,
      status: requireApproval || flagged ? "PENDING" : "APPROVED",
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

export async function getOwnedWallId(slug: string, userId: string) {
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

  return wall.id;
}

export async function getEntriesForModeration(
  slug: string,
  userId: string,
  options: { cursor?: string; status?: "PENDING" | "APPROVED" | "REJECTED" },
) {
  const wallId = await getOwnedWallId(slug, userId);

  let cursorData: EntryCursor | undefined;

  if (options.cursor) {
    try {
      cursorData = JSON.parse(
        Buffer.from(options.cursor, "base64url").toString(),
      );
    } catch {
      throw new GuestWallError("Invalid cursor", 400);
    }
  }

  const entries = await prisma.guestWallEntry.findMany({
    where: {
      guestWallId: wallId,
      ...(options.status && { status: options.status }),
      ...(cursorData && {
        OR: [
          {
            pinned: cursorData.pinned,
            createdAt: { lt: new Date(cursorData.createdAt) },
          },
          {
            pinned: cursorData.pinned,
            createdAt: new Date(cursorData.createdAt),
            id: { lt: cursorData.id },
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
      status: true,
      pinned: true,
      createdAt: true,
    },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }, { id: "desc" }],
    take: PAGE_SIZE + 1,
  });

  const hasNextPage = entries.length > PAGE_SIZE;
  if (hasNextPage) entries.pop();

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

  return { entries, nextCursor };
}

async function updateOwnedEntry(
  slug: string,
  entryId: string,
  userId: string,
  data: Parameters<typeof prisma.guestWallEntry.updateMany>[0]["data"],
) {
  const wallId = await getOwnedWallId(slug, userId);

  const { count } = await prisma.guestWallEntry.updateMany({
    where: { id: entryId, guestWallId: wallId },
    data,
  });

  if (count === 0) {
    throw new GuestWallError("Entry not found", 404);
  }

  return prisma.guestWallEntry.findUnique({
    where: { id: entryId },
    select: {
      id: true,
      name: true,
      content: true,
      website: true,
      status: true,
      pinned: true,
      createdAt: true,
    },
  });
}

export function approveEntry(slug: string, entryId: string, userId: string) {
  return updateOwnedEntry(slug, entryId, userId, { status: "APPROVED" });
}

export function rejectEntry(slug: string, entryId: string, userId: string) {
  return updateOwnedEntry(slug, entryId, userId, { status: "REJECTED" });
}

export function pinEntry(slug: string, entryId: string, userId: string) {
  return updateOwnedEntry(slug, entryId, userId, { pinned: true });
}

export function unpinEntry(slug: string, entryId: string, userId: string) {
  return updateOwnedEntry(slug, entryId, userId, { pinned: false });
}

export async function deleteEntry(
  slug: string,
  entryId: string,
  userId: string,
) {
  const wallId = await getOwnedWallId(slug, userId);

  const { count } = await prisma.guestWallEntry.deleteMany({
    where: { id: entryId, guestWallId: wallId },
  });

  if (count === 0) {
    throw new GuestWallError("Entry not found", 404);
  }
}
