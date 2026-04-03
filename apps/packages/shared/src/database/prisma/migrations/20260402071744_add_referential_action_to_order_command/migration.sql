-- DropForeignKey
ALTER TABLE "OrderCommand" DROP CONSTRAINT "OrderCommand_userId_fkey";

-- AddForeignKey
ALTER TABLE "OrderCommand" ADD CONSTRAINT "OrderCommand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
