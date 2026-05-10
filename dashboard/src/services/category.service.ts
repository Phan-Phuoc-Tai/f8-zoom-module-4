import { axiosInstance } from "@/lib/axios";
import { Category, CategoryData } from "@/types/category.type";

export const categoryService = {
  async create(categoryData: CategoryData) {
    const response = await axiosInstance.post("/categories", {
      categoryData,
    });
    const { data } = response.data;
    return data;
  },
  async findAll(): Promise<Category[]> {
    const response = await axiosInstance.get("/categories");
    const { data } = response.data;
    return data;
  },
};
