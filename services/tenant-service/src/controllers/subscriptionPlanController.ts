import { Request, Response } from "express";
import {
  getAllSubscriptionPlansService,
  getSubscriptionPlanByIdService,
  createSubscriptionPlanService,
  updateSubscriptionPlanService,
} from "../services/subscriptionPlanService";

export const getAllSubscriptionPlans = async (req: Request, res: Response) => {
  try {
    const plans = await getAllSubscriptionPlansService();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscription plans" });
  }
};

export const getSubscriptionPlanById = async (req: Request, res: Response) => {
  try {
    const plan = await getSubscriptionPlanByIdService(Number(req.params.id));
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscription plan" });
  }
};

export const createSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const newPlan = await createSubscriptionPlanService(req.body);
    res.status(201).json(newPlan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create subscription plan" });
  }
};

export const updateSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const updatedPlan = await updateSubscriptionPlanService(
      Number(req.params.id),
      req.body
    );
    res.json(updatedPlan);
  } catch (err) {
    res.status(500).json({ error: "Failed to update subscription plan" });
  }
};
