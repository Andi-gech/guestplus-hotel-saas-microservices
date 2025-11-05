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
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", changeUserPassword);
router.post("/resend-code", resendPasswordResetCode);
router.get("/me/current", getCurrentUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
