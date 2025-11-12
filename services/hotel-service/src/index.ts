import express from "express";
import { PrismaClient } from "@prisma/client";
import { setupSwagger } from "./docs/swagger";
import hotel from "./routes/index";

import "dotenv/config";

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT) || 3000;
setupSwagger(app);

app.use(express.json());
app.use("/api/v1", hotel);

async function startServer() {
  try {
    await prisma.$connect();

    app.listen(port, () => {
      console.log(`Hotel service is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
