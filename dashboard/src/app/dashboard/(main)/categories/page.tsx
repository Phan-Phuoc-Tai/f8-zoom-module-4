import Filters from "@/components/categories/Filters";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import CategoriesTable from "@/components/categories/CategoriesTable";
import CreateCategory from "@/components/categories/CreateCategory";

export default function CategoriesPage() {
  return (
    <div className="category bg-(--bg-light-white) p-8 space-y-6 flex-1">
      <div>
        <h1 className="text-[32px] text-(--secondary-color)">
          {CATEGORY_CONFIG.TITLE}
        </h1>
        <div className="flex gap-5 items-center mt-3">
          <Filters />
          <CreateCategory />
        </div>
      </div>
      <CategoriesTable />
    </div>
  );
}
