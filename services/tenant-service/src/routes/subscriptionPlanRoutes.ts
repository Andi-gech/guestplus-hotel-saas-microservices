import { Router } from "express";
import {
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from "../controllers/subscriptionPlanController";

const router = Router();

router.get("/", getAllSubscriptionPlans);
router.get("/:id", getSubscriptionPlanById);
router.post("/", createSubscriptionPlan);
router.put("/:id", updateSubscriptionPlan);
router.delete("/:id", deleteSubscriptionPlan);

export default router;
