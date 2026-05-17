import { PRODUCT_ERROR } from "../constants/product.constant";
import { BadRequestException } from "../exceptions/badRequest.exception";
import { NotFoundException } from "../exceptions/notFound.exception";
import {
  ProductCreateInput,
  ProductFindManyArgs,
  ProductWhereInput,
} from "../generated/prisma/models";

import { prisma } from "../lib/prisma";
import { ProductData, ProductQuery } from "../types/product.type";

export const productService = {
  async create({ images, ...productData }: ProductData) {
    try {
      const product = await prisma.product.create({
        data: {
          ...productData,
          images: {
            create: images.map((image) => ({ image })),
          },
        },
      });
      return product;
    } catch {
      throw new BadRequestException(PRODUCT_ERROR.CREATE_FAILED);
    }
  },
  async update(categoryData: ProductCreateInput, id: number) {
    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(PRODUCT_ERROR.NOT_FOUND);
    }
    return prisma.category.update({
      where: { id },
      data: categoryData,
    });
  },
  async delete(id: number) {
    const category = await this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(PRODUCT_ERROR.NOT_FOUND);
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
  findAll(query: ProductQuery) {
    const { page = 1, limit = 10 } = query;
    const filters = {} as ProductWhereInput;
    // if (q) {
    //   filters.name = {
    //     contains: q,
    //     mode: "insensitive",
    //   };
    // }
    const options = {
      where: {
        ...filters,
      },
      include: {
        category: true,
        images: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: +limit,
      skip: (+page - 1) * +limit,
    } as ProductFindManyArgs;

    return Promise.all([
      prisma.product.findMany(options),
      prisma.product.count({}),
    ]);
  },
};
