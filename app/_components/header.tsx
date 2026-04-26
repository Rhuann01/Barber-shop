"use client";

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { SideBarSheet } from "./ui/sideebar-sheet";
import { useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter();

  const handlerLogoClick = () => {
    route.push("/");
  };

  return (
    <Card>
      <CardContent className=" flex items-center justify-between w-screen">
        <Image
          alt="Logo"
          src="/Logo.png"
          width={120}
          height={18}
          onClick={handlerLogoClick}
        />
        <SideBarSheet>
          <Button size="icon" variant="ghost">
            <MenuIcon />
          </Button>
        </SideBarSheet>
      </CardContent>
    </Card>
  );
}
