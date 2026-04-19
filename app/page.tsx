import { Search } from "lucide-react";
import Header from "./_components/header";
import Image from "next/image";
import SectionTitle from "./_components/sectionTitle";
import prisma from "./_lib/prisma";
import { BarberShopItem } from "./_components/barbershop-item";
import { Button } from "./_components/ui/button";
import { QuickSearchOptions } from "./constants/search";
import { BookingItem } from "./_components/booking-item";
import { Footer } from "./_components/ui/footer";

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
          {QuickSearchOptions.map((e) => (
            <Button className=" py-5 px-2.5" variant="secondary" key={e.title}>
              <Image src={e.imgUrl} alt="Cabelo" width={16} height={16} />
              <p>{e.title}</p>
            </Button>
          ))}
        </div>

        {/* Banner */}

        <div className=" relative w-full h-37.5 md:h-130 mt-5 ">
          <Image
            alt="Banner da barbearia "
            src="/Banner.svg"
            fill
            className=" object-cover md:rounded-xl"
          />
        </div>

        <SectionTitle text="agendamentos">
          <BookingItem />
        </SectionTitle>

        <SectionTitle text="Recomendados">
          <div className="flex gap-3 overflow-auto md:[&::-webkit-scrollbar]:hidden">
            {barberShops.map((barber) => (
              <BarberShopItem key={barber.id} barberShop={barber} />
            ))}
          </div>
        </SectionTitle>

        <SectionTitle text="Populares">
          <div className="flex gap-3 overflow-auto md:[&::-webkit-scrollbar]:hidden ">
            {popularBarberShops.map((barber) => (
              <BarberShopItem key={barber.id} barberShop={barber} />
            ))}
          </div>
        </SectionTitle>
      </div>
      <Footer />
    </section>
  );
}
