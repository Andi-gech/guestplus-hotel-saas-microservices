import { generate6DigitCode } from "../utils/crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCodeService = async (id: string) => {
  const generatedcode = generate6DigitCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const resetData = { userId: id, code: generatedcode, expiresAt };
  return await prisma.passwordResetCode.create({ data: resetData });
};

export const verifyCodeService = async (userId: string, code: string) => {
  const resetCode = await prisma.passwordResetCode.findFirst({
    where: {
      userId,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });
  if (!resetCode) throw new Error("404");
  await prisma.passwordResetCode.update({
    where: { id: resetCode.id },
    data: { used: true },
  });
  return true;
};
