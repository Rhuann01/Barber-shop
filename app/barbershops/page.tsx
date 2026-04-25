import { BarberShopItem } from "../_components/barbershop-item";
import Header from "../_components/header";
import { SearchItem } from "../_components/ui/search-item";
import prisma from "../_lib/prisma";

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

const SearchBarberShop = async ({ searchParams }: Props) => {
  const { search } = await searchParams;

  const barbers = await prisma.barberShop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return (
    <section className="flex flex-col ">
      <Header />
      <div className=" flex flex-col items-center justify-start w-screen px-5">
        <SearchItem />
        <div className="grid grid-cols-2 gap-4 py-5">
          {barbers.map((b) => (
            <BarberShopItem key={b.id} barberShop={b} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchBarberShop;
