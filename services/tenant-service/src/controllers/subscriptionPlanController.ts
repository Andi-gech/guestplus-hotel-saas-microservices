import { Request, Response } from "express";
import {
  createSubscriptionPlanService,
  getAllSubscriptionPlansService,
  getSubscriptionPlanByIdService,
  updateSubscriptionPlanService,
  deleteSubscriptionPlanService,
} from "../services/subscriptionPlanService";

import {
  sendSuccess,
  sendCreated,
  sendNotFound,
  sendServerError,
} from "../utils/responseHandler";

export const getAllSubscriptionPlans = async (req: Request, res: Response) => {
  try {
    const plans = await getAllSubscriptionPlansService();
    sendSuccess(res, plans, "All subscription plans fetched");
  } catch (err) {
    sendServerError(res, "Failed to fetch subscription plans");
  }
};

export const getSubscriptionPlanById = async (req: Request, res: Response) => {
  try {
    const plan = await getSubscriptionPlanByIdService(req.params.id);
    sendSuccess(res, plan, "Subscription plan fetched");
  } catch (err: any) {
    if (err.message === "404")
      return sendNotFound(res, "Subscription plan not found");
    sendServerError(res, "Failed to fetch subscription plan");
  }
};

export const createSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const plan = await createSubscriptionPlanService(req.body);
    sendCreated(res, plan, "Subscription plan created");
  } catch (err) {
    sendServerError(res, "Failed to create subscription plan");
  }
};

export const updateSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const plan = await updateSubscriptionPlanService(req.params.id, req.body);
    sendSuccess(res, plan, "Subscription plan updated");
  } catch (err: any) {
    if (err.message === "404")
      return sendNotFound(res, "Subscription plan not found");
    sendServerError(res, "Failed to update subscription plan");
  }
};

export const deleteSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    await deleteSubscriptionPlanService(req.params.id);
    sendSuccess(res, null, "Subscription plan deleted");
  } catch (err: any) {
    if (err.message === "404")
      return sendNotFound(res, "Subscription plan not found");
    sendServerError(res, "Failed to delete subscription plan");
  }
};
