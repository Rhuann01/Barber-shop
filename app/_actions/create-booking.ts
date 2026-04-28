"use server";

import prisma from "../_lib/prisma";

interface CreateBookingParms {
  serviceId: string;
  userId: string;
  date: Date;
}

export const createBooking = async (params: CreateBookingParms) => {
  await prisma.booking.create({
    data: params,
  });
};
