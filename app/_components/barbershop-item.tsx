import Image from "next/image";
import { BarberShop } from "../generated/prisma/client";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export const BarberShopItem = ({ barberShop }: { barberShop: BarberShop }) => {
  return (
    <Card className=" min-w-40 mb-5  p-0">
      <CardContent className=" p-0">
        {/* IMAGEM */}

        <div className="relative h-35 w-full">
          <Image
            alt={barberShop.name}
            src={barberShop.imgURL}
            fill
            className="object-cover"
          />

          <Badge className=" absolute top-1 left-1 bg-purple-950/70 text-purple-50">
            <StarIcon size={12} className="fill-purple-500 text-purple-500" />
            5,0
          </Badge>
        </div>

        {/* TEXTO */}

        <div className=" px-2 py-4">
          <h3 className="text-[0.9rem] truncate font-semibold">
            {barberShop.name}
          </h3>
          <p className="text-xs text-gray-400">{barberShop.adress}</p>
          <Button variant="secondary" className="mt-3 w-full">
            <Link href={`/barbershops/${barberShop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
