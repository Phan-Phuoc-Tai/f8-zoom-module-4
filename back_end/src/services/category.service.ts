import { CATEGORY_ERROR } from "../constants/category.constant";
import { BadRequestException } from "../exceptions/badRequest.exception";
import { NotFoundException } from "../exceptions/notFound.exception";
import {
  CategoryCreateInput,
  CategoryFindManyArgs,
  CategoryWhereInput,
} from "../generated/prisma/models";
import { prisma } from "../lib/prisma";
import { CategoryQuery } from "../types/category.type";

export const categoryService = {
  async create(categoryData: CategoryCreateInput) {
    try {
      const category = await prisma.category.create({
        data: categoryData,
      });
      return category;
    } catch {
      throw new BadRequestException(CATEGORY_ERROR.CREATE_FAILED);
    }
  },
  async update(categoryData: CategoryCreateInput, id: number) {
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
  async findCategoryById(id: number) {
    return await prisma.category.findUnique({
      where: { id },
    });
  },
  findCategoryByName(name: string) {
    return prisma.category.findUnique({
      where: { name },
    });
  },

  findAll(query: CategoryQuery) {
    const { page = 1, limit = 10, q = "" } = query;
    const filters = {} as CategoryWhereInput;
    if (q) {
      filters.name = {
        contains: q,
        mode: "insensitive",
      };
    }
    const options = {
      where: {
        ...filters,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: +limit,
      skip: (+page - 1) * +limit,
    } as CategoryFindManyArgs;

    return Promise.all([
      prisma.category.findMany(options),
      prisma.category.count({
        where: filters,
      }),
    ]);
  },
};
