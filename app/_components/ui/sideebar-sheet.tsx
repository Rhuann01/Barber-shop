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
import { signIn, signOut, useSession } from "next-auth/react";

export const SideBarSheet = ({ children }: { children: ReactNode }) => {
  const { data } = useSession();
  const handleLoginWithGoogleProvider = () => signIn();
  const handleLogoutClick = () => signOut();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          {/* Mostra o card do user se tiver logado e a opção de se logar se não tiver logado */}
          {/* cartão do user */}
          {data?.user && (
            <div className=" py-5 mt-1 pb-6 border-b border-solid flex gap-3 items-center">
              <Avatar size="lg">
                {/* usei "??" e não "as string" porque com ?? caso o user não tenha foto não quebra a aplicação com uma foto vazia */}
                <AvatarImage
                  alt="avatar"
                  src={data?.user?.image ?? "/noImgPerfil.jpg"}
                />
              </Avatar>
              <div>
                <p className=" font-bold">{data?.user?.name}</p>
                <p className="text-xs">{data?.user?.email}</p>
              </div>
            </div>
          )}
          {/* cartão da opçao de logar */}
          {!data?.user && (
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
          )}

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
                  asChild
                >
                  <Link
                    href={`http://localhost:3000/barbershops?search=${option.title}`}
                  >
                    <Image
                      src={option.imgUrl}
                      alt={option.title}
                      width={16}
                      height={16}
                    />
                    <p>{option.title}</p>
                  </Link>
                </Button>
              </SheetClose>
            ))}
          </div>
          <div className=" py-5 pb-6  flex flex-col gap-2 items-center ">
            {data?.user && (
              <Button
                variant="ghost"
                className=" w-full flex justify-start"
                onClick={handleLogoutClick}
              >
                <LogOutIcon /> Sair da conta
              </Button>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
