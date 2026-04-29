"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

export const SingInDialog = ({ children }: { children: ReactNode }) => {
  const handleLoginWithGoogleProvider = () => signIn();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
  );
};
