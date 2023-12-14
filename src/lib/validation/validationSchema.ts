import { z } from "zod";

export const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
});
