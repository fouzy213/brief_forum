import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllprecise = async () => {
  return prisma.precise.findMany({
  
  });
};
