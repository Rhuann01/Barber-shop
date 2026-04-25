import { z } from "zod";

export const formSchema = z.object({
  search: z.string().trim().min(1, "O campo está vazio"),
});
