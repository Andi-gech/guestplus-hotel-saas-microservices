import { Router } from "express";
import hotel from "./hotel";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use("/hotels", authMiddleware, hotel);

export default router;
