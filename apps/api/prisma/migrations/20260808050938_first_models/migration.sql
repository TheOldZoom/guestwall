-- CreateEnum
CREATE TYPE "GuestWallEntryStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "displayName" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestWall" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "GuestWall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestWallSetting" (
    "id" TEXT NOT NULL,
    "guestWallId" TEXT NOT NULL,
    "requireApproval" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestWallSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestWallEntry" (
    "id" TEXT NOT NULL,
    "guestWallId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "website" TEXT,
    "status" "GuestWallEntryStatus" NOT NULL DEFAULT 'PENDING',
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT,
    "ipAddressExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestWallEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GuestWall_slug_key" ON "GuestWall"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GuestWallSetting_guestWallId_key" ON "GuestWallSetting"("guestWallId");

-- CreateIndex
CREATE INDEX "GuestWallEntry_guestWallId_status_idx" ON "GuestWallEntry"("guestWallId", "status");

-- CreateIndex
CREATE INDEX "GuestWallEntry_guestWallId_createdAt_idx" ON "GuestWallEntry"("guestWallId", "createdAt");

-- AddForeignKey
ALTER TABLE "GuestWall" ADD CONSTRAINT "GuestWall_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestWallSetting" ADD CONSTRAINT "GuestWallSetting_guestWallId_fkey" FOREIGN KEY ("guestWallId") REFERENCES "GuestWall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestWallEntry" ADD CONSTRAINT "GuestWallEntry_guestWallId_fkey" FOREIGN KEY ("guestWallId") REFERENCES "GuestWall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
