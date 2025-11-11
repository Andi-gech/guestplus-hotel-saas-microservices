import { Router } from "express";
import { getMyRewards, createReward } from "../controllers/rewardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, getMyRewards);
router.post("/", authMiddleware, createReward);

export default router;
