import { Router } from "express";
import reservation from "./reservation";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use("/reservation", authMiddleware, reservation);

export default router;
