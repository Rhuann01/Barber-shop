"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

export const UserHelloItem = () => {
  const { data } = useSession();

  return (
    <div>
      <h1 className=" text-xl">
        Bem vindos<strong>{data?.user ? ", " + data.user.name : ""}!</strong>
      </h1>
      <p>{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}</p>
    </div>
  );
};
