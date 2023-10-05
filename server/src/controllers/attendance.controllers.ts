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

export const createStudent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
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

export const getStudent = async (req: Request, res: Response) => {};
