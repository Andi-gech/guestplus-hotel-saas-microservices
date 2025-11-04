import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSubscriptionPlanService = async (data: any) => {
  return await prisma.subscriptionPlan.create({ data });
};

export const getAllSubscriptionPlansService = async () => {
  return await prisma.subscriptionPlan.findMany();
};

export const getSubscriptionPlanByIdService = async (id: string) => {
  const plan = await prisma.subscriptionPlan.findUnique({ where: { id } });
  if (!plan) throw new Error("404");
  return plan;
};

export const updateSubscriptionPlanService = async (id: string, data: any) => {
  const plan = await prisma.subscriptionPlan.findUnique({ where: { id } });
  if (!plan) throw new Error("404");
  return await prisma.subscriptionPlan.update({ where: { id }, data });
};

export const deleteSubscriptionPlanService = async (id: string) => {
  const plan = await prisma.subscriptionPlan.findUnique({ where: { id } });
  if (!plan) throw new Error("404");
  return await prisma.subscriptionPlan.delete({ where: { id } });
};
