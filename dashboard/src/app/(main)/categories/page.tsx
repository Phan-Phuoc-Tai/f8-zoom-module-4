import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SearchInput from "@/components/categories/SearchInput";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import CreateCategory from "../../../components/categories/CreateCategory";
import CategoriesTable from "@/components/categories/CategoriesTable";

export default function CategoriesPage() {
  const TABLE = CATEGORY_CONFIG.TABLE;
  return (
    <div className="category bg-(--bg-light-white) p-8 space-y-6 flex-1">
      <div className="flex justify-between">
        <h1 className="text-[32px] text-(--secondary-color)">
          {CATEGORY_CONFIG.TITLE}
        </h1>
        <div className="flex gap-5 items-center justify-end">
          <SearchInput />
          <CreateCategory />
        </div>
      </div>
      <Table className="mt-6 bg-white rounded-lg overflow-hidden">
        <TableHeader className="bg-(--primary-color)">
          <TableRow>
            {TABLE.map((item) => (
              <TableHead
                key={item.FIELD}
                className={`${item.CLASS_NAME} text-white`}
              >
                {item.TEXT}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <CategoriesTable />
      </Table>
    </div>
  );
}
