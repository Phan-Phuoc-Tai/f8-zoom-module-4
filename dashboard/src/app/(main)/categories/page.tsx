import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SearchInput from "@/components/categories/SearchInput";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import AddCategory from "../../../components/categories/AddCategory";
import CategoriesTable from "@/components/categories/CategoriesTable";

export default function CategoriesPage() {
  return (
    <div className="category bg-(--bg-light-white) h-screen p-8 space-y-6 ">
      <div className="flex justify-between">
        <h1 className="text-[32px] text-(--secondary-color)">
          {CATEGORY_CONFIG.TITLE}
        </h1>
        <div className="flex gap-5 items-center justify-end">
          <SearchInput />
          <AddCategory />
        </div>
      </div>
      <Table className="mt-6 bg-white rounded-lg overflow-hidden">
        <TableHeader className="bg-(--primary-color)">
          <TableRow>
            <TableHead className=" text-white">
              {CATEGORY_CONFIG.TABLE.ID}
            </TableHead>
            <TableHead className=" text-white ">
              {CATEGORY_CONFIG.TABLE.NAME}
            </TableHead>
            <TableHead className=" text-white">
              {CATEGORY_CONFIG.TABLE.DEPENDENCY}
            </TableHead>
            <TableHead className=" text-white">
              {CATEGORY_CONFIG.TABLE.UPDATED_AT}
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <CategoriesTable />
      </Table>
    </div>
  );
}
