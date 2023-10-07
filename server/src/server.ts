import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import courseRouter from "./routes/course.routes";
import roomRouter from "./routes/room.routes";
import studentRouter from "./routes/student.routes";
import studentDebtRouter from "./routes/studentDebt.routes";
import studentsCoursesRouter from "./routes/studentsCourses.routes";
import teacherRouter from "./routes/teacher.routes";
import { auth } from "./auth/auth";
import prisma from "./connection/prisma";
config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/course", auth, courseRouter);
app.use("/student", auth, studentRouter);
app.use("/teacher", teacherRouter);
app.use("/studentDebt", auth, studentDebtRouter);
app.use("/studentsCourses", auth, studentsCoursesRouter);
app.use("/room", auth, roomRouter);

const PORT = process.env.Port || 8080;

export const myF = async () => {
  try {
    const debt = await prisma.studentsCourses.findMany({
      include: { course: true },
    });

    debt.map(async (student) => {
      if (student.course.status) {
        let debt_summa = 0;
        let teacher = 0;
        let course_id = student.course_id;
        let student_id = student.student_id;
        let lastMon = new Date(student.student_acsept_date as any).getMonth();
        if (lastMon !== new Date().getMonth()) {
          debt_summa = student.course.price;
          teacher = student.course.price * 0.5;
        } else {
          debt_summa = student.debt_summa;
        }

        const data = await prisma.studentDebt.findFirst({
          where: {
            AND: {
              student_id,
              course_id,
            },
          },
        });
        if (data) {
          let last = data && new Date(data?.createdAt as any).getMonth();
          if (last !== new Date().getMonth()) {
            await prisma.studentDebt.create({
              data: {
                debt_summa: true,
                summa: debt_summa,
                course_id,
                student_id,
                teacher_payout: teacher,
              },
            });
          }
        } else {
          await prisma.studentDebt.create({
            data: {
              debt_summa: true,
              summa: debt_summa,
              course_id,
              student_id,
              teacher_payout: teacher,
            },
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
