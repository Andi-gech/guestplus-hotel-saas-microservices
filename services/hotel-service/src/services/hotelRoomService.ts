import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRoomsByHotelIdService = async (hotelId: string) => {
  return await prisma.room.findMany({
    where: { hotelId },
    include: { RewardConfig: true },
  });
};
export const getHotelRoomByIdService = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: { id },
    include: { RewardConfig: true },
  });
  return room;
};

export const createHotelRoomService = async (data: any) => {
  return await prisma.room.create({ data });
};
export const updateHotelRoomService = async (id: string, data: any) => {
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) throw new Error("404");
  return await prisma.room.update({ where: { id }, data });
};

export const deleteHotelRoomService = async (id: string) => {
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) throw new Error("404");
  return await prisma.room.delete({ where: { id } });
};

export const assignRewardConfigToRoomService = async (
  roomId: string,
  config: string
) => {
  console.log("roomId:", roomId, "config:", config);
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) throw new Error("404");
  return await prisma.roomRewardConfig.create({
    data: {
      roomId,
      config,
    },
    include: {
      room: true,
    },
  });
};

export const getRoomRewardConfigService = async (roomId: string) => {
  return await prisma.roomRewardConfig.findMany({ where: { roomId } });
};
export const removeRoomRewardConfigService = async (id: string) => {
  const config = await prisma.roomRewardConfig.findUnique({ where: { id } });
  if (!config) throw new Error("404");
  return await prisma.roomRewardConfig.delete({ where: { id } });
};
