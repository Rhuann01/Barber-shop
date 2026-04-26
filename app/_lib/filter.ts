import { BarberShopService } from "../generated/prisma/client";

interface FilterSevices {
  value: string | undefined;
  services: BarberShopService[];
}

export function filterSelect({ value, services }: FilterSevices) {
  if (!value) {
    return [];
  }

  return services.filter((s) =>
    s.name.toLocaleLowerCase().includes(value?.toLocaleLowerCase()),
  );
}
