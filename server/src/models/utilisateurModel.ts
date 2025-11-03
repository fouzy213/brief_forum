import { utilisateur } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class User {
    protected id?: number;
    protected email: string;
    protected nom: string;
    protected password_hash: string;
    protected created_at: string;

    constructor(email: string, nom: string, password_hash: string, created_at?: string, id?: number) {
        this.id = id;
        this.email = email;
        this.nom = nom;
        this.password_hash = password_hash;
        this.created_at = created_at ?? new Date().toISOString();
    }

    // Transforme une row Prisma en instance User
 static fromRow(row: utilisateur): User {
    return new User(row.email, row.nom, row.mot_de_passe_hash, row.date_creation.toISOString(), row.id_utilisateur);
}


    static async getAllUsers(): Promise<User[]> {
        const rows = await prisma.utilisateur.findMany();
        return rows.map(User.fromRow);
    }

    static async getById(id: number): Promise<User | null> {
        const row = await prisma.utilisateur.findUnique({ where: { id_utilisateur: id } });
        return row ? User.fromRow(row) : null;
    }

    static async create(email: string, nom: string, password_hash: string): Promise<User> {
        const row = await prisma.utilisateur.create({
            data: {
                email,
                nom: nom,
                mot_de_passe_hash: password_hash,
                date_creation: new Date(),
            },
        });
        return User.fromRow(row);
    }

    static async deleteById(id: number): Promise<void> {
        await prisma.utilisateur.delete({ where: { id_utilisateur: id } });
    }

    getId = (): number | undefined => this.id;
    getEmail = (): string => this.email;
    getName = (): string => this.nom;
    getPasswordHash = (): string => this.password_hash;
    getCreatedAt = (): string => this.created_at;

    serialize = (): Record<string, string> => ({
        email: this.email,
        nom: this.nom,
    });
}
