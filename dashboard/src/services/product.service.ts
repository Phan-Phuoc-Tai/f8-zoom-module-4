import { axiosInstance } from "@/lib/axios";
import { Product } from "@/types/product.type";

export const productService = {
  async getProducts(filters: { [k: string]: string }): Promise<{
    data: Product[];
    totalPage: number;
    currentPage: number;
  }> {
    const params = new URLSearchParams(filters);
    const response = await axiosInstance.get(`/products?${params.toString()}`);
    const { data, meta } = response.data;
    const { limit, total, currentPage } = meta;
    const totalPage = Math.ceil(total / limit);
    return {
      data,
      totalPage,
      currentPage,
    };
  },
  async create(productData: Partial<Product>) {
    const response = await axiosInstance.post("/products", {
      ...productData,
    });
    const { data } = response.data;
    return data;
  },
};
