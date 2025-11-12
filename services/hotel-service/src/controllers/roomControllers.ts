import { Request, Response } from "express";
import {
  getHotelRoomByIdService,
  getRoomRewardConfigService,
  getRoomsByHotelIdService,
  assignRewardConfigToRoomService,
  removeRoomRewardConfigService,
  createHotelRoomService,
  updateHotelRoomService,
  deleteHotelRoomService,
} from "../services/hotelRoomService";
import { sendSuccess, sendError } from "../utils/responseHandler";

export const fetchRoomsByHotelId = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const rooms = await getRoomsByHotelIdService(hotelId);
    sendSuccess(res, rooms);
  } catch (error) {
    sendError(res, 500, "Failed to fetch rooms");
  }
};

export const fetchHotelRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await getHotelRoomByIdService(id);
    if (!room) {
      return sendError(res, 404, "Room not found");
    }
    sendSuccess(res, room);
  } catch (error) {
    sendError(res, 500, "Failed to fetch room");
  }
};

export const createHotelRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, capacity, type, status, price } = req.body;
    const newRoom = await createHotelRoomService({
      hotelId: id,
      name,
      description,
      capacity,
      type,
      status,
      price,
    });
    sendSuccess(res, newRoom);
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Failed to create room");
  }
};
export const updateHotelRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { hotelId, name, description, capacity, type, status, price } =
      req.body;
    const updatedRoom = await updateHotelRoomService(id, {
      hotelId,
      name,
      description,
      capacity,
      type,
      status,
      price,
    });
    sendSuccess(res, updatedRoom);
  } catch (error) {
    sendError(res, 500, "Failed to update room");
  }
};

export const deleteHotelRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteHotelRoomService(id);
    sendSuccess(res, null, "Room deleted successfully");
  } catch (error) {
    sendError(res, 500, "Failed to delete room");
  }
};

export const assignRewardConfigToRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rewardConfigId } = req.body;
    console.log("Assigning reward config:", rewardConfigId, "to room:", id);
    const updatedRoom = await assignRewardConfigToRoomService(
      id,
      rewardConfigId
    );
    sendSuccess(res, updatedRoom);
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Failed to assign reward config to room");
  }
};

export const fetchRoomRewardConfig = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const rewardConfigs = await getRoomRewardConfigService(roomId);
    sendSuccess(res, rewardConfigs);
  } catch (error) {
    sendError(res, 500, "Failed to fetch room reward configurations");
  }
};

export const removeRoomRewardConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await removeRoomRewardConfigService(id);
    sendSuccess(res, {
      message: "Room reward configuration removed successfully",
    });
  } catch (error) {
    sendError(res, 500, "Failed to remove room reward configuration");
  }
};
