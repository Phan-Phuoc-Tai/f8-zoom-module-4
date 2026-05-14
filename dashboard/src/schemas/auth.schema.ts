import { AUTH_CONFIG } from "@/constants/auth.constant";
import z from "zod";

const loginSchema = z.object({
  email: z.string().trim().min(1, {
    message: AUTH_CONFIG.EMAIL.REQUIRED,
  }),
  password: z.string().trim().min(8, {
    message: AUTH_CONFIG.PASSWORD.REQUIRED,
  }),
});
export { loginSchema };
