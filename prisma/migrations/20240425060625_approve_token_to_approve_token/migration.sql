/*
 Warnings:
 
 - You are about to drop the column `approveToken` on the `review` table. All the data in the column will be lost.
 - A unique constraint covering the columns `[approve_token]` on the table `review` will be added. If there are existing duplicate values, this will fail.
 
 */
-- DropIndex
DROP INDEX "review_approveToken_key";
-- AlterTable
ALTER TABLE "review" DROP COLUMN "approveToken",
  ADD COLUMN "approve_token" VARCHAR(36);
-- CreateIndex
CREATE UNIQUE INDEX "review_approve_token_key" ON "review"("approve_token");