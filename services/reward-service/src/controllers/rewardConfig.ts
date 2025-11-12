import { Request, Response } from "express";
import {
  getRewardConfigById,
  getAllRewardConfig,
  createRewardConfig,
  updateRewardConfig,
  deleteRewardConfig,
} from "../services/rewardConfigService";
import { sendSuccess, sendError } from "../utils/responseHandler";

export const fetchRewardConfigById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rewardConfig = await getRewardConfigById(id);
    sendSuccess(res, rewardConfig);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reward configuration");
  }
};

export const fetchAllRewardConfig = async (req: Request, res: Response) => {
  try {
    const rewardConfigs = await getAllRewardConfig();
    sendSuccess(res, rewardConfigs);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reward configurations");
  }
};

export const createNewRewardConfig = async (req: Request, res: Response) => {
  try {
    const { name, description, pointsEarn } = req.body;
    const newRewardConfig = await createRewardConfig({
      name,
      description,
      pointsEarn,
    });
    sendSuccess(res, newRewardConfig);
  } catch (error) {
    sendError(res, 500, "Failed to create reward configuration");
  }
};

export const updateExistingRewardConfig = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, description, pointsEarn } = req.body;
    const updatedRewardConfig = await updateRewardConfig(id, {
      name,
      description,
      pointsEarn,
    });
    sendSuccess(res, updatedRewardConfig);
  } catch (error) {
    sendError(res, 500, "Failed to update reward configuration");
  }
};

export const deleteRewardConfigById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteRewardConfig(id);
    sendSuccess(res, { message: "Reward configuration deleted successfully" });
  } catch (error) {
    sendError(res, 500, "Failed to delete reward configuration");
  }
};
