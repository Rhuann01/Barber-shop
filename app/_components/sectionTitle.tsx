"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

export default function SectionTitle({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section>
      <p
        onClick={() => setOpen(!open)}
        className=" text-xs uppercase text-gray-400 font-bold mb-3 mt-6 flex items-center justify-start gap-1"
      >
        {text}
        {open ? (
          <ChevronDown className=" w-4 " />
        ) : (
          <ChevronRight className=" w-4" />
        )}
      </p>
      <div className=" flex flex-col gap-3">{open && children}</div>
    </section>
  );
}
