"use client";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas/category";
import { CategoryData } from "@/types/category.type";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/constants/config.constant";
import { Switch } from "../ui/switch";

type Props = {
  onClose: () => void;
};
export default function CreateForm({ onClose }: Props) {
  const ADD_FORM = CATEGORY_CONFIG.MODAL.ADD_FORM;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const { createCategory, isPending } = useCreateCategory();
  const onSubmit = (data: CategoryData) => {
    createCategory(data, () => {
      reset();
      router.push(`${CONFIG.CATEGORIES()}?page=1`);
      onClose();
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-base font-normal mb-3 text-(--secondary-color) ">
        <label htmlFor="name">
          {ADD_FORM.NAME}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Input
          id="name"
          placeholder={ADD_FORM.PLACEHOLDER_NAME}
          className="focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-red-500 font-normal text-sm mt-0.5">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="text-base font-normal mb-3 text-(--secondary-color) ">
        <label htmlFor="status">{ADD_FORM.STATUS}</label>

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <div className="mt-1">
              <Switch
                id="status"
                checked={field.value}
                onCheckedChange={field.onChange}
                defaultChecked={true}
                className="data-checked:bg-(--primary-color) cursor-pointer"
              />
            </div>
          )}
        />
      </div>
      <Button
        className="bg-(--primary-color)/80 h-auto py-2 px-4 cursor-pointer hover:bg-(--primary-color)"
        disabled={isPending}
      >
        {ADD_FORM.ADD_BTN}
      </Button>
    </form>
  );
}
