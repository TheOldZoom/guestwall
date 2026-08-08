import { prisma } from "../libs/prisma";
import { GuestWallError } from "../libs/errors";

export { GuestWallError };

export async function getGuestWallBySlug(slug: string) {
  const wall = await prisma.guestWall.findUnique({
    where: {
      slug,
    },
    select: {
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
    },
  });

  if (!wall) {
    throw new GuestWallError("GuestWall not found", 404);
  }

  return wall;
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
    select: {
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
    },
  });

  if (!wall) {
    throw new GuestWallError("Failed to create GuestWall", 500);
  }

  return wall;
}
