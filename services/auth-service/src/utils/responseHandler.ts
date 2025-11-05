import { Response } from "express";

export const sendSuccess = (res: Response, data: any, message = "Success") => {
  return res.status(200).json({ status: "success", message, data });
};

export const sendCreated = (res: Response, data: any, message = "Created") => {
  return res.status(201).json({ status: "success", message, data });
};

export const sendBadRequest = (res: Response, message = "Bad Request") => {
  return res.status(400).json({ status: "error", message });
};

export const sendUnauthorized = (res: Response, message = "Unauthorized") => {
  return res.status(401).json({ status: "error", message });
};

export const sendNotFound = (res: Response, message = "Not Found") => {
  return res.status(404).json({ status: "error", message });
};

export const sendServerError = (
  res: Response,
  message = "Internal Server Error"
) => {
  return res.status(500).json({ status: "error", message });
};
