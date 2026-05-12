import { CATEGORY_CACHE } from "@/caches/category.cache";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { categoryService } from "@/services/category.service";
import { Category, CategoryData } from "@/types/category.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const UPDATE_FORM = CATEGORY_CONFIG.MODAL.UPDATE_FORM;
  const mutation = useMutation({
    mutationFn: ({
      categoryData,
      id,
    }: {
      categoryData: CategoryData;
      id: string;
    }) => {
      return categoryService.update(categoryData, id);
    },
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(CATEGORY_CACHE.LIST, (oldList: Category[]) => {
        if (!oldList) {
          return [];
        }
        return oldList.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category,
        );
      });
      //Làm mới danh sách danh mục
      queryClient.invalidateQueries({ queryKey: CATEGORY_CACHE.LIST });
      //Làm mới danh mục chi tiết
      queryClient.invalidateQueries({
        queryKey: CATEGORY_CACHE.ITEM(updatedCategory.id),
      });
    },
  });
  //Làm mới dữ liệu và đồng bộ thông báo với toast
  const mutateWithToast = (
    categoryData: CategoryData,
    id: string,
    callback?: () => void,
  ) => {
    return toast.promise(mutation.mutateAsync({ categoryData, id }), {
      loading: UPDATE_FORM.LOADING,
      error: UPDATE_FORM.ERROR,
      success: () => {
        if (callback) {
          callback();
        }
        return UPDATE_FORM.SUCCESS;
      },
    });
  };
  return {
    ...mutation,
    mutateWithToast,
  };
};
