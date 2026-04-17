import { Card, CardContent } from "./card";
import Image from "next/image";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <Card className=" bg-neutral-950">
      <CardContent className=" flex items-center justify-between p-5">
        <Image alt="Logo" src="/Logo.png" width={120} height={18} />
        <Button size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
