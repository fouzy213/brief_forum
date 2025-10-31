import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllLanguages = async () => {
  return prisma.langage.findMany({
  
  });
};
