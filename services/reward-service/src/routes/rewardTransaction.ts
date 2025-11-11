import { Router } from "express";
import {
  earnRewardPoints,
  redeemRewardPoints,
  getMyRewardTransactions,
} from "../controllers/rewardTransaction";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.post("/earn", authMiddleware, earnRewardPoints);
router.post("/redeem", authMiddleware, redeemRewardPoints);
router.get("/my-transactions", authMiddleware, getMyRewardTransactions);
export default router;
