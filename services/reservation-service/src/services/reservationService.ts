import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMyReservations = async (userId: string) => {
  return prisma.reservation.findMany({
    where: { userId },
  });
};

export const createReservation = async (
  userId: string,
  roomId: string,
  checkIn: Date,
  checkOut: Date,
  guestName: string,
  guestEmail: string
) => {
  return prisma.reservation.create({
    data: {
      userId,
      roomId,
      checkIn,
      checkOut,
      guestName,
      guestEmail,
    },
  });
  //emit event to make a room unavailable for the reserved dates
};
export const getReservationById = async (reservationId: string) => {
  return prisma.reservation.findUnique({
    where: { id: reservationId },
  });
};
export const cancelReservation = async (reservationId: string) => {
  return prisma.reservation.update({
    where: { id: reservationId },
    data: { status: "CANCELLED" },
  });
};
export const completeReservation = async (reservationId: string) => {
  return prisma.reservation.update({
    where: { id: reservationId },
    data: { status: "COMPLETED" },
  });
};
export const getAllReservations = async () => {
  return prisma.reservation.findMany();
};
export const getReservationsByRoomId = async (roomId: string) => {
  return prisma.reservation.findMany({
    where: { roomId },
  });
};
export const getReservationsByStatus = async (status: any) => {
  return prisma.reservation.findMany({
    where: { status },
  });
};
export const getReservationsByDateRange = async (
  startDate: Date,
  endDate: Date
) => {
  return prisma.reservation.findMany({
    where: {
      AND: [{ checkIn: { gte: startDate } }, { checkOut: { lte: endDate } }],
    },
  });
};
