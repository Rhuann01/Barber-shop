import { Avatar } from "@/app/_components/ui/avatar";
import { AvatarImage } from "@/app/_components/ui/avatar";
import { QuickSearchOptions } from "@/app/constants/search";
import { Calendar, HomeIcon, LogOutIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export const SideBarSheet = ({ children }: { children: ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <div className=" py-5 mt-1 pb-6 border-b border-solid flex gap-3 items-center">
            <Avatar size="lg">
              <AvatarImage
                alt="avatar"
                src="https://i.pinimg.com/736x/31/f3/cb/31f3cbc59e143a4a0193cef743b7b775.jpg"
              />
            </Avatar>
            <div>
              <p className=" font-bold">Rhuann Costa</p>
              <p className="text-xs">rhuann.costa@gmail.com</p>
            </div>
          </div>
          <div className=" py-5 pb-6 border-b border-solid flex flex-col gap-2 items-center ">
            <Button
              className=" w-full flex justify-start items-center gap-2 "
              asChild
            >
              <Link href="/">
                <HomeIcon size={18} /> Inicio
              </Link>
            </Button>
            <Button
              variant="ghost"
              className=" w-full flex justify-start items-center gap-2 "
            >
              <Calendar size={18} /> Agendamentos
            </Button>
          </div>
          <div className=" py-5 pb-6 border-b border-solid flex flex-col gap-2 items-center ">
            {QuickSearchOptions.map((option) => (
              <Button
                variant="ghost"
                key={option.title}
                className="flex w-full justify-start gap-3"
              >
                <Image
                  src={option.imgUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                <p>{option.title}</p>
              </Button>
            ))}
          </div>
          <div className=" py-5 pb-6  flex flex-col gap-2 items-center ">
            <Button variant="ghost" className=" w-full flex justify-start">
              <LogOutIcon /> Sair da conta
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
