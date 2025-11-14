import { Request, Response } from "express";
import {
  createReservation,
  getMyReservations,
  getReservationById,
  cancelReservation,
  completeReservation,
  getAllReservations,
  getReservationsByRoomId,
  getReservationsByStatus,
  getReservationsByDateRange,
} from "../services/reservationService";

import { sendSuccess, sendError } from "../utils/responseHandler";

export const getMyReservationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const reservations = await getMyReservations(userId);
    sendSuccess(res, reservations);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reservations");
  }
};

export const createReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const { roomId, checkIn, checkOut, guestName, guestEmail } = req.body;
    const reservation = await createReservation(
      userId,
      roomId,
      new Date(checkIn),
      new Date(checkOut),
      guestName,
      guestEmail
    );
    //fire and forget notification email to user about reservation creation
    //fire event to room-service to block the room for 10 minutes until reservation is completed

    sendSuccess(res, reservation);
  } catch (error) {
    sendError(res, 500, "Failed to create reservation");
  }
};

export const getReservationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationId = req.params.id;
    const reservation = await getReservationById(reservationId);
    sendSuccess(res, reservation);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reservation");
  }
};

export const cancelReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationId = req.params.id;
    const reservation = await cancelReservation(reservationId);
    sendSuccess(res, reservation);
  } catch (error) {
    sendError(res, 500, "Failed to cancel reservation");
  }
};
export const completeReservationController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservationId = req.params.id;
    //payment processing would go here in a real-world scenario
    const reservation = await completeReservation(reservationId);
    //fire and forget notification email to user about reservation completion
    //send event to room-service to mark the room as noT AVAILABLE
    //send event to reward-service to add loyalty points to user account

    sendSuccess(res, reservation);
  } catch (error) {
    sendError(res, 500, "Failed to complete reservation");
  }
};

export const getAllReservationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const reservations = await getAllReservations();
    sendSuccess(res, reservations);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reservations");
  }
};
export const getReservationsByRoomIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const roomId = req.params.roomId;
    const reservations = await getReservationsByRoomId(roomId);
    sendSuccess(res, reservations);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reservations by room ID");
  }
};
export const getReservationsByStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const status = req.params.status;
    const reservations = await getReservationsByStatus(status);
    sendSuccess(res, reservations);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reservations by status");
  }
};

export const getReservationsByDateRangeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { startDate, endDate } = req.query;
    const reservations = await getReservationsByDateRange(
      new Date(startDate as string),
      new Date(endDate as string)
    );
    sendSuccess(res, reservations);
  } catch (error) {
    sendError(res, 500, "Failed to fetch reservations by date range");
  }
};
