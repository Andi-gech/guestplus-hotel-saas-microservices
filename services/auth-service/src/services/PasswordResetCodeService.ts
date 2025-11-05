import { generate6DigitCode } from "../utils/crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPasswordResetCodeService = async (id: string) => {
  const generatedcode = generate6DigitCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 minutes
  const resetData = { userId: id, code: generatedcode, expiresAt };
  return await prisma.passwordResetCode.create({ data: resetData });
};

export const ResendPasswordResetCodeService = async (
  email: string,
  tenantId: string
) => {
  // Use findFirst to avoid requiring the compound unique input (email+tenantId)
  const user = await prisma.user.findFirst({ where: { email, tenantId } });
  if (!user) throw new Error("404");
  const generatedcode = generate6DigitCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 minutes
  const resetData = { userId: user.id, code: generatedcode, expiresAt };
  return await prisma.passwordResetCode.create({ data: resetData });
};
export const verifyPasswordResetCodeService = async (
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
  const user = await prisma.user.findFirst({ where: { email, tenantId } });
  if (!user) throw new Error("404");
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
