"use client";

import { deleteThisBooking } from "@/app/_actions/delete-booking";
import { toast } from "sonner";
import { AlertDialogAction } from "./alert-dialog";
import { Button } from "./button";
import { SheetClose } from "./sheet";
import { useRouter } from "next/navigation";

export const DeleteBookingItem = ({ idBooking }: { idBooking: string }) => {
  const router = useRouter();
  const handlerDeleteBooking = async () => {
    try {
      await deleteThisBooking(idBooking);
      toast.success("Reserva cancelada", { position: "top-center" });
      router.refresh();
    } catch (error) {
      console.error("Error: " + error);
      toast.error("Error ao cancelar, tente novamente", {
        position: "top-center",
      });
    }
  };

  return (
    <AlertDialogAction
      variant={"destructive"}
      asChild
      onClick={handlerDeleteBooking}
    >
      <SheetClose asChild>
        <Button variant={"destructive"} className=" flex-1 py-5 px-2.5">
          Confirmar
        </Button>
      </SheetClose>
    </AlertDialogAction>
  );
};
