"use server";

import prisma from "../_lib/prisma";

export const deleteThisBooking = async (bookingId: string) => {
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
};
