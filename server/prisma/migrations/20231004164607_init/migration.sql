/*
  Warnings:

  - Changed the type of `debt_summa` on the `StudentDebt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "StudentDebt" DROP COLUMN "debt_summa",
ADD COLUMN     "debt_summa" BOOLEAN NOT NULL;
