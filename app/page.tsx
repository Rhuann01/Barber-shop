import { Search } from "lucide-react";
import Header from "./_components/ui/header";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "./_components/ui/badge";

export default function Home() {
  return (
    <section className=" w-screen h-screen">
      <Header />
      <div className=" p-5 text-white">
        <h1 className=" text-xl">Bem vindo, Rhuann!</h1>
        <p>Quinta, 16 de abril</p>
        <div className=" mt-10 flex items-center gap-2">
          <input
            type="text"
            className="w-full h-10 px-4 py-2 rounded-sm border-2 border-white/16 "
            placeholder="buscar"
          />
          <button className=" bg-purple-700 w-15 h-10 px-4 py-2 rounded-sm">
            <Search />
          </button>
        </div>
        <div className=" relative w-full h-37.5 mt-5">
          <Image
            alt="Banner da barbearia "
            src="/Banner01.png"
            fill
            className=" object-cover"
          />
        </div>

        <Card className="mt-5">
          <CardContent>
            <div className=" flex w-full h-full">
              <div className="flex flex-col px-5 pl-7 gap-2">
                <Badge>Confirmado</Badge>
              </div>
              <div></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
