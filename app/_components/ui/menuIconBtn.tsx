"use client";

import { ChevronLeft, MenuIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { SideBarSheet } from "./sideebar-sheet";

export const MeunuIconBtn = () => {
  return (
    <div className=" absolute top-0 w-full  flex items-center justify-between px-5 py-5">
      <Button variant="secondary" size="icon" asChild>
        <Link href="/">
          <ChevronLeft />
        </Link>
      </Button>
      <SideBarSheet>
        <Button variant="secondary" size="icon">
          <MenuIcon />
        </Button>
      </SideBarSheet>
    </div>
  );
};
