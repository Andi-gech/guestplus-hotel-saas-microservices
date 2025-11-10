import { Response } from "express";

export const sendSuccess = (res: Response, data: any, message = "Success") => {
  return res.status(200).json({ status: "success", code: 200, message, data });
};

export const sendError = (res: Response, code = 500, message = "Error") => {
  return res.status(code).json({ status: "error", code: code, message });
};
