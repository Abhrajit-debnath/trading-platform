/*
  Warnings:

  - The `price` column on the `OrderEvent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OrderCommand" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "stopPrice" DROP NOT NULL,
ALTER COLUMN "stopPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OrderEvent" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION;
