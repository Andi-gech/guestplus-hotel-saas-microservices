import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  changeUserPasswordService,
  deleteUserService,
  loginUserService,
  verifyEmailService,
  getUserByEmail,
} from "../services/userService";
import { sendSuccess, sendError } from "../utils/responseHandler";
import { createCodeService, verifyCodeService } from "../services/CodeService";

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
    const newUser = await createUserService(req.body);
    const code = await createCodeService(String(newUser.user.id));
    sendSuccess(res, { user: newUser, code }, "User created");
  } catch (err: any) {
    sendError(res, 500, err?.message || "Failed to create user");
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email, tenantId } = req.body;
    const user = await getUserByEmail(email, tenantId);
    const resetCode = await createCodeService(user.id);
    sendSuccess(res, resetCode, "Password reset code created");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail(req.body.email, req.body.tenantId);
    const isValidCode = await verifyCodeService(user.id, req.body.code);

    if (!isValidCode) {
      return sendError(res, 400, "Invalid password reset code");
    }

    const updatedUser = await changeUserPasswordService(
      user.id,
      req.body.newPassword
    );

    sendSuccess(res, updatedUser, "User password updated");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

//delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteUserService(String((req as any)?.user?.id));
    sendSuccess(res, null, "User deleted");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await loginUserService({
      email: req.body.email,
      password: req.body.password,
      tenantId: req.body.tenantId,
    });

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
    const user = await getUserByEmail(email, tenantId);
    const resetCode = await createCodeService(user.id);
    sendSuccess(res, resetCode, "Password reset code resent");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to fetch user");
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { code, email, tenantId } = req.body;
    const user = await getUserByEmail(email, tenantId);
    if (user.isEmailVerified) throw new Error("Email already verified.");

    const isValidCode = await verifyCodeService(user.id, code);
    if (!isValidCode) throw new Error("Invalid verification code.");
    const verifiedCode = await verifyEmailService(user.id);
    sendSuccess(res, verifiedCode, "Email verified successfully");
  } catch (err: any) {
    if (err.message === "404") return sendError(res, 404, "User not found");
    sendError(res, 500, err.message || "Failed to verify email");
  }
};
