"use client";

import { Search } from "lucide-react";
import { formSchema } from "@/app/schemas/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export const SearchItem = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: { search: string }) => {
    router.push(`http://localhost:3000/barbershops?search=${data.search}`);
  };

  useEffect(() => {
    if (errors.search?.message) toast.error(errors.search.message);
  }, [errors.search]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mt-10 flex items-center gap-2 w-full"
    >
      <input
        {...register("search")}
        type="text"
        className="w-full h-10 px-4 py-2 rounded-sm border-2 border-white/16 "
        placeholder="buscar"
      />
      <button
        className=" bg-purple-700 w-15 h-10 px-4 py-2 rounded-sm"
        type="submit"
      >
        <Search />
      </button>
    </form>
  );
};
