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

    body.status = body.status ? body.status : false;
    const Student = await prisma.student.create({
      data: body,
    });
    createSend(res, Student);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const Student = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: {
        ...body,
      },
    });
    updateSend(res, Student);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedStudent = await prisma.student.delete({
      where: { id: Number(id) },
    });
    return deleteSend(res, deletedStudent.id);
  } catch (error) {
    errorDelete(res, error);
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let student;
    let query: any = {};
    if (id) {
      const students = await prisma.student.findFirst({
        where: {
          ...query,
        },
        include: {
          course: {
            include: {
              course: true,
            },
          },
        },
      });
      console.log(students);

      student = students;
    } else {
      const students = await prisma.student.findMany({});
      student = students;
    }

    getSend(res, student);
  } catch (error) {
    errorGet(res, error);
  }
};
