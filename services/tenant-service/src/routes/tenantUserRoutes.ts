import { Router } from "express";
import {
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  createSubscriptionPlan,
  updateSubscriptionPlan,
} from "../controllers/subscriptionPlanController";

const router = Router();

router.get("/", getAllSubscriptionPlans);
router.get("/:id", getSubscriptionPlanById);
router.post("/", createSubscriptionPlan);
router.put("/:id", updateSubscriptionPlan);

export default router;
