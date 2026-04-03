/*
  Warnings:

  - Added the required column `stopPrice` to the `OrderCommand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderCommand" ADD COLUMN     "stopPrice" INTEGER NOT NULL;
