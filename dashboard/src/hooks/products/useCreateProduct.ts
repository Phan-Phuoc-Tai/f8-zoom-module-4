import { CATEGORY_CACHE } from "@/caches/category.cache";
import { PRODUCT_CACHE } from "@/caches/product.cache";
import { PRODUCT_CONFIG } from "@/constants/product.constant";
import { productService } from "@/services/product.service";

import { Product } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProducts = () => {
  const queryClient = useQueryClient();
  const ADD_FORM = PRODUCT_CONFIG.MODAL.ADD_FORM;
  const mutation = useMutation({
    mutationFn: (productData: Partial<Product>) => {
      return productService.create(productData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_CACHE.LIST_ALL });
    },
  });
  const createProduct = (
    productData: Partial<Product>,
    callback?: () => void,
  ) => {
    return toast.promise(mutation.mutateAsync(productData), {
      loading: ADD_FORM.LOADING,
      error: ADD_FORM.ERROR,
      success: () => {
        if (callback) {
          callback();
        }
        return ADD_FORM.SUCCESS;
      },
    });
  };
  return {
    ...mutation,
    createProduct,
  };
};
