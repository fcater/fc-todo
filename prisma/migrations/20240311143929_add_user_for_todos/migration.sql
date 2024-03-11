-- AlterTable
ALTER TABLE `todo` ADD COLUMN `createdByUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
