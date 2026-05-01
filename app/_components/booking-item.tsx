import { format } from "date-fns";
import {
  BarberShop,
  BarberShopService,
  Booking,
} from "../generated/prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import {
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import Image from "next/image";
import { PhoneItem } from "./phone-item";
import SectionTitle from "./sectionTitle";
import { Button } from "./ui/button";
import { deleteThisBooking } from "../_actions/delete-booking";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { error } from "console";
import { toast } from "sonner";
import { DeleteBookingItem } from "./ui/delete-booking-item";

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

export const BookingItem = async ({
  booking,
  services,
  barberShop,
}: BookingItemProps) => {
  /* TODO receber agendamentos por props */

  if (!booking) return;

  const { date } = booking;
  const day = format(date, "dd");
  const month = format(date, "MMMM", { locale: ptBR });
  const hours = format(date, "kk:mm");
  const isConfirmed = new Date() < date;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 pl-7">
              <Badge
                variant={
                  isConfirmed ? "default" : "secondary"
                } /*  className="bg-purple-950 text-purple-300" */
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
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
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="font-bold text-lg w-full border-b-2 -mb-5 border-solid pb-5  flex items-start justify-center">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>
        <div className=" p-5 flex flex-col">
          {/* Imagem com card dentro */}
          <div className="relative w-full h-40 rounded-lg overflow-auto">
            <Image src="/map.png" alt="Map" fill className=" object-cover" />
            <div className=" absolute w-full bottom-3 flex items-center justify-center">
              <div className=" bg-secondary p-3 rounded-lg w-[95%] ">
                <Avatar className=" flex gap-2 ">
                  <AvatarImage src={barberShop.imgURL} />
                  <div className="flex flex-col justify-center min-w-44">
                    <h3 className="font-bold text-sm ">{barberShop.name}</h3>
                    <p className=" text-xs">{barberShop.adress}</p>
                  </div>
                </Avatar>
              </div>
            </div>
          </div>
          {/* Informações da reserva */}
          <Badge
            className="my-5"
            variant={
              isConfirmed ? "default" : "secondary"
            } /*  className="bg-purple-950 text-purple-300" */
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card className="  py-5">
            <CardContent className="flex flex-col px-5 gap-1">
              <div className="flex w-full justify-between items-center font-bold">
                <p>{services.name}</p>
                <p className=" text-primary">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(services?.price))}
                </p>
              </div>
              <div className="flex w-full justify-between items-center">
                <p className=" text-gray-400">Data</p>
                <p>{format(date, "d 'de' MMM", { locale: ptBR })}</p>
              </div>
              <div className="flex w-full justify-between items-center">
                <p className=" text-gray-400">Horário</p>
                <p>{hours}</p>
              </div>
              <div className="flex w-full justify-between items-center">
                <p className=" text-gray-400">Barbearia</p>
                <p>{barberShop.name}</p>
              </div>
            </CardContent>
          </Card>
          <SectionTitle text="Contato">
            {barberShop.phones.map((tel, index) => (
              <PhoneItem key={index} phone={tel} />
            ))}
          </SectionTitle>
        </div>
        <SheetFooter>
          <div className="flex w-full gap-1">
            <SheetClose asChild>
              <Button className="flex-1" variant={"secondary"}>
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"}>Cancelar reserva</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar esse agendamento?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex w-full gap-2 justify-center items-center">
                    <AlertDialogCancel asChild>
                      <Button
                        variant={"secondary"}
                        className=" flex-1 py-5 px-2.5"
                      >
                        Voltar
                      </Button>
                    </AlertDialogCancel>
                    <DeleteBookingItem idBooking={booking.id} />
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
