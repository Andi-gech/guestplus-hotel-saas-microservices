import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  changeUserPasswordService,
  requestPasswordResetService,
  deleteUserService,
  loginUserService,
} from "../services/userService";
import {
  sendSuccess,
  sendCreated,
  sendNotFound,
  sendServerError,
} from "../utils/responseHandler";
import { verifyPasswordResetCodeService } from "../services/PasswordResetCodeService";
import { hashPassword } from "../utils/crypto";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    sendSuccess(res, users, "All users fetched");
  } catch (err) {
    sendServerError(res, "Failed to fetch users");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(String(req.params.id));
    sendSuccess(res, user, "User fetched");
  } catch (err: any) {
    if (err.message === "404") return sendNotFound(res, "User not found");
    sendServerError(res, "Failed to fetch user");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.passwordHash);
    req.body.passwordHash = hashedPassword;
    delete req.body.password;
    const newUser = await createUserService(req.body);
    sendCreated(res, newUser, "User created");
  } catch (err) {
    console.log(err);
    sendServerError(res, "Failed to create user");
  }
};
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email, tenantId } = req.body;
    const resetCode = await requestPasswordResetService(email, tenantId);
    sendCreated(res, resetCode, "Password reset code created");
  } catch (err: any) {
    console.log(err);
    if (err.message === "404") return sendNotFound(res, "User not found");
    sendServerError(
      res,
      err instanceof Error ? err.message : "Failed to request password reset"
    );
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const resetCode = await verifyPasswordResetCodeService(
      req.body.email,
      req.body.tenantId,
      req.body.code
    );
    console.log("Reset code verification result:", resetCode);
    if (!resetCode) {
      return sendNotFound(res, "Invalid password reset code");
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
    if (err.message === "404") return sendNotFound(res, "User not found");
    sendServerError(
      res,
      err instanceof Error ? err.message : "Failed to change password"
    );
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteUserService(String(req.params.id));
    sendSuccess(res, null, "User deleted");
  } catch (err: any) {
    if (err.message === "404") return sendNotFound(res, "User not found");
    sendServerError(res, "Failed to delete user");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await loginUserService({
      email: req.body.email,
      password: req.body.passwordHash,
      tenantId: req.body.tenantId,
    });
    if (!user) return sendNotFound(res, "User not found");
    sendSuccess(res, user, "User fetched by email");
  } catch (err) {
    sendServerError(
      res,
      err instanceof Error ? err.message : "Failed to login user"
    );
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(String((req as any)?.user?.id));
    sendSuccess(res, user, "Current user fetched");
  } catch (err: any) {
    if (err.message === "404") return sendNotFound(res, "User not found");
    sendServerError(res, "Failed to fetch current user");
  }
};

export const resendPasswordResetCode = async (req: Request, res: Response) => {
  try {
    const { email, tenantId } = req.body;
    const resetCode = await requestPasswordResetService(email, tenantId);
    sendCreated(res, resetCode, "Password reset code resent");
  } catch (err: any) {
    if (err.message === "404") return sendNotFound(res, "User not found");
    sendServerError(res, "Failed to resend password reset code");
  }
};
