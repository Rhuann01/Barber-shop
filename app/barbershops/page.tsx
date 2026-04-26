import { BarberShopItem } from "../_components/barbershop-item";
import Header from "../_components/header";
import SectionTitle from "../_components/sectionTitle";
import { SearchItem } from "../_components/ui/search-item";
import { ServicesItem } from "../_components/ui/services-item";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";
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
    include: {
      services: {
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },
  });

  return (
    <section className="flex flex-col ">
      <Header />
      <Tabs defaultValue="barber">
        <TabsList className=" mt-3 ml-5 " variant="line">
          <TabsTrigger value="barber">barbearia</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
        </TabsList>
        <div className="mt-3 w-full px-5">
          <SearchItem />
        </div>
        <TabsContent
          value="barber"
          className=" flex flex-col items-center justify-start w-screen px-5"
        >
          <div className="grid grid-cols-2 gap-4 py-5">
            {barbers.map((b) => (
              <BarberShopItem key={b.id} barberShop={b} />
            ))}
          </div>
        </TabsContent>
        {/* TODO: concertar bug na pesquisa de serviços, está filtrando o nome da barbearia também */}
        <TabsContent
          value="services"
          className=" flex flex-col items-center justify-start w-screen px-5"
        >
          <div className="pb-10">
            {barbers.map((b) => (
              <SectionTitle key={b.id} text={b.name}>
                {b.services.map((s) => (
                  <ServicesItem key={s.id} service={s} />
                ))}
              </SectionTitle>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SearchBarberShop;
