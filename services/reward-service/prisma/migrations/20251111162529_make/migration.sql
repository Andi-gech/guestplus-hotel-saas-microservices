/*
  Warnings:

  - You are about to drop the column `userId` on the `rewardtransaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Reward` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rewardId` to the `RewardTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rewardtransaction` DROP COLUMN `userId`,
    ADD COLUMN `rewardId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Reward_userId_key` ON `Reward`(`userId`);

-- AddForeignKey
ALTER TABLE `RewardTransaction` ADD CONSTRAINT `RewardTransaction_rewardId_fkey` FOREIGN KEY (`rewardId`) REFERENCES `Reward`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
