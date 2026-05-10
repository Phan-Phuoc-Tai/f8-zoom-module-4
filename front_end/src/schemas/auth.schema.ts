import { AUTH_CONFIG } from "@/constants/auth.constant";
import z from "zod";

const registerSchema = z
  .object({
    username: z.string().trim().min(1, {
      message: AUTH_CONFIG.USERNAME.REQUIRED,
    }),
    fullName: z.string().trim().min(1, {
      message: AUTH_CONFIG.FULL_NAME.REQUIRED,
    }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: AUTH_CONFIG.EMAIL.REQUIRED,
      })
      .pipe(
        z.email({
          message: AUTH_CONFIG.EMAIL.INVALID,
        }),
      ),
    password: z.string().trim().min(7, {
      message: AUTH_CONFIG.PASSWORD.REQUIRED(),
    }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: AUTH_CONFIG.CONFIRM_PASSWORD.REQUIRED }),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    //Tạo mảng chứa lỗi
    const missing: string[] = [];
    //Kiểm tra giá trị có tồn tại chữ hoa, thường và số
    if (!/[A-Z]/.test(password)) {
      missing.push(AUTH_CONFIG.PASSWORD.NOT_UPPERCASE);
    }
    if (!/[a-z]/.test(password)) {
      missing.push(AUTH_CONFIG.PASSWORD.NOT_LOWERCASE);
    }
    if (!/[0-9]/.test(password)) {
      missing.push(AUTH_CONFIG.PASSWORD.NOT_NUMBER);
    }
    //Kiểm tra có lỗi trong mảng
    if (missing.length) {
      context.addIssue({
        code: "custom",
        message: `${AUTH_CONFIG.PASSWORD.ERROR_BASE} ${missing.join(", ")}`,
        path: ["password"],
      });
    }
    //Kiểm tra khớp giữa password và confirmPassword
    if (password !== confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: AUTH_CONFIG.CONFIRM_PASSWORD.INCORRECT,
      });
    }
  });
const loginSchema = z.object({
  email: z.string().trim().min(1, {
    message: AUTH_CONFIG.EMAIL.REQUIRED,
  }),
  password: z
    .string()
    .trim()
    .min(8, {
      message: AUTH_CONFIG.PASSWORD.REQUIRED(false),
    }),
});
export { registerSchema, loginSchema };
