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
    console.log(body.last_name);

    const Student = await prisma.student.create({
      data: {
        last_name: body.last_name,
        first_name: body.first_name,
        phone_number: body.phone_number,
        status: body.status,
        visited_date: body.visited_date,
      },
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
    let data: any = {};
    Object.keys(body).forEach((key) => {
      data[key] = body[key];
    });

    const Student = await prisma.student.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
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
    const { search, course_id } = req.query;
    let student;
    let query: any = {};
    if (id) {
      query.id = Number(id);
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
      student = students;
    } else {
      if (course_id) {
        query.course = {
          every: {
            course_id: {
              not: Number(course_id),
            },
          },
        };
      }
      if (search) {
        if (Number(search)) {
          query.id = Number(search);
        } else {
          query.last_name = {
            startsWith: search ? (search as string).trim() : "",
          };
        }
      }
      const students = await prisma.student.findMany({
        where: {
          AND: {
            ...query,
          },
        },
        skip: 0,
        take: 10,
      });
      student = students;
    }

    getSend(res, student);
  } catch (error) {
    errorGet(res, error);
  }
};
