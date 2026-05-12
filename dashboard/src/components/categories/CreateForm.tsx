"use client";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas/category";
import { CategoryData } from "@/types/category.type";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useCategories } from "@/hooks/categories/useCategories";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  onClose: () => void;
};
export default function CreateForm({ onClose }: Props) {
  const ADD_FORM = CATEGORY_CONFIG.MODAL.ADD_FORM;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", parentId: "" },
  });
  const categories = useCategories();
  const categoryOptions = () => {
    const categoriesRoot = categories?.filter(
      (category) => category.parentId === null,
    );
    return [
      {
        id: null,
        name: "Danh mục mới",
        parentId: null,
      },
      ...categoriesRoot!,
    ];
  };
  const { mutateWithToast, isPending } = useCreateCategory();
  const onSubmit = (data: CategoryData) => {
    const findCategoryWithParentId = categories?.find(
      (category) => category.name === data.parentId,
    );
    mutateWithToast(
      {
        ...data,
        parentId: findCategoryWithParentId?.id
          ? findCategoryWithParentId.id
          : null,
      },
      () => {
        reset();
        onClose();
      },
    );
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
        <label htmlFor="parentId">{ADD_FORM.PARENT}</label>

        <Controller
          control={control}
          name="parentId"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2 p-3 border rounded-md">
              {categoryOptions()?.map((option) => {
                const isSelected = field.value === option.name;
                return (
                  <Badge
                    key={option.id}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer px-3 py-1 h-auto text-sm select-none",
                      isSelected
                        ? "bg-(--primary-color) text-primary-foreground shadow-sm"
                        : "bg-background hover:bg-slate-100 text-muted-foreground",
                    )}
                    onClick={() => {
                      field.onChange(isSelected ? "" : option.name);
                    }}
                  >
                    {option.name}
                  </Badge>
                );
              })}
            </div>
          )}
        />
        {errors.parentId?.message && (
          <p className="text-red-500 font-normal text-sm mt-0.5">
            {errors.parentId.message}
          </p>
        )}
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
