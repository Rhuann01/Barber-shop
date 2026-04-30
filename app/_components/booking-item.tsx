import { format, getDay } from "date-fns";
import {
  BarberShop,
  BarberShopService,
  Booking,
} from "../generated/prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  /*  Atalho
  
  Para não precisar passar duas props
  
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
    };
  }>;
   */

  booking: Booking;
  services: BarberShopService;
  barberShop: BarberShop;
}

export const BookingItem = ({
  booking,
  services,
  barberShop,
}: BookingItemProps) => {
  /* TODO receber agendamentos por props */

  if (!booking) return;

  const { date } = booking;
  const day = getDay(date);
  const month = format(date, "MMMM", { locale: ptBR });
  const hours = format(date, "kk:mm");

  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 pl-7">
          <Badge className="bg-purple-950 text-purple-300">Confirmado</Badge>
          <h3 className="font-semibold">{services.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={barberShop.imgURL} />
            </Avatar>
            <p className="font-light">{barberShop.name}</p>
          </div>
        </div>
        <div className=" flex flex-col w-30 px-5 text-sm items-center justify-center border-l-2 border-solid">
          <p>{month}</p>
          <p className="text-2xl font-semibold">{day}</p>
          <p>{hours}</p>
        </div>
      </CardContent>
    </Card>
  );
};
