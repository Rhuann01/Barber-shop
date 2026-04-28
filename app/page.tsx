import Header from "./_components/header";
import Image from "next/image";
import SectionTitle from "./_components/sectionTitle";
import prisma from "./_lib/prisma";
import { BarberShopItem } from "./_components/barbershop-item";
import { Button } from "./_components/ui/button";
import { QuickSearchOptions } from "./constants/search";
import { BookingItem } from "./_components/booking-item";
import { SearchItem } from "./_components/ui/search-item";
import Link from "next/link";
import { UserHelloItem } from "./_components/ui/user-hello-item";

export default async function Home() {
  const barberShops = await prisma.barberShop.findMany();
  const popularBarberShops = await prisma.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <section className=" w-screen">
      <Header />
      <div className=" p-5 text-white">
        <UserHelloItem />

        {/* Busca */}
        <div className="pt-5">
          <SearchItem />
        </div>

        {/* Busca rapida */}
        <div className=" flex items-center justify-start pt-4 gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {QuickSearchOptions.map((e) => (
            <Button
              className=" py-5 px-2.5"
              variant="secondary"
              key={e.title}
              asChild
            >
              <Link
                href={`http://localhost:3000/barbershops?search=${e.title}`}
              >
                <Image src={e.imgUrl} alt="Cabelo" width={16} height={16} />
                <p>{e.title}</p>
              </Link>
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
    </section>
  );
}
