import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { SideBarSheet } from "./ui/sideebar-sheet";

export default function Header() {
  return (
    <Card>
      <CardContent className=" flex items-center justify-between">
        <Image alt="Logo" src="/Logo.png" width={120} height={18} />
        <SideBarSheet>
          <Button size="icon" variant="ghost">
            <MenuIcon />
          </Button>
        </SideBarSheet>
      </CardContent>
    </Card>
  );
}
