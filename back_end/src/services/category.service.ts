import { CATEGORY_ERROR } from "../constants/category.constant";
import { NotFoundException } from "../exceptions/notFound.exception";
import { prisma } from "../lib/prisma";
import { CategoryData } from "../types/category.type";

export const categoryService = {
  async create(categoryData: CategoryData) {
    const category = await this.findCategoryByName(categoryData.parent);

    if (!category) {
      throw new NotFoundException(CATEGORY_ERROR.NOT_FOUND);
    }
    return prisma.category.create({
      data: {
        name: categoryData.name,
        parentId: category.id,
      },
    });
  },
  async update(categoryData: CategoryData, id: number) {
    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(CATEGORY_ERROR.NOT_FOUND);
    }
    return prisma.category.update({
      where: { id },
      data: categoryData,
    });
  },
  async delete(id: number) {
    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(CATEGORY_ERROR.NOT_FOUND);
    }
    return prisma.category.delete({
      where: { id },
    });
  },
  findCategoryById(id: number) {
    return prisma.category.findUnique({
      where: { id },
    });
  },
  findCategoryByName(name: string) {
    return prisma.category.findUnique({
      where: { name },
    });
  },
  findAll() {
    return prisma.category.findMany();
  },
};
