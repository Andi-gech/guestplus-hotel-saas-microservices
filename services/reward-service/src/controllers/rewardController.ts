import { Request, Response } from "express";
import {
  getRewardsByUserIdService,
  createRewardService,
} from "../services/rewardService";
import { sendSuccess, sendError } from "../utils/responseHandler";
export const getMyRewards = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any)?.user?.id);
    const rewards = await getRewardsByUserIdService(userId);
    sendSuccess(res, rewards, "User rewards fetched");
  } catch (err: any) {
    sendError(res, 500, err.message || "Failed to fetch rewards");
  }
};

//for now i make it http request but it should be listen kafka event user creation
export const createReward = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any)?.user?.id);

    const newReward = await createRewardService(userId);

    sendSuccess(res, newReward, "Reward created successfully");
  } catch (err: any) {
    sendError(res, 500, err.message || "Failed to create reward");
  }
};
