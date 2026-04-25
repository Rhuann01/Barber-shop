"use client";

import { Search } from "lucide-react";
import { formSchema } from "@/app/schemas/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldGroup } from "./field";
import { useRouter } from "next/navigation";

export const SearchItem = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: { search: string }) => {
    console.log(data.search);
    router.push(`http://localhost:3000/barbershops?search=${data.search}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mt-10 flex items-center gap-2 w-full"
    >
      <FieldGroup>
        <input
          {...register("search")}
          type="text"
          className="w-full h-10 px-4 py-2 rounded-sm border-2 border-white/16 "
          placeholder="buscar"
        />
      </FieldGroup>
      <button
        className=" bg-purple-700 w-15 h-10 px-4 py-2 rounded-sm"
        type="submit"
      >
        <Search />
      </button>
    </form>
  );
};
