import express from "express";
import { PrismaClient } from "@prisma/client";
import { setupSwagger } from "./docs/swagger";
import indexRoutes from "./routes/indexRoutes";

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
setupSwagger(app);

app.use("/api/v1/", indexRoutes);

async function startServer() {
  try {
    await prisma.$connect();

    app.listen(port, () => {
      console.log(`Tenant service is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
