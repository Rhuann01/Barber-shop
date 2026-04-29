"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authSessionOptions } from "../_lib/auth-options";

interface CreateBookingParms {
  serviceId: string;
  userId: string;
  date: Date;
}

export const createBooking = async (params: CreateBookingParms) => {
  /* O next tranforma essa função em uma rota http, por isso confirmação
  se tem um usuário logado, para uma pessoa má intecionada não use meios
  não queridos para inserir dados, para isso é preciso adcionar as configs
  do NextAuth em uma variavel para ser reutilisavel */

  const user = await getServerSession(authSessionOptions);
  if (!user) throw new Error("Usuário não autenticado");

  /* Verifica se o id de usuário é o mesmo do que está utilizando no momento */

  if (user.user.id != params.userId) throw new Error("Usuário inválido");
  await prisma.booking.create({
    data: params,
  });
  revalidatePath("/barbershops/[id]");
};
