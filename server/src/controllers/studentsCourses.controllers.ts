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
  updateSend,
} from "../providers/helperForSend";
import {
  notStudentConnection,
  studentConnection,
} from "../providers/connectStudentWithCourse";

export const createStudentCourse = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    const status = await prisma.course.findFirst({
      where: {
        id: body.courseId,
      },
    });
    let response: any;

    if (!body.id) {
      response = await notStudentConnection({ ...body, course: status });
    } else {
      response = await studentConnection({
        id: body.id,
        course: status as any,
      });
    }
    createSend(res, response?.student);
  } catch (error) {
    // console.log(error);

    errorCreate(res, error);
  }
};

export const getStudentCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);

    const data = await prisma.studentsCourses.findMany({
      where: {
        course_id: Number(id),
      },
      include: {
        student: true,
      },
    });

    getSend(res, data);
  } catch (error) {
    errorGet(res, error);
  }
};

export const deleteStudentCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let student_id = id.split(",")[0];
    let course_id = id.split(",")[1];
    const data = await prisma.studentsCourses.delete({
      where: {
        student_id_course_id: {
          student_id: Number(student_id),
          course_id: Number(course_id),
        },
      },
    });
    deleteSend(res, data);
  } catch (error) {
    errorDelete(res, error);
  }
};
