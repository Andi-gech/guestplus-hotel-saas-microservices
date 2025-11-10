import { PrismaClient } from "@prisma/client";
import { verifyCodeService, createCodeService } from "./CodeService";
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
  const user = await prisma.user.findUnique({ where: { id } });
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
  const user = await prisma.user.create({ data, omit: { passwordHash: true } });
  const code = await createCodeService(user.id);
  return { user, code };
};

export const changeUserPasswordService = async (
  email: string,
  code: string,
  hashedPassword: string,
  tenantId: string
) => {
  const user = await getUserByEmail(email, tenantId);
  if (!user.isEmailVerified)
    throw new Error("Verify your email to manage your account .");

  const isValidCode = await verifyCodeService(email, tenantId, code);
  if (!isValidCode) throw new Error("Invalid password reset code");

  return await prisma.user.update({
    where: { id: user.id },
    omit: { passwordHash: true },
    data: { passwordHash: hashedPassword },
  });
};
export const requestPasswordResetService = async (
  email: string,
  tenantId: string
) => {
  const user = await getUserByEmail(email, tenantId);
  if (!user.isEmailVerified)
    throw new Error("Verify your email to manage your account .");

  const createResetCode = await createCodeService(user.id);
  return createResetCode;
};

export const deleteUserService = async (id: string) => {
  const user = await getUserByIdService(id);
  if (!user.isEmailVerified)
    throw new Error("Verify your email to manage your account .");

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
export const verifyEmailService = async (
  email: string,
  tenantId: string,
  code: string
) => {
  const user = await getUserByEmail(email, tenantId);
  if (user.isEmailVerified) throw new Error("Email already verified.");
  const isValidCode = await verifyCodeService(email, tenantId, code);
  if (!isValidCode) throw new Error("Invalid verification code.");
  return await prisma.user.update({
    where: { id: user.id },
    data: { isEmailVerified: true },
    omit: { passwordHash: true },
  });
};
