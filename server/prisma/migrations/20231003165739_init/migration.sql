/*
  Warnings:

  - Added the required column `debt_summa` to the `StudentDebt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentDebt" ADD COLUMN     "debt_summa" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "TeacherSolary" (
    "id" SERIAL NOT NULL,
    "summa" DOUBLE PRECISION NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherSolary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherSolary" ADD CONSTRAINT "TeacherSolary_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
