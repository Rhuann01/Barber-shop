import { EyeIcon, FootprintsIcon, Search, StarIcon } from "lucide-react";
import Header from "./_components/header";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import SectionTitle from "./_components/sectionTitle";
import prisma from "./_lib/prisma";
import { BarberShopItem } from "./_components/barbershop-item";
import { Button } from "./_components/ui/button";

export default async function Home() {
  const barberShops = await prisma.barberShop.findMany();
  const popularBarberShops = await prisma.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  });

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

        {/* Busca rapida */}

        <div className=" flex items-center justify-start pt-4 gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          <Button className=" py-5 px-2.5" variant="secondary">
            <Image src="/tesoura.svg" alt="Cabelo" width={16} height={16} />
            <p>Cabelo</p>
          </Button>
          <Button className=" py-5 px-2.5" variant="secondary">
            <Image src="/barba.svg" alt="Cabelo" width={16} height={16} />
            <p>Barba</p>
          </Button>
          <Button className=" py-5 px-2.5" variant="secondary">
            <Image src="/lamina.svg" alt="Cabelo" width={16} height={16} />
            <p>Acabamento</p>
          </Button>
          <Button className=" py-5 px-2.5" variant="secondary">
            <FootprintsIcon size={16} />
            <p>Pesinho</p>
          </Button>
          <Button className=" py-5 px-2.5" variant="secondary">
            <EyeIcon size={16} />
            <p>Sobrancelha</p>
          </Button>
        </div>

        {/* Banner */}

        <div className=" relative w-full h-37.5 mt-5">
          <Image
            alt="Banner da barbearia "
            src="/Banner01.png"
            fill
            className=" object-cover"
          />
        </div>

        <SectionTitle text="agendamentos">
          <Card>
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 pl-7">
                <Badge className="bg-purple-950 text-purple-300">
                  Confirmado
                </Badge>
                <h3 className="font-semibold">Corte de cabelo</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://i.pinimg.com/1200x/a1/8e/5f/a18e5f09224c7688da94720f387a2c48.jpg" />
                  </Avatar>
                  <p className="font-light">Vintager Barber</p>
                </div>
              </div>
              <div className=" flex flex-col w-30 px-5 text-sm items-center justify-center border-l-2 border-solid">
                <p>Abril</p>
                <p className="text-2xl font-semibold">17</p>
                <p>21:01</p>
              </div>
            </CardContent>
          </Card>
        </SectionTitle>

        <SectionTitle text="Recomendados">
          <div className="flex gap-3 overflow-auto">
            {barberShops.map((barber) => (
              <BarberShopItem key={barber.id} barberShop={barber} />
            ))}
          </div>
        </SectionTitle>

        <SectionTitle text="Populares">
          <div className="flex gap-3 overflow-auto">
            {popularBarberShops.map((barber) => (
              <BarberShopItem key={barber.id} barberShop={barber} />
            ))}
          </div>
        </SectionTitle>
      </div>
      <footer>
        <Card>
          <CardContent>
            <p className=" text-gray-400">
              © 2026 Copyright <strong>FSW Barber</strong>
            </p>
          </CardContent>
        </Card>
      </footer>
    </section>
  );
}
