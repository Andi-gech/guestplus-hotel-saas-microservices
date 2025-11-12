import { Router } from "express";
import {
  fetchHotelById,
  fetchAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelControllers";
import {
  fetchRoomsByHotelId,
  createHotelRoom,
  updateHotelRoom,
  deleteHotelRoom,
  assignRewardConfigToRoom,
  fetchHotelRoomById,
  fetchRoomRewardConfig,
  removeRoomRewardConfig,
} from "../controllers/roomControllers";

const router = Router();
router.get("/:id", fetchHotelById);
router.get("/", fetchAllHotels);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:hotelId/rooms", fetchRoomsByHotelId);
router.get("/rooms/:id", fetchHotelRoomById);
router.post("/:id/rooms", createHotelRoom);
router.put("/rooms/:id", updateHotelRoom);
router.delete("/rooms/:id", deleteHotelRoom);
router.post("/rooms/:id/reward-config", assignRewardConfigToRoom);
router.get("/rooms/:id/reward-config", fetchRoomRewardConfig);
router.delete("/rooms/reward-config/:id", removeRoomRewardConfig);

export default router;
