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

export const createRoom = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const Room = await prisma.room.create({
      data: body,
    });
    createSend(res, Room);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const RoomId =
      (req as custumRequest).user.type === "Room"
        ? (req as custumRequest).user.id
        : req.params.id;
    const Room = await prisma.room.update({
      where: {
        id: RoomId,
      },
      data: {
        ...body,
      },
    });
    updateSend(res, Room);
  } catch (error) {
    errorCreate(res, error);
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as custumRequest).user;

    if (user.type === "ADMIN") {
      const deletedRoom = await prisma.room.delete({
        where: { id: Number(id) },
      });
      return deleteSend(res, deletedRoom.id);
    } else {
      throw new Error("Room is not admin");
    }
  } catch (error) {
    errorDelete(res, error);
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const room = await prisma.room.findMany();
    getSend(res, room);
  } catch (error) {
    errorGet(res, error);
  }
};
