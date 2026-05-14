"use client";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas/category";
import { CategoryData } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";
import { CATEGORY_CACHE } from "@/caches/category.cache";
import { categoryService } from "@/services/category.service";
import { useEffect } from "react";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import { Switch } from "../ui/switch";

type Props = {
  onClose: () => void;
  id: string;
};
export default function UpdateForm({ onClose, id }: Props) {
  const UPDATE_FORM = CATEGORY_CONFIG.MODAL.UPDATE_FORM;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });
  const { data: category } = useQuery({
    queryKey: CATEGORY_CACHE.ITEM(id),
    queryFn: () => categoryService.getCategoryById(id),
  });

  const { updateCategory, isPending } = useUpdateCategory();
  const onSubmit = (data: CategoryData) => {
    updateCategory(data, id, () => {
      reset();
      onClose();
    });
  };

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("status", category.status);
    }
  }, [category]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-base font-normal mb-3 text-(--secondary-color) ">
        <label htmlFor="name">
          {UPDATE_FORM.NAME}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Input
          id="name"
          placeholder={UPDATE_FORM.PLACEHOLDER_NAME}
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
        <label htmlFor="status">{UPDATE_FORM.STATUS}</label>
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
        disabled={isPending}
        className="bg-(--primary-color)/80 h-auto py-2 px-4 cursor-pointer hover:bg-(--primary-color)"
      >
        {UPDATE_FORM.ADD_BTN}
      </Button>
    </form>
  );
}
