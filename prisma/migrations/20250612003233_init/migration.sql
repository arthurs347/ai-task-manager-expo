/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('LOW', 'MED', 'HIGH', 'CRIT');

-- CreateEnum
CREATE TYPE "PriorityCategory" AS ENUM ('LOW', 'MED', 'HIGH', 'CRIT');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priorityLevel" "PriorityLevel" NOT NULL,
    "priorityScore" INTEGER,
    "priorityCategory" "PriorityCategory",
    "startCalculated" TEXT NOT NULL,
    "endCalculated" TEXT NOT NULL,
    "dueDateTime" TEXT NOT NULL,
    "estimatedDuration" TEXT NOT NULL,
    "isHardDeadline" BOOLEAN NOT NULL,
    "isRecurring" BOOLEAN NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
