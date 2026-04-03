/*
  Warnings:

  - Made the column `price` on table `OrderEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderEvent" ALTER COLUMN "price" SET NOT NULL;
