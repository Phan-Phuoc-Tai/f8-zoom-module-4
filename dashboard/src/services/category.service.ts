import { axiosInstance } from "@/lib/axios";
import { Category, CategoryData } from "@/types/category.type";

export const categoryService = {
  async create(categoryData: CategoryData) {
    const response = await axiosInstance.post("/categories", {
      ...categoryData,
    });
    const { data } = response.data;
    return data;
  },
  async update(categoryData: CategoryData, id: string) {
    const response = await axiosInstance.put(`/categories/${id}`, {
      ...categoryData,
    });
    const { data } = response.data;
    return data;
  },
  async delete(id: string) {
    const response = await axiosInstance.delete(`/categories/${id}`);
    const { data } = response.data;
    return data;
  },
  async getCategories(filters: { [k: string]: string }): Promise<{
    data: Category[];
    totalPage: number;
    currentPage: number;
  }> {
    const params = new URLSearchParams(filters);
    const response = await axiosInstance.get(
      `/categories?${params.toString()}`,
    );
    const { data, meta } = response.data;
    const { limit, total, currentPage } = meta;
    const totalPage = Math.ceil(total / limit);
    return {
      data,
      totalPage,
      currentPage,
    };
  },
  async getCategoryById(id: string): Promise<Category> {
    const response = await axiosInstance.get(`/categories/${id}`);
    const { data } = response.data;
    return data;
  },
  async getCategoryParents(): Promise<Category[]> {
    const response = await axiosInstance.get("/categories/parents");
    const { data } = response.data;
    return data;
  },
};
