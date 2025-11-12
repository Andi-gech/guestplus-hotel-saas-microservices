import { Router } from "express";
import {
  getMyReservationsController,
  createReservationController,
  getReservationByIdController,
  cancelReservationController,
  completeReservationController,
  getAllReservationsController,
  getReservationsByRoomIdController,
  getReservationsByStatusController,
  getReservationsByDateRangeController,
} from "../controllers/reservationController";

const router = Router();

router.get("/my-reservations", getMyReservationsController);
router.post("/", createReservationController);
router.get("/:id", getReservationByIdController);
router.delete("/:id", cancelReservationController);
router.put("/:id/complete", completeReservationController);
router.get("/", getAllReservationsController);
router.get("/room/:roomId", getReservationsByRoomIdController);
router.get("/status/:status", getReservationsByStatusController);
router.get("/date-range", getReservationsByDateRangeController);

export default router;
