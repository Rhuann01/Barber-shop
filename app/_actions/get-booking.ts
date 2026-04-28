"use server";

import { endOfDay, startOfDay } from "date-fns";
import prisma from "../_lib/prisma";

interface GetBookingProps {
  serviceId: string;
  date: Date;
}

export const getBooking = ({ date }: GetBookingProps) => {
  return prisma.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};
