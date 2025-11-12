import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRewardConfigById = async (id: string) => {
  return await prisma.rewardConfig.findUnique({
    where: { id },
  });
};

export const getAllRewardConfig = async () => {
  return await prisma.rewardConfig.findMany();
};

export const createRewardConfig = async (data: {
  name: string;
  description: string;
  pointsEarn: number;
}) => {
  return await prisma.rewardConfig.create({
    data,
  });
};
export const updateRewardConfig = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    pointsEarn?: number;
  }
) => {
  return await prisma.rewardConfig.update({
    where: { id },
    data,
  });
};
export const deleteRewardConfig = async (id: string) => {
  return await prisma.rewardConfig.delete({
    where: { id },
  });
};
