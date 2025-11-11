import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllRewardsService = async () => {
  return await prisma.reward.findMany();
};

export const getRewardsByUserIdService = async (userId: string) => {
  return await prisma.reward.findMany({
    where: { userId },
  });
};

export const createRewardService = async (userId: string) => {
  return await prisma.reward.create({
    data: {
      userId,
    },
  });
};
export const deleteRewardsByUserIdService = async (userId: string) => {
  return await prisma.reward.deleteMany({
    where: { userId },
  });
};
