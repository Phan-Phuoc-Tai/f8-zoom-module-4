import z from "zod";
import { AUTH_MESSAGE_ERRORS } from "../constants/auth.constant";
import { userService } from "../services/user.service";

const registerSchema = z
  .object({
    username: z.string().trim().min(1, {
      message: AUTH_MESSAGE_ERRORS.USERNAME,
    }),
    fullName: z.string().trim().min(1, {
      message: AUTH_MESSAGE_ERRORS.FULL_NAME,
    }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: AUTH_MESSAGE_ERRORS.EMAIL.REQUIRED,
      })
      .pipe(
        z.email({
          message: AUTH_MESSAGE_ERRORS.EMAIL.INVALID,
        }),
      )
      .refine(
        async (email: string) => {
          const isEmailExist = await userService.findEmailExist(email);
          return !isEmailExist;
        },
        {
          message: AUTH_MESSAGE_ERRORS.EMAIL.EXIST,
        },
      ),
    password: z.string().trim().min(8, {
      message: AUTH_MESSAGE_ERRORS.PASSWORD.REQUIRED,
    }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: AUTH_MESSAGE_ERRORS.CONFIRM_PASSWORD.REQUIRED }),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    //Tạo mảng chứa lỗi
    const missing: string[] = [];
    //Kiểm tra giá trị có tồn tại chữ hoa, thường và số
    if (!/[A-Z]/.test(password)) {
      missing.push(AUTH_MESSAGE_ERRORS.PASSWORD.NOT_UPPERCASE);
    }
    if (!/[a-z]/.test(password)) {
      missing.push(AUTH_MESSAGE_ERRORS.PASSWORD.NOT_LOWERCASE);
    }
    if (!/[0-9]/.test(password)) {
      missing.push(AUTH_MESSAGE_ERRORS.PASSWORD.NOT_NUMBER);
    }
    //Kiểm tra có lỗi trong mảng
    if (missing.length) {
      context.addIssue({
        code: "custom",
        message: `${AUTH_MESSAGE_ERRORS.PASSWORD.BASE} ${missing.join(", ")}`,
        path: ["password"],
      });
    }
    //Kiểm tra khớp giữa password và confirmPassword
    if (password !== confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: AUTH_MESSAGE_ERRORS.CONFIRM_PASSWORD.INCORRECT,
      });
    }
  });

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: AUTH_MESSAGE_ERRORS.EMAIL.REQUIRED,
    })
    .pipe(
      z.email({
        message: AUTH_MESSAGE_ERRORS.EMAIL.INVALID,
      }),
    ),
  password: z.string().trim().min(8, {
    message: AUTH_MESSAGE_ERRORS.PASSWORD.REQUIRED,
  }),
});

export { registerSchema, loginSchema };
