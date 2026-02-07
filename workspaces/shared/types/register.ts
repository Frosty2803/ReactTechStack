import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(12).refine((name) => !name.match(/[\s\W]/)),
  email: z.email(),
});

export type RegisterInput = z.infer<typeof registerSchema>;