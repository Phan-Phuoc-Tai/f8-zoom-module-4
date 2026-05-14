"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { AUTH_CONFIG } from "@/constants/auth.constant";
import { loginSchema } from "@/schemas/auth.schema";
import { UserData } from "@/types/auth.type";
import { loginAction } from "@/actions/auth.action";
import { CONFIG } from "@/constants/config.constant";
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
        error: (err) => {
          setIsSubmitting(false);

          return err.message || AUTH_CONFIG.LOGIN_ACTION.ERROR;
        },
        success: async (data) => {
          router.push(CONFIG.DASHBOARD);
          setIsSubmitting(false);
          setUser?.(data);
          reset();

          return AUTH_CONFIG.LOGIN_ACTION.SUCCESS;
        },
      },
    );
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="email" className="ml-2 mb-2 text-lg ">
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
      <div className="mb-4">
        <label htmlFor="password" className="ml-2 mb-2 text-lg ">
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
        className="w-full text-lg h-auto py-1 my-3 cursor-pointer bg-black/70 hover:bg-black"
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
    </form>
  );
}
