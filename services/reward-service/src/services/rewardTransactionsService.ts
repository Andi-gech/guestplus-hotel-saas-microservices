import { PrismaClient } from "@prisma/client";
import { RewardType } from "../types";

const prisma = new PrismaClient();

export const EarnRewardPointsService = async (
  userId: string,
  points: number
) => {
  return await prisma.$transaction(async (tx: any) => {
    let reward = await tx.reward.findUnique({
      where: { userId },
    });

    if (!reward) {
      reward = await tx.reward.create({
        data: {
          userId,
          points: points,
        },
      });
    } else {
      reward = await tx.reward.update({
        where: { id: reward.id },
        data: { points: reward.points + points },
      });
    }

    await tx.rewardTransaction.create({
      data: {
        rewardId: reward.id,
        type: "EARNED" as RewardType,
        points: points,
      },
    });

    return reward;
  });
};
export const RedeemRewardPointsService = async (
  userId: string,
  points: number
) => {
  return await prisma.$transaction(async (tx: any) => {
    const reward = await tx.reward.findUnique({
      where: { userId },
    });
    if (!reward || reward.points < points) {
      throw new Error("Insufficient reward points");
    }
    const updatedReward = await tx.reward.update({
      where: { id: reward.id },
      data: { points: reward.points - points },
    });
    await tx.rewardTransaction.create({
      data: {
        rewardId: reward.id,
        type: "REDEEMED" as RewardType,
        points: points,
      },
    });
    return updatedReward;
  });
};

export const GetMyRewardTransactionsService = async (userId: string) => {
  const reward = await prisma.reward.findUnique({
    where: { userId },
  });
  if (!reward) {
    return [];
  }

  return await prisma.rewardTransaction.findMany({
    where: { rewardId: reward.id },
    orderBy: { createdAt: "desc" },
  });
};
