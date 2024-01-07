/*
  Warnings:

  - You are about to drop the column `Candy` on the `raves` table. All the data in the column will be lost.
  - Added the required column `candy` to the `raves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "raves" DROP COLUMN "Candy",
ADD COLUMN     "candy" TEXT NOT NULL;
