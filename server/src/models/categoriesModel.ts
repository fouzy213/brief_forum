import { PrismaClient, categorie, snippet } from "@prisma/client";
const prisma = new PrismaClient();



export const getAllCategories = async (): Promise<categorie[]> => {
  return prisma.categorie.findMany();
};




