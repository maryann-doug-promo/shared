/*
  Warnings:

  - A unique constraint covering the columns `[approveToken]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "approveToken" VARCHAR(36);

-- CreateIndex
CREATE UNIQUE INDEX "review_approveToken_key" ON "review"("approveToken");
