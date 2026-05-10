"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_CONFIG } from "@/constants/auth.constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { loginSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { loginAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { UserData } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();
  const onSubmit = async (
    data: Omit<UserData, "username" | "fullName" | "confirmPassword">,
  ) => {
    toast.promise(
      () => {
        setIsSubmitting(true);
        return loginAction(data);
      },
      {
        loading: AUTH_CONFIG.LOGIN_ACTION.LOADING,
        error: () => {
          setIsSubmitting(false);
          return AUTH_CONFIG.LOGIN_ACTION.ERROR;
        },
        success: async (data) => {
          router.push("/");
          setIsSubmitting(false);
          setUser?.(data);
          reset();
          return AUTH_CONFIG.LOGIN_ACTION.SUCCESS;
        },
      },
    );
  };

  return (
    <form className="max-w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="email" className="ml-2 text-xl ">
          {AUTH_CONFIG.EMAIL.LABEL}
        </label>
        <Input
          id="email"
          type="email"
          placeholder={AUTH_CONFIG.EMAIL.PLACEHOLDER}
          className={cn(
            "h-auto px-3 py-2 focus-visible:ring-0 ",
            errors.email?.message &&
              "border-red-600 focus-visible:border-red-600",
          )}
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-base mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="ml-2 text-xl ">
          {AUTH_CONFIG.PASSWORD.LABEL}
        </label>
        <Input
          id="password"
          type="password"
          placeholder={AUTH_CONFIG.PASSWORD.PLACEHOLDER}
          className={cn(
            "h-auto px-3 py-2 focus-visible:ring-0 ",
            errors.email?.message &&
              "border-red-600 focus-visible:border-red-600",
          )}
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-base mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button
        disabled={!isValid || isSubmitting}
        className="w-full text-lg h-auto py-1 mb-3 cursor-pointer bg-black/70 hover:bg-black"
      >
        {isSubmitting ? (
          <>
            <Spinner />
            <span>{AUTH_CONFIG.LOGIN_BUTTON.SUBMITTING}</span>
          </>
        ) : (
          AUTH_CONFIG.LOGIN_BUTTON.SUBMIT
        )}
      </Button>
      <div className="text-center">
        <span>Bạn chưa có tài khoản? </span>
        <Link
          href={"/auth/register"}
          className="text-blue-500 font-medium underline"
        >
          {AUTH_CONFIG.REGISTER_TITLE}
        </Link>
      </div>
    </form>
  );
}
