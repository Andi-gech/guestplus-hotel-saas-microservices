import { PrismaClient } from "@prisma/client";

import { comparePasswords, hashPassword } from "../utils/crypto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const prisma = new PrismaClient();
export const getAllUsersService = async () => {
  return await prisma.user.findMany({
    where: {
      isEmailVerified: true,
    },
    omit: {
      passwordHash: true,
    },
  });
};

export const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: { passwordHash: true },
  });
  if (!user) throw new Error("404");
  return user;
};

export const getUserByEmail = async (email: string, tenantId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      unique_user_email_per_tenant: {
        email: email,
        tenantId: tenantId,
      },
    },
  });
  if (!user) throw new Error("400");
  return user;
};

export const createUserService = async (data: any) => {
  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: { ...data, passwordHash: hashedPassword },
    omit: { passwordHash: true },
  });

  return { user };
};

export const changeUserPasswordService = async (
  userId: string,

  newPassword: string
) => {
  const hashedPassword = await hashPassword(newPassword);
  return await prisma.user.update({
    where: { id: userId },
    omit: { passwordHash: true },
    data: { passwordHash: hashedPassword },
  });
};

export const deleteUserService = async (id: string) => {
  const user = await getUserByIdService(id);
  console.log("Deleting user:", user);
  if (!user.isEmailVerified)
    throw new Error("to do this action verify your email first.");

  const [deletedUser] = await prisma.$transaction([
    prisma.emailVerificationCode.deleteMany({ where: { userId: user.id } }),
    prisma.passwordResetCode.deleteMany({ where: { userId: user.id } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);
  return deletedUser;
};

export const loginUserService = async (credentials: {
  email: string;
  password: string;
  tenantId: string;
}) => {
  const user = await getUserByEmail(credentials.email, credentials.tenantId);

  if (!user.isEmailVerified)
    throw new Error("Verify your email to manage your account .");

  const isPasswordValid = await comparePasswords(
    credentials.password,
    user.passwordHash
  );

  if (!isPasswordValid) throw new Error("400");
  const { accessToken, expireIn } = generateAccessToken({
    userId: user.id,
    tenantId: user.tenantId ? user.tenantId : undefined,
    role: user.role,
  });
  const { refreshToken, expireIn: refreshTokenExpireIn } = generateRefreshToken(
    {
      userId: user.id,
      tenantId: user.tenantId ? user.tenantId : undefined,
      role: user.role,
    }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
    accessToken: {
      accessToken,
      expireIn,
    },
    refreshToken: {
      refreshToken,
      expireIn: refreshTokenExpireIn,
    },
  };
};

export const verifyEmailService = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isEmailVerified: true },
    omit: { passwordHash: true },
  });
};
