"use client";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas/category";
import { CategoryData } from "@/types/category.type";
import { toast } from "sonner";
import { categoryService } from "@/services/category.service";
type Props = {
  onClose: () => void;
};
export default function AddForm({ onClose }: Props) {
  const ADD_FORM = CATEGORY_CONFIG.MODAL.ADD_FORM;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });
  const onSubmit = (data: CategoryData) => {
    toast.promise(
      () => {
        data.parent = data.parent ?? null;
        return categoryService.create(data);
      },
      {
        loading: ADD_FORM.LOADING,
        error: ADD_FORM.ERROR,
        success: () => {
          reset();
          return ADD_FORM.SUCCESS;
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-base font-medium mb-3 text-(--secondary-color) ">
        <label htmlFor="name">{ADD_FORM.NAME}</label>
        <Input
          id="name"
          placeholder={ADD_FORM.PLACEHOLDER_NAME}
          className="focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)"
          {...register("name")}
        />
      </div>
      <div className="text-base font-medium mb-3 text-(--secondary-color) ">
        <label htmlFor="parent">{ADD_FORM.PARENT}</label>
        <Input
          id="parent"
          placeholder={ADD_FORM.PLACEHOLDER_PARENT}
          className="focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)"
          {...register("parent")}
        />
      </div>
      <div className="flex gap-2">
        <Button className="bg-(--primary-color)/80 h-auto py-2 px-4 cursor-pointer hover:bg-(--primary-color)">
          {ADD_FORM.ADD_BTN}
        </Button>
        <Button
          className="bg-red-50 text-red-500 h-auto py-2 px-4 cursor-pointer hover:bg-red-100"
          onClick={onClose}
        >
          {ADD_FORM.CANCEL_BTN}
        </Button>
      </div>
    </form>
  );
}
