"use client";

import { Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PropsPhone {
  phone: string;
}

export const PhoneItem = ({ phone }: PropsPhone) => {
  function HandleBtnCopy(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("telefone copiado " + text, { position: "top-center" });
  }

  return (
    <section className="flex items-center justify-between">
      <div className="flex font-normal items-center gap-1 ">
        <Smartphone size={18} />
        {phone}
      </div>
      <Button variant="outline" onClick={() => HandleBtnCopy(phone)}>
        copiar
      </Button>
    </section>
  );
};
