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

export async function getSnippetById(id: number) {
  return prisma.snippet.findUnique({
    where: { id_snippet: id },
    include: {
      utilisateur: true,
      langage: true,
      precise: {
        include: { categorie: true },
      },
      commentaire: {
        include: { utilisateur: true },
      },
      aime: true,
    },
  });
}

export async function getSnippetsByLangage(langageNom: string) {
  return await prisma.snippet.findMany({
    where: {
      langage: { nom: langageNom },
    },
    include: {
      utilisateur: { select: { nom: true } },
      langage: { select: { nom: true } },
      precise: {
        include: {
          categorie: { select: { nom: true } },
        },
      },
    },
  });
}

export async function getSnippetsByCategorie(categorieNom: string) {
  return await prisma.snippet.findMany({
    where: {
      precise: {
        some: {
          categorie: { nom: categorieNom },
        },
      },
    },
    include: {
      utilisateur: { select: { nom: true } },
      langage: { select: { nom: true } },
      precise: {
        include: {
          categorie: { select: { nom: true } },
        },
      },
    },
  });
}
