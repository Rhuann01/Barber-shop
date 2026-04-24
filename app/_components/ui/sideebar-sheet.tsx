"use client";

import { Avatar } from "@/app/_components/ui/avatar";
import { AvatarImage } from "@/app/_components/ui/avatar";
import { QuickSearchOptions } from "@/app/constants/search";
import { Calendar, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { signIn } from "next-auth/react";

export const SideBarSheet = ({ children }: { children: ReactNode }) => {
  const handleLoginWithGoogleProvider = () => signIn();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          {/* <div className=" py-5 mt-1 pb-6 border-b border-solid flex gap-3 items-center">
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
          </div> */}

          <div className="flex items-center justify-between py-5 mt-1">
            <h2 className=" font-semibold text-lg">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle asChild>
                    <p className=" text-center">Faça login na plataforma</p>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <p className=" text-center">
                      Conecte-se usando sua conta do Google
                    </p>
                  </DialogDescription>
                  <Button
                    onClick={handleLoginWithGoogleProvider}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <Image
                      alt="Fazer link com google"
                      src="Google.svg"
                      width={14}
                      height={14}
                    />
                    <p className="font-bold">Google</p>
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
              <SheetClose key={option.title} asChild>
                <Button
                  variant="ghost"
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
              </SheetClose>
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
