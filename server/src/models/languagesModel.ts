import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllLanguages = async () => {
  const languages = await prisma.langage.findMany({
    include: {
      snippet: {
        include: {
          utilisateur: { select: { nom: true } },
          precise: { include: { categorie: { select: { nom: true } } } },
        },
      },
    },
  });

  return languages.map(lang => ({
    ...lang,
    snippet: lang.snippet.map(s => ({
      ...s,
      categories: s.precise.map(p => p.categorie.nom),
    })),
  }));
};
