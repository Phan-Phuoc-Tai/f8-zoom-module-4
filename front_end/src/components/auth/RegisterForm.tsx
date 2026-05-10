"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_CONFIG } from "@/constants/auth.constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { registerSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { UserData } from "@/types/auth.type";
import { registerAction } from "@/actions/auth.action";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: UserData) => {
    toast.promise(
      () => {
        setIsSubmitting(true);
        return registerAction(data);
      },
      {
        loading: AUTH_CONFIG.REGISTER_ACTION.LOADING,
        error: () => {
          setIsSubmitting(false);
          return AUTH_CONFIG.REGISTER_ACTION.ERROR;
        },
        success: () => {
          setIsSubmitting(false);
          reset();
          return AUTH_CONFIG.REGISTER_ACTION.SUCCESS;
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-1/2 mx-auto">
      <div className="mb-3">
        <label htmlFor="email" className=" text-xl ">
          {AUTH_CONFIG.EMAIL.LABEL}
          <span className="text-red-500 text-lg"> *</span>
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
        <label htmlFor="username" className=" text-xl ">
          {AUTH_CONFIG.USERNAME.LABEL}
          <span className="text-red-500 text-lg"> *</span>
        </label>
        <Input
          id="username"
          type="text"
          placeholder={AUTH_CONFIG.USERNAME.PLACEHOLDER}
          className={cn(
            "h-auto px-3 py-2 focus-visible:ring-0",
            errors.username?.message && "border-red-600",
          )}
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="text-red-500 text-base mt-1">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="fullName" className=" text-xl ">
          {AUTH_CONFIG.FULL_NAME.LABEL}
          <span className="text-red-500 text-lg"> *</span>
        </label>
        <Input
          id="fullName"
          type="text"
          placeholder={AUTH_CONFIG.FULL_NAME.PLACEHOLDER}
          className={cn(
            "h-auto px-3 py-2 focus-visible:ring-0",
            errors.fullName?.message && "border-red-600",
          )}
          {...register("fullName")}
        />
        {errors.fullName?.message && (
          <p className="text-red-500 text-base mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className=" text-xl ">
          {AUTH_CONFIG.PASSWORD.LABEL}
          <span className="text-red-500 text-lg"> *</span>
        </label>
        <Input
          id="password"
          type="password"
          placeholder={AUTH_CONFIG.PASSWORD.PLACEHOLDER}
          className={cn(
            "h-auto px-3 py-2 focus-visible:ring-0",
            errors.password?.message && "border-red-600",
          )}
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-base mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className=" text-xl ">
          {AUTH_CONFIG.CONFIRM_PASSWORD.LABEL}
          <span className="text-red-500 text-lg"> *</span>
        </label>
        <Input
          id="confirmPassword"
          type="password"
          className={cn(
            "h-auto px-3 py-2 focus-visible:ring-0",
            errors.confirmPassword?.message && "border-red-600",
          )}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500 text-base mt-1">
            {errors.confirmPassword.message}
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
            <span>{AUTH_CONFIG.REGISTER_BUTTON.SUBMITTING}</span>
          </>
        ) : (
          AUTH_CONFIG.REGISTER_BUTTON.SUBMIT
        )}
      </Button>
      <div className="text-center">
        <span>Bạn đã có tài khoản. </span>
        <Link
          href={"/auth/login"}
          className="text-blue-500 font-medium underline"
        >
          {AUTH_CONFIG.LOGIN_TITLE}
        </Link>
      </div>
    </form>
  );
}
