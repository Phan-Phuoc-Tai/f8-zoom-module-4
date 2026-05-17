import CreateProduct from "@/components/products/CreateProduct";
import Filters from "@/components/products/Filters";
import ProductsTable from "@/components/products/ProductsTable";
import { PRODUCT_CONFIG } from "@/constants/product.constant";

export default function ProductsPage() {
  return (
    <div className="category bg-(--bg-light-white) p-8 space-y-6 flex-1">
      <div>
        <h1 className="text-[32px] text-(--secondary-color)">
          {PRODUCT_CONFIG.TITLE}
        </h1>
        <div className="flex gap-5 items-center mt-3">
          <Filters />
          <CreateProduct />
        </div>
      </div>
      <ProductsTable />
    </div>
  );
}
