import { Router } from "express";
import rewardRoutes from "./reward";
import rewardTransactionRoutes from "./rewardTransaction";
const router = Router();

router.use("/rewards", rewardRoutes);
router.use("/rewards", rewardTransactionRoutes);

export default router;
