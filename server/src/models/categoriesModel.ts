import { PrismaClient, categorie } from "@prisma/client";
const prisma = new PrismaClient();



export const getAllCategories = async (): Promise<categorie[]> => {
  return prisma.categorie.findMany();
  
};




