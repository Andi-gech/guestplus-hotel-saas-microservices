import { Request, Response } from "express";
import {
  EarnRewardPointsService,
  RedeemRewardPointsService,
  GetMyRewardTransactionsService,
} from "../services/rewardTransactionsService";
import { sendSuccess, sendError } from "../utils/responseHandler";

export const earnRewardPoints = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any)?.user?.id);
    const { points } = req.body;
    const transaction = await EarnRewardPointsService(userId, points);
    sendSuccess(res, transaction, "Reward points earned successfully");
  } catch (err: any) {
    sendError(res, 500, err.message || "Failed to earn reward points");
  }
};

export const redeemRewardPoints = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any)?.user?.id);
    const { points } = req.body;
    const transaction = await RedeemRewardPointsService(userId, points);
    sendSuccess(res, transaction, "Reward points redeemed successfully");
  } catch (err: any) {
    sendError(res, 500, err.message || "Failed to redeem reward points");
  }
};

export const getMyRewardTransactions = async (req: Request, res: Response) => {
  try {
    const userId = String((req as any)?.user?.id);
    const transactions = await GetMyRewardTransactionsService(userId);
    sendSuccess(
      res,
      transactions,
      "Reward transactions retrieved successfully"
    );
  } catch (err: any) {
    sendError(
      res,
      500,
      err.message || "Failed to retrieve reward transactions"
    );
  }
};
