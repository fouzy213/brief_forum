import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createComment = async (snippetId: number, userId: number, texte: string) => {
  return await prisma.commentaire.create({
    data: {
      texte,
      date_publication: new Date(),
      id_utilisateur: userId,
      id_snippet: snippetId
    },
    include: {
      utilisateur: {
        select: {
          id_utilisateur: true,
          nom: true,
          email: true
        }
      }
    }
  });
};

export const getCommentsBySnippet = async (snippetId: number) => {
  return await prisma.commentaire.findMany({
    where: { id_snippet: snippetId },
    include: {
      utilisateur: {
        select: {
          id_utilisateur: true,
          nom: true,
          email: true
        }
      }
    },
    orderBy: { date_publication: 'desc' }
  });
};