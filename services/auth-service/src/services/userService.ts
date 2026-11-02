import { PrismaClient } from "@prisma/client";

import { comparePasswords, hashPassword } from "../utils/crypto";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const getAllUsersService = async () => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isEmailVerified: true,
    },
  });

  return allUsers.reduce(
    (acc, user) => {
      if (user.isEmailVerified) {
        acc.verified.push(user);
      } else {
        acc.unverified.push(user);
      }
      return acc;
    },
    { verified: [], unverified: [] } as {
      verified: typeof allUsers;
      unverified: typeof allUsers;
    }
  );
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
        email,
        tenantId,
      },
    },
  });
  if (!user) throw new Error("404");
  return user;
};

export const createUserService = async (data: any) => {
  const { password, ...userData } = data;
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { ...userData, passwordHash },
    omit: { passwordHash: true },
  });

  return { user };
};

export const changeUserPasswordService = async (
  userId: string,
  newPassword: string
) => {
  const passwordHash = await hashPassword(newPassword);
  return prisma.user.update({
    where: { id: userId },
    omit: { passwordHash: true },
    data: { passwordHash },
  });
};

export const deleteUserService = async (id: string) => {
  const user = await getUserByIdService(id);
  if (!user.isEmailVerified) {
    throw new Error("Email verification is required before deleting this account.");
  }

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

  if (!user.isEmailVerified) throw new Error("400");

  const isPasswordValid = await comparePasswords(
    credentials.password,
    user.passwordHash
  );

  if (!isPasswordValid) throw new Error("400");
  const tokenPayload = {
    userId: user.id,
    tenantId: user.tenantId || undefined,
    role: user.role,
  };
  const { accessToken, expireIn } = generateAccessToken(tokenPayload);
  const { refreshToken, expireIn: refreshTokenExpireIn } =
    generateRefreshToken(tokenPayload);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    },
    accessToken: { accessToken, expireIn },
    refreshToken: { refreshToken, expireIn: refreshTokenExpireIn },
  };
};

export const verifyEmailService = async (userId: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isEmailVerified: true },
    omit: { passwordHash: true },
  });
};
