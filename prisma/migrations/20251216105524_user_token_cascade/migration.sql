-- DropForeignKey
ALTER TABLE "AccountActivationToken" DROP CONSTRAINT "AccountActivationToken_userId_fkey";

-- AddForeignKey
ALTER TABLE "AccountActivationToken" ADD CONSTRAINT "AccountActivationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
