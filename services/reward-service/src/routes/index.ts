import { Router } from "express";
import rewardRoutes from "./reward";
import rewardTransactionRoutes from "./rewardTransaction";
import rewardConfigRoutes from "./RewardConfig";
const router = Router();

router.use("/rewards", rewardRoutes);
router.use("/rewards", rewardTransactionRoutes);
router.use("/rewards/config", rewardConfigRoutes);

export default router;
