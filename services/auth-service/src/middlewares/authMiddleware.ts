import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/responseHandler";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        tenantId?: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    return sendError(res, 401, "Unauthorized");
  }

  const payload = verifyToken(token);
  if (!payload) {
    return sendError(res, 401, "Unauthorized");
  }

  req.user = { id: payload.sub, tenantId: payload.tenantId, role: payload.scope };
  next();
};
