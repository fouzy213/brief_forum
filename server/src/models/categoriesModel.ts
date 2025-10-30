import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return prisma.categorie.findMany({
  
  });
};
