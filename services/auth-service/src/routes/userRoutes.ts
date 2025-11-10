import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  changeUserPassword,
  deleteUser,
  loginUser,
  requestPasswordReset,
  resendPasswordResetCode,
  getCurrentUser,
  verifyEmail,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", changeUserPassword);
router.post("/resend-code", resendPasswordResetCode);
router.get("/me/current", authMiddleware, getCurrentUser);
router.get("/:id", authMiddleware, getUserById);
router.delete("/", authMiddleware, deleteUser);
router.post("/verify-email", verifyEmail);

export default router;
