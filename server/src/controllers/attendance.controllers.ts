import { Request, Response } from "express";
import prisma from "../connection/prisma";
import {
  createSend,
  custumRequest,
  deleteSend,
  errorCreate,
  errorDelete,
  errorGet,
  getSend,
} from "../providers/helperForSend";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);

    const Student = await prisma.attendance.create({
      data: body,
    });
    createSend(res, Student);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = (req as custumRequest).user;

    if (student.type === "ADMIN") {
      const deletedStudent = await prisma.student.delete({
        where: { id: Number(id) },
      });
      return deleteSend(res, deletedStudent.id);
    } else {
      throw new Error("Student is not admin");
    }
  } catch (error) {
    errorDelete(res, error);
  }
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dates = new Date();

    let query = `${dates.getFullYear()}-${dates.getMonth()}-${dates.getDate()}`;

    const user = (req as custumRequest).user;
    let uve: any = {};
    if (user.type === "TEACHER") {
      uve.course = {
        teacher_id: user.id,
      };
    }
    const data = prisma.attendance.findFirst({
      where: {
        AND: {
          date: new Date(query),
          course_id: Number(id),
        },
      },
    });
    const student = prisma.studentsCourses.findMany({
      where: {
        AND: {
          course_id: Number(id),
          ...uve,
        },
      },
      include: {
        student: true,
      },
    });

    const [attendance, students] = await prisma.$transaction([data, student]);

    getSend(res, {
      students,
      attendance: attendance?.attendace ? attendance?.attendace : [],
    });
  } catch (error) {
    errorGet(res, error);
  }
};
