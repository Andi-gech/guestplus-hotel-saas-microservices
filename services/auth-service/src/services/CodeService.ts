import { generate6DigitCode } from "../utils/crypto";
import { PrismaClient } from "@prisma/client";
import { getUserByEmail } from "./userService";

const prisma = new PrismaClient();

export const createCodeService = async (id: string) => {
  //no need to check for user service b/c we already check on
  const generatedcode = generate6DigitCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 minutes
  const resetData = { userId: id, code: generatedcode, expiresAt };
  return await prisma.passwordResetCode.create({ data: resetData });
};

export const ResendCodeService = async (email: string, tenantId: string) => {
  const user = await getUserByEmail(email, tenantId);
  const generatedcode = generate6DigitCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const resetData = { userId: user.id, code: generatedcode, expiresAt };
  return await prisma.passwordResetCode.create({ data: resetData });
};

export const verifyCodeService = async (
  email: string,
  tenantId: string,
  code: string
) => {
  console.log(
    "Verifying code for email:",
    email,
    "tenantId:",
    tenantId,
    "code:",
    code
  );
  const user = await getUserByEmail(email, tenantId);
  const resetCode = await prisma.passwordResetCode.findFirst({
    where: {
      userId: user.id,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });
  if (!resetCode) throw new Error("404");
  return resetCode;
};
