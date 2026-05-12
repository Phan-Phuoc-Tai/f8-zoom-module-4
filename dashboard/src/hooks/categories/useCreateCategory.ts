import { CATEGORY_CACHE } from "@/caches/category.cache";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { categoryService } from "@/services/category.service";
import { CategoryData } from "@/types/category.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const ADD_FORM = CATEGORY_CONFIG.MODAL.ADD_FORM;
  const mutation = useMutation({
    mutationFn: (categoryData: CategoryData) => {
      return categoryService.create(categoryData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_CACHE.LIST });
    },
  });
  //Làm mới dữ liệu và đồng bộ thông báo với toast
  const mutateWithToast = (
    categoryData: CategoryData,
    callback?: () => void,
  ) => {
    return toast.promise(mutation.mutateAsync(categoryData), {
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
    mutateWithToast,
  };
};
