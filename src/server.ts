import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import NodeCache from "node-cache";
import { PrismaClient } from "@prisma/client";
import playlistRoutes from "./routes/playlist";
import userRoutes from "./routes/user";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT ?? 3000;
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // Cache con TTL de 10 minutos

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/user", userRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
