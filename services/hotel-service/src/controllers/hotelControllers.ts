import { Request, Response } from "express";
import {
  getAllHotelsService,
  getHotelByIdService,
  createHotelService,
  updateHotelService,
  deleteHotelService,
} from "../services/hotelServices";
import { sendSuccess, sendError } from "../utils/responseHandler";

export const fetchAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await getAllHotelsService();
    sendSuccess(res, hotels);
  } catch (error) {
    sendError(res, 500, "Failed to fetch hotels");
  }
};
export const fetchHotelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hotel = await getHotelByIdService(id);
    if (!hotel) {
      return sendError(res, 404, "Hotel not found");
    }
    sendSuccess(res, hotel);
  } catch (error) {
    sendError(res, 500, "Failed to fetch hotel");
  }
};
export const createHotel = async (req: Request, res: Response) => {
  try {
    const { tenantId, name, description, address, city, country } = req.body;
    const newHotel = await createHotelService({
      tenantId,
      name,
      description,
      address,
      city,
      country,
    });
    sendSuccess(res, newHotel);
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Failed to create hotel");
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tenantId, name, description } = req.body;
    const updatedHotel = await updateHotelService(id, {
      tenantId,
      name,
      description,
    });
    sendSuccess(res, updatedHotel);
  } catch (error) {
    sendError(res, 500, "Failed to update hotel");
  }
};
export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteHotelService(id);
    sendSuccess(res, null, "Hotel deleted successfully");
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Failed to delete hotel");
  }
};
