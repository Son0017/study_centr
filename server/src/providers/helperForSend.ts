import { Request, Response } from "express";

export const createSend = (res: Response, data: any) => {
  return res.status(201).send({
    data,
    succes: true,
  });
};
export const errorCreate = (res: Response, data: any) => {
  console.log(data);
  return res.status(501).send({
    data: null,
    messages: data.message,
    succes: false,
  });
};
export const updateSend = (res: Response, data: any) => {
  return res.status(202).send({
    data,
    succes: true,
  });
};
export const errorUpdate = (res: Response, data: any) => {
  console.log(data.message);

  return res.status(502).send({
    data: null,
    messages: data.message,
    succes: false,
  });
};
export const getSend = (res: Response, data: any) => {
  return res.status(200).send({
    data,
    succes: true,
  });
};

export const errorGet = (res: Response, data: any) => {
  return res.status(500).send({
    data: null,
    messages: data.message,
    succes: false,
  });
};
export const deleteSend = (res: Response, data: any) => {
  return res.status(203).send({
    data,
    succes: true,
  });
};

export const errorDelete = (res: Response, data: any) => {
  return res.status(503).send({
    data: null,
    messages: data.message,
    succes: false,
  });
};
export interface custumRequest extends Request {
  user: any;
}
