import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { Button } from "../ui/button";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCategories } from "@/hooks/categories/useCategories";
type Props = {
  onClose: () => void;
  id: string;
};
export default function DeleteCategory({ onClose, id }: Props) {
  const DELETE_CATEGORY = CATEGORY_CONFIG.MODAL.DELETE;
  const { categories } = useCategories();
  const { mutateWithToast, isPending } = useDeleteCategory();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;

  const handleChangePage = () => {
    if (+currentPage > 1 && categories!.length === 1) {
      const params = new URLSearchParams(searchParams);
      const prevPage = +currentPage - 1;
      params.set("page", prevPage.toString());
      router.replace(`${pathName}?${params.toString()}`);
    }
    return;
  };
  const handleDeleteCategory = () => {
    mutateWithToast(id, () => {
      handleChangePage();
      onClose();
    });
  };
  return (
    <>
      <p className="mb-2 text-base font-normal">{DELETE_CATEGORY.DESC}</p>
      <div className="flex gap-2">
        <Button
          className="h-auto px-3 py-1 cursor-pointer"
          variant={"destructive"}
          onClick={handleDeleteCategory}
          disabled={isPending}
        >
          {DELETE_CATEGORY.DELETE_BTN}
        </Button>
        <Button
          variant={"secondary"}
          className="h-auto px-3 py-1 cursor-pointer"
          onClick={onClose}
        >
          {DELETE_CATEGORY.CANCEL_BTN}
        </Button>
      </div>
    </>
  );
}
