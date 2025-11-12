-- DropForeignKey
ALTER TABLE `hotelamenity` DROP FOREIGN KEY `HotelAmenity_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `hotelimage` DROP FOREIGN KEY `HotelImage_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `roomrewardconfig` DROP FOREIGN KEY `RoomRewardConfig_roomId_fkey`;

-- DropIndex
DROP INDEX `HotelAmenity_hotelId_fkey` ON `hotelamenity`;

-- DropIndex
DROP INDEX `HotelImage_hotelId_fkey` ON `hotelimage`;

-- DropIndex
DROP INDEX `Room_hotelId_fkey` ON `room`;

-- DropIndex
DROP INDEX `RoomRewardConfig_roomId_fkey` ON `roomrewardconfig`;

-- AddForeignKey
ALTER TABLE `HotelAmenity` ADD CONSTRAINT `HotelAmenity_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelImage` ADD CONSTRAINT `HotelImage_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomRewardConfig` ADD CONSTRAINT `RoomRewardConfig_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
