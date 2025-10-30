import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllSnippet = async () => {
  return prisma.snippet.findMany({
    include: {
      utilisateur: true,
      langage: true,
    },
  });
};
