import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createTenantUserService = async (data: any) => {
  return await prisma.tenantUser.create({ data });
};
export const getTenantUserByIdService = async (id: number) => {
  return await prisma.tenantUser.findUnique({ where: { id } });
};
export const getAllTenantUsersService = async () => {
  return await prisma.tenantUser.findMany();
};
export const updateTenantUserService = async (id: number, data: any) => {
  return await prisma.tenantUser.update({ where: { id }, data });
};
