/*
  Warnings:

  - You are about to drop the column `anecdotes` on the `raves` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "raves"
RENAME COLUMN "anecdotes" TO "memories";
