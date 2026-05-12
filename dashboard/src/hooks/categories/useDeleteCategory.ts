import { CATEGORY_CACHE } from "@/caches/category.cache";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const DELETE_CATEGORY = CATEGORY_CONFIG.MODAL.DELETE;
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return categoryService.delete(id);
    },
    onSuccess: (deleteCategory) => {
      queryClient.setQueryData(CATEGORY_CACHE.LIST, (oldList: Category[]) => {
        if (!oldList) {
          return [];
        }
        return oldList.filter((category) => category.id !== deleteCategory.id);
      });
      //Làm mới danh sách danh mục
      queryClient.invalidateQueries({ queryKey: CATEGORY_CACHE.LIST });
      //Làm mới danh mục chi tiết
      queryClient.invalidateQueries({
        queryKey: CATEGORY_CACHE.ITEM(deleteCategory.id),
      });
    },
  });
  const mutateWithToast = (id: string, callback: () => void) => {
    return toast.promise(mutation.mutateAsync(id), {
      loading: DELETE_CATEGORY.LOADING,
      error: DELETE_CATEGORY.ERROR,
      success: () => {
        if (callback) {
          callback();
        }
        return DELETE_CATEGORY.SUCCESS;
      },
    });
  };
  return {
    ...mutation,
    mutateWithToast,
  };
};
