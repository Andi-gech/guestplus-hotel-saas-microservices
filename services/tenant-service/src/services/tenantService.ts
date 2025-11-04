import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTenantsService = async () => {
  return await prisma.tenant.findMany();
};

export const getTenantByIdService = async (id: string) => {
  return await prisma.tenant.findUnique({ where: { id } });
};

export const createTenantService = async (data: any) => {
  return await prisma.tenant.create({ data });
};

export const updateTenantService = async (id: string, data: any) => {
  return await prisma.tenant.update({ where: { id }, data });
};
