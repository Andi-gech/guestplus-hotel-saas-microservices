import { Router } from "express";
import {
  fetchRewardConfigById,
  fetchAllRewardConfig,
  createNewRewardConfig,
  updateExistingRewardConfig,
  deleteRewardConfigById,
} from "../controllers/rewardConfig";

const router = Router();
router.get("/:id", fetchRewardConfigById);
router.get("/", fetchAllRewardConfig);
router.post("/", createNewRewardConfig);
router.put("/:id", updateExistingRewardConfig);
router.delete("/:id", deleteRewardConfigById);
export default router;
