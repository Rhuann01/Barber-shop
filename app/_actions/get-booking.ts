"use server";
import { getServerSession } from "next-auth";

import { authSessionOptions } from "../_lib/auth-options";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { endOfDay, startOfDay } from "date-fns";
import prisma from "../_lib/prisma";

interface GetBookingProps {
  serviceId: string;
  date: Date;
}

export const getBooking = async ({ date }: GetBookingProps) => {
  return prisma.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};

const session = await getServerSession(authSessionOptions);
export const getUserBookings = async () => {
  if (!session?.user) {
    toast.error("Você precissa está logado");
    notFound();
  }
  return prisma.booking.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      service: {
        include: {
          barberShop: true,
        },
      },
    },
  });
};
