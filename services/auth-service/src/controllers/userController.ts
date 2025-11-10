import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  changeUserPasswordService,
  requestPasswordResetService,
  deleteUserService,
  loginUserService,
  verifyEmailService,
} from "../services/userService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { verifyCodeService } from "../services/CodeService";
import { hashPassword } from "../utils/crypto";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    sendSuccess(res, users, "All users fetched");
  } catch (err) {
    sendError(res, 500, "Failed to fetch users");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(String(req.params.id));
    sendSuccess(res, user, "User fetched");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.passwordHash = hashedPassword;
    delete req.body.password;
    const newUser = await createUserService(req.body);
    sendSuccess(res, newUser, "User created");
  } catch (err: any) {
    sendError(res, 500, err?.message || "Failed to create user");
  }
};
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email, tenantId } = req.body;
    const resetCode = await requestPasswordResetService(email, tenantId);
    sendSuccess(res, resetCode, "Password reset code created");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const resetCode = await verifyCodeService(
      req.body.email,
      req.body.tenantId,
      req.body.code
    );
    if (!resetCode) {
      return sendError(res, 400, "Invalid password reset code");
    }
    const hashedPassword = await hashPassword(req.body.newPassword);
    const updatedUser = await changeUserPasswordService(
      req.body.email,
      req.body.code,
      hashedPassword,
      req.body.tenantId
    );

    sendSuccess(res, updatedUser, "User password updated");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteUserService(String(req.params.id));
    sendSuccess(res, null, "User deleted");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await loginUserService({
      email: req.body.email,
      password: req.body.password,
      tenantId: req.body.tenantId,
    });
    if (!user) return sendError(res, 404, "user not found");
    sendSuccess(
      res,
      { user, accessToken, refreshToken },
      "User fetched by email"
    );
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    if (err.message === "400")
      return sendError(res, 400, "Invalid credentials");
    sendError(res, 500, err.message || "Failed to login user");
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(String((req as any)?.user?.id));
    sendSuccess(res, user, "Current user fetched");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

export const resendPasswordResetCode = async (req: Request, res: Response) => {
  try {
    const { email, tenantId } = req.body;
    const resetCode = await requestPasswordResetService(email, tenantId);
    sendSuccess(res, resetCode, "Password reset code resent");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, tenantId, code } = req.body;
    const verifiedCode = await verifyEmailService(email, tenantId, code);
    sendSuccess(res, verifiedCode, "Email verified successfully");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to verify email");
  }
};
