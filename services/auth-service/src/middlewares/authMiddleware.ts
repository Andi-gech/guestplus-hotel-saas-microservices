import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/responseHandler";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Auth Middleware Token:", token);
  if (!token) {
    return sendError(res, 401, "Unauthorized");
  }

  const payload = verifyToken(token);
  if (!payload) {
    return sendError(res, 401, "Unauthorized");
  }

  req.user = {
    id: payload.sub,
    tenantId: payload.tenantId,
    role: payload.scope,
  };
  next();
};
