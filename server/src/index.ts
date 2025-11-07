import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import router from './routes';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "dev"}`;
dotenv.config({ path: envFile });



const app = express();
const prisma = new PrismaClient();
const PORT = 3002;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CORS_OPTIONS: CorsOptions = {
  origin: ["http://localhost:5143"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials:true,
};

app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/api", router);
app.use("/image", express.static(resolve("public/assets")));

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`🚀 Serveur en ligne sur heyyy ooooo http://localhost:${PORT}`);
});
export default app;
