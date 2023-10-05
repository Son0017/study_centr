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

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
