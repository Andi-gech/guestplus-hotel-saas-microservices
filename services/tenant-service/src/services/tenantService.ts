import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTenantsService = async () => {
  return await prisma.tenant.findMany();
};

export const getTenantByIdService = async (id: string) => {
  const tenant = await prisma.tenant.findUnique({ where: { id } });
  if (!tenant) throw new Error("404");
  return tenant;
};

export const createTenantService = async (data: any) => {
  const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
    where: { id: data.subscriptionPlanId },
  });
  if (!subscriptionPlan) throw new Error("404");
  return await prisma.tenant.create({ data });
};

export const updateTenantService = async (id: string, data: any) => {
  const tenant = await prisma.tenant.findUnique({ where: { id } });
  if (!tenant) throw new Error("404");
  return await prisma.tenant.update({ where: { id }, data });
};

export const deleteTenantService = async (id: string) => {
  const tenant = await prisma.tenant.findUnique({ where: { id } });
  if (!tenant) throw new Error("404");
  return await prisma.tenant.delete({ where: { id } });
};
