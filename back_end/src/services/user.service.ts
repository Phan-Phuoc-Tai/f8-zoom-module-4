import { UserCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

export const userService = {
  findEmailExist(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
  async findUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch {
      return false;
    }
  },
  async findUserBySecretId(secretId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { secretId },
      });
      return user;
    } catch {
      return false;
    }
  },
  create(userData: UserCreateInput) {
    return prisma.user.create({
      data: userData,
    });
  },
};
