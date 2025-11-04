import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSubscriptionPlanService = async (data: any) => {
  return await prisma.subscriptionPlan.create({ data });
};

export const getAllSubscriptionPlansService = async () => {
  return await prisma.subscriptionPlan.findMany();
};

export const getSubscriptionPlanByIdService = async (id: string) => {
  return await prisma.subscriptionPlan.findUnique({ where: { id } });
};

export const updateSubscriptionPlanService = async (id: string, data: any) => {
  return await prisma.subscriptionPlan.update({ where: { id }, data });
};
