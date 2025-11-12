import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createHotelService = async (data: any) => {
  return await prisma.hotel.create({ data });
};

export const getAllHotelsService = async () => {
  return await prisma.hotel.findMany({
    include: {
      rooms: true,
    },
  });
};

export const getHotelByIdService = async (id: string) => {
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  return hotel;
};

export const updateHotelService = async (id: string, data: any) => {
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) throw new Error("404");
  return await prisma.hotel.update({ where: { id }, data });
};
export const deleteHotelService = async (id: string) => {
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) throw new Error("404");
  return await prisma.hotel.delete({ where: { id } });
};
