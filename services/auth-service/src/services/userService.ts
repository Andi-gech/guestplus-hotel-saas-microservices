import { PrismaClient } from "@prisma/client";
import {
  verifyPasswordResetCodeService,
  createPasswordResetCodeService,
} from "./PasswordResetCodeService";
import { comparePasswords, hashPassword } from "../utils/crypto";
import { generateAccessToken } from "../utils/jwt";

const prisma = new PrismaClient();
export const getAllUsersService = async () => {
  return await prisma.user.findMany();
};

export const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("404");
  return user;
};
export const createUserService = async (data: any) => {
  return await prisma.user.create({ data });
};
export const changeUserPasswordService = async (
  email: string,
  code: string,
  hashedPassword: string,
  tenantId: string
) => {
  console.log("Changing password for email:", email, "tenantId:", tenantId);
  const user = await prisma.user.findFirst({
    where: { email, tenantId },
  });
  if (!user) throw new Error("404");
  const isValidCode = await verifyPasswordResetCodeService(
    email,
    tenantId,
    code
  );
  if (!isValidCode) throw new Error("Invalid password reset code");

  return await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: hashedPassword },
  });
};
export const requestPasswordResetService = async (
  email: string,
  tenantId: string
) => {
  const user = await prisma.user.findFirst({ where: { email, tenantId } });
  if (!user) throw new Error("404");
  const createResetCode = await createPasswordResetCodeService(user.id);
  return createResetCode;
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("404");
  return await prisma.user.delete({ where: { id } });
};
export const loginUserService = async (credentials: {
  email: string;
  password: string;
  tenantId: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      unique_user_email_per_tenant: {
        email: credentials.email,
        tenantId: credentials.tenantId,
      },
    },
  });

  if (!user) throw new Error("404");

  const isPasswordValid = await comparePasswords(
    credentials.password,
    user.passwordHash
  );

  if (!isPasswordValid) throw new Error("Invalid credentials");
  const token = generateAccessToken({
    userId: user.id,
    tenantId: user.tenantId ? user.tenantId : undefined,
    role: user.role,
  });
  return { user, token };
};
