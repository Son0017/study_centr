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
    const status = await prisma.course.findFirst(body.courseId);
    if (!status) {
      throw new Error(`There is such a Course`);
    }
    if (!body.id) {
      notStudentConnection({ ...body, course: status });
    } else {
      studentConnection({ id: body.id, course: status as any });
    }
    createSend(res, {
      message: "connection is successfull",
    });
  } catch (error) {
    errorCreate(res, error);
  }
};
