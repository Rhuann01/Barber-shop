"use client";

import { ptBR } from "date-fns/locale";
import { Calendar } from "./calendar";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { BarberShopService, Booking } from "@/app/generated/prisma/client";
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
import { getBooking } from "@/app/_actions/get-booking";

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
  const [dayBooking, setDayBooking] = useState<Booking[]>([]);

  /* Se cria uma chamada de "api" usando useEffect (que eu posso atualizar para react-query futuramente)
com ela se pega todos as reservas do mesmo dia que o dia selecionado, e seta na variavel - bookings -
*/

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBooking({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBooking(bookings);
    };

    fetch();
  }, [selectedDay, service.id]);

  /* console.log(dayBooking); */

  /* Cria um função que filtra os horários e faz um novo array, com filter quando algp é true ele mantem
  quando é false ele apaga, e o - some - faz com que items que não estão na lista deem true 
  e os que não false , no retorno eu botei - ! - pq eu quero os que não estão na lista */

  const getTimeDate = (booking: Booking[]) => {
    return TIME_LIST.filter((t) => {
      const hors = Number(t.split(":")[0]);
      const minutes = Number(t.split(":")[1]);
      const hasBookingCurrentTime = booking.some(
        (b) => b.date.getHours() === hors && b.date.getMinutes() === minutes,
      );

      return !hasBookingCurrentTime;
    });
  };

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
      /* Criando o booking */
      await createBooking({
        serviceId: service.id,
        date: newDate,
        userId: data.user.id,
      });

      /* Toast para ter respota da UI */

      toast.success("Reserva criada com sucesso", { position: "top-center" });
    } catch (error) {
      /* Motra erro no terminal e resposta da UI */
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

  const handlerConfirm = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBooking([]);
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
            <div className="w-full overflow-x-auto p-5 flex border-b-2 gap-3 [&::-webkit-scrollbar]:hidden">
              {getTimeDate(dayBooking).map((t) => (
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
              onClick={() => {
                handlerCreateBooking();
                handlerConfirm();
              }}
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
