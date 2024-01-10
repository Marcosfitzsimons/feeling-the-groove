/*
  Warnings:

  - Added the required column `djs` to the `raves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "raves" ADD COLUMN     "djs" TEXT NOT NULL;
