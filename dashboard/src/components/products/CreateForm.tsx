"use client";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CONFIG } from "@/constants/config.constant";
import { useCategories } from "@/hooks/categories/useCategories";
import { PRODUCT_CONFIG } from "@/constants/product.constant";
import { createProductSchema } from "@/schemas/product.schema";
import { Product } from "@/types/product.type";
import { useCreateProducts } from "@/hooks/products/useCreateProduct";
import CustomEditor from "./CustomEditor";
type Props = {
  onClose: () => void;
};
export default function CreateForm({ onClose }: Props) {
  const ADD_FORM = PRODUCT_CONFIG.MODAL.ADD_FORM;
  const [images, setImages] = useState<number[]>([]);
  const { categories } = useCategories();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const { createProduct, isPending } = useCreateProducts();
  const onSubmit = (data: Partial<Product>) => {
    createProduct(data, () => {
      reset();
      router.push(`${CONFIG.PRODUCTS()}?page=1`);
      onClose();
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-5">
        <div className="flex-1">
          <div className="flex items-start gap-5">
            <div className="flex-1 text-base font-normal mb-3 text-(--secondary-color) ">
              <label htmlFor="name">{ADD_FORM.NAME}</label>
              <Input
                id="name"
                placeholder={ADD_FORM.PLACEHOLDER_NAME}
                className={cn(
                  "focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)",
                  errors.name?.message && "border-red-600 text-red-600",
                )}
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="text-red-500 font-normal text-sm mt-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex-1 flex gap-10">
              <div className="text-base font-normal text-(--secondary-color) ">
                <label htmlFor="categoryId">{ADD_FORM.CATEGORY}</label>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <div className="mt-1">
                      <Select defaultValue="0" onValueChange={field.onChange}>
                        <SelectTrigger
                          className={cn(
                            "focus-visible:ring-0 focus-visible:border-(--primary-color)",
                            errors.categoryId?.message &&
                              "border-red-600 text-red-600",
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">Chọn danh mục</SelectItem>
                            {categories.map((category) => (
                              <SelectItem
                                value={category.id!.toString()}
                                key={category.id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>

              <div className="text-base font-normal text-(--secondary-color)">
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
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="text-base font-normal mb-3 text-(--secondary-color) flex-1">
              <label htmlFor="price">{ADD_FORM.PRICE}</label>
              <Input
                id="price"
                type="number"
                className={cn(
                  "focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)",
                  errors.price?.message && "border-red-600",
                )}
                {...register("price")}
              />

              {errors.price?.message && (
                <p className="text-red-500 font-normal text-sm mt-0.5">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="text-base font-normal mb-3 text-(--secondary-color) flex-1">
              <label htmlFor="salePrice">{ADD_FORM.SALE_PRICE}</label>
              <Input
                id="salePrice"
                type="number"
                className={cn(
                  "focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)",
                  errors.salePrice?.message && "border-red-600",
                )}
                {...register("salePrice")}
              />
              {errors.salePrice?.message && (
                <p className="text-red-500 font-normal text-sm mt-0.5">
                  {errors.salePrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="text-base font-normal mb-3 text-(--secondary-color)">
            <label htmlFor="thumbnail">{ADD_FORM.THUMBNAIL}</label>
            <div className="flex items-center gap-3">
              <Input
                id="thumbnail"
                className={cn(
                  "focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)",
                  errors.thumbnail?.message && "border-red-600",
                )}
                {...register("thumbnail")}
              />
              <Button variant={"destructive"} className="py-2 h-auto">
                <Trash2 />
              </Button>
            </div>
            {errors.thumbnail?.message && (
              <p className="text-red-500 font-normal text-sm mt-0.5">
                {errors.thumbnail.message}
              </p>
            )}
          </div>
          <div className="text-base font-normal mb-3 text-(--secondary-color)">
            <label htmlFor="images" className="block">
              {ADD_FORM.IMAGES}
            </label>
            {images.map((_, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center gap-3">
                  <Input
                    id="images"
                    className={cn(
                      "focus-visible:ring-0 h-auto py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color)",
                      errors.images?.[index]?.message && "border-red-600",
                    )}
                    {...register(`images.${index}`)}
                  />
                  <Button variant={"destructive"} type="button">
                    <Trash2 />
                  </Button>
                </div>
                {errors.images?.[index]?.message && (
                  <p className="text-red-500 font-normal text-sm mt-0.5">
                    {errors.images[index].message}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="button"
              className="bg-(--primary-color)"
              onClick={() => setImages([...images, Date.now()])}
            >
              <Plus /> {ADD_FORM.ADD_IMAGE_BTN}
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-base font-normal mb-3 text-(--secondary-color) ">
            <label htmlFor="shortDescription">
              {ADD_FORM.SHORT_DESCRIPTION}
            </label>
            <Textarea
              id="shortDescription"
              className="focus-visible:ring-0 py-2 rounded-md text-(--secondary-color) placeholder:text-(--secondary-color)/30 focus-visible:border-(--primary-color) h-20"
              {...register("shortDescription")}
            />

            {errors.shortDescription?.message && (
              <p className="text-red-500 font-normal text-sm mt-0.5">
                {errors.shortDescription.message}
              </p>
            )}
          </div>
          <div className="text-base font-normal mb-3 text-(--secondary-color) ">
            <label htmlFor="short_description">{ADD_FORM.DESCRIPTION}</label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <CustomEditor value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.description?.message && (
              <p className="text-red-500 font-normal text-sm mt-0.5">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        className="bg-(--primary-color)/80 h-auto py-2 px-4 cursor-pointer hover:bg-(--primary-color)"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <span>{ADD_FORM.ADD_BTN}</span>
            <Spinner />
          </>
        ) : (
          ADD_FORM.ADD_BTN
        )}
      </Button>
    </form>
  );
}
