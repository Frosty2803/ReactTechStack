import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(12).refine((name) => !/[\s\W]/.test(name)),
  email: z.email(),
  password: z.string().min(8).max(16).refine((pwd) => /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd)),
});

export type RegisterInput = z.infer<typeof registerSchema>;