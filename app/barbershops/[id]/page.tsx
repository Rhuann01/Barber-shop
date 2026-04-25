import SectionTitle from "@/app/_components/sectionTitle";
import { ServicesItem } from "@/app/_components/ui/services-item";
import prisma from "@/app/_lib/prisma";
import { MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PhoneItem } from "@/app/_components/phone-item";
import { MeunuIconBtn } from "@/app/_components/ui/menuIconBtn";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BarberShopPage({ params }: Props) {
  const { id } = await params;
  const barberShop = await prisma.barberShop.findUnique({
    where: {
      id: id,
    },
    include: {
      services: true,
    },
  });

  if (!barberShop) return notFound();

  return (
    <section className="font-bold text-white">
      {/* IMAGEM */}

      <div className="relative w-full h-62">
        <Image
          alt={barberShop?.name}
          src={barberShop?.imgURL}
          fill
          className="object-cover"
        />

        <MeunuIconBtn />
      </div>

      {/* DESCRIÇÃO */}
      <div className=" p-5 border-b border-solid">
        <h3 className="text-xl mb-3">{barberShop.name}</h3>
        <p className="font-normal mb-2 flex items-center gap-1 text-sm">
          {<MapPinIcon size={18} className="text-primary" />}
          {barberShop.adress}
        </p>
        <p className="font-normal flex items-center gap-1 text-sm">
          {<StarIcon size={18} className="text-primary fill-primary" />}5,0 (499
          avaliações)
        </p>
      </div>

      <div className="px-5 pb-5 border-b border-solid">
        <SectionTitle text="SOBRE NÓS">
          <p className="text-sm text-justify font-normal">
            {barberShop.description}
          </p>
        </SectionTitle>
      </div>
      <div className="px-5 pb-5 border-b border-solid">
        <SectionTitle text="serviços">
          {barberShop.services.map((service) => (
            <ServicesItem key={service.id} service={service} />
          ))}
        </SectionTitle>
      </div>
      {/* CONTATO */}
      <div className=" p-5 border-b border-solid -mt-6">
        <SectionTitle text="Contato">
          {barberShop.phones.map((tel, index) => (
            <PhoneItem key={index} phone={tel} />
          ))}
        </SectionTitle>
      </div>
    </section>
  );
}
