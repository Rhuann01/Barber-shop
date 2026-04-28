"use client";

import { ptBR } from "date-fns/locale";
import { Calendar } from "./calendar";
import { ReactNode, useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { BarberShopService } from "@/app/generated/prisma/client";
import { format, set } from "date-fns";
import { TIME_LIST } from "@/app/constants/hors";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { createBooking } from "@/app/_actions/create-booking";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface PropsServices {
  service: BarberShopService;
  barberShopName: string | ReactNode;
  children: ReactNode;
}

export const CalendarEditItem = ({
  service,
  barberShopName,
  children,
}: PropsServices) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  const handlerCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime || !data?.user.id) return;
      // [hors, minutes]
      const hour = Number(selectedTime?.split(":")[0]);
      const minutes = Number(selectedTime?.split(":")[1]);
      /* Bibliota date-func */
      const newDate = set(selectedDay, {
        minutes: minutes,
        hours: hour,
      });

      await createBooking({
        serviceId: service.id,
        date: newDate,
        userId: data.user.id,
      });

      toast.success("Reserva criada com sucesso", { position: "top-center" });
    } catch (error) {
      console.error(error);
      toast.error("erro ao criar reserva", { position: "top-center" });
    }
  };

  const handlerDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handlerTimeSelected = (t: string | undefined) => {
    setSelectedTime(t);
  };

  return (
    // 1. Não exibir horarios já marcados

    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>Agendamento</SheetTitle>
        </SheetHeader>

        <Calendar
          disabled={{ before: new Date() }}
          mode="single"
          locale={ptBR}
          buttonVariant="outline"
          className="w-full bg-transparent border-b-2 pb-5 md:p-5"
          selected={selectedDay}
          onSelect={handlerDateSelect}
        />
        {selectedDay && (
          <section>
            <div className="w-full overflow-x-auto p-5 flex align-center justify-center border-b-2 gap-3 [&::-webkit-scrollbar]:hidden">
              {TIME_LIST.map((t) => (
                <Button
                  className=" rounded-full"
                  variant={t === selectedTime ? "default" : "outline"}
                  key={t}
                  onClick={() => handlerTimeSelected(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
            <div className="p-5">
              <Card className="  py-5">
                <CardContent className="flex flex-col px-5 gap-1">
                  <div className="flex w-full justify-between items-center font-bold">
                    <p>{service?.name}</p>
                    <p className=" text-primary">
                      {Intl.NumberFormat("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(service?.price))}
                    </p>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <p className=" text-gray-400">Data</p>
                    <p>{format(selectedDay, "d 'de' MMM", { locale: ptBR })}</p>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <p className=" text-gray-400">Horário</p>
                    <p>{selectedTime ?? "vazio"}</p>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <p className=" text-gray-400">Barbearia</p>
                    <p>{barberShopName}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button
              disabled={!selectedDay || !selectedTime || !data?.user}
              onClick={handlerCreateBooking}
            >
              Confirmar
            </Button>
          </SheetClose>
          {!data?.user && (
            <p className="text-red-400 text-[0.65rem] text-center">
              *você precisa está logado para agendamentos*
            </p>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
