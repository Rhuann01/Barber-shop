import { BarberShopService } from "@/app/generated/prisma/client";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { Button } from "./button";

interface ServiceProps {
  service: BarberShopService;
}

export const ServicesItem = ({ service }: ServiceProps) => {
  return (
    <Card className="mb-1 py-3">
      <CardContent className=" flex w-full h-25 items-center justify-center gap-2 px-3">
        {/* IMAGE */}
        <div className=" relative min-w-30 h-full ">
          <Image
            alt={service.name}
            src={service.imgURL}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* BODY */}
        <div className="w-full h-full flex flex-col ml-1 justify-between">
          {/* NOME E DESCRIÇÂO */}
          <div>
            <h3 className=" font-semibold">{service.name}</h3>
            <p className="text-gray-400 font-normal">{service.description}</p>
          </div>
          {/* PREÇO E BUTÂO DE RESERVA */}
          <div className=" flex w-full justify-between items-center text-primary">
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
