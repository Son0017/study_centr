/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `StudentDebt` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "StudentsCourses" DROP CONSTRAINT "StudentsCourses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentsCourses" DROP CONSTRAINT "StudentsCourses_student_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "StudentDebt_createdAt_key" ON "StudentDebt"("createdAt");

-- AddForeignKey
ALTER TABLE "StudentsCourses" ADD CONSTRAINT "StudentsCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsCourses" ADD CONSTRAINT "StudentsCourses_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
