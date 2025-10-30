import { Pool } from "pg";
import dotenv from "dotenv";

export class Database {
  private static pool: Pool;

  static getPool(): Pool {
    if (!Database.pool) {
      dotenv.config()

      Database.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }

    return Database.pool;
  }
}
