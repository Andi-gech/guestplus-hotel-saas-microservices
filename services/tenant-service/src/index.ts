import express from "express";
import { PrismaClient } from "@prisma/client";
import tenantRoutes from "./routes/tenantRoutes";
import { setupSwagger } from "./docs/swagger";

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
setupSwagger(app);
app.use("/api/v1/tenants", tenantRoutes);

async function startServer() {
  console.log("Attempting to connect to database...");
  try {
    await prisma.$connect();
    console.log(
      "Database connected successfully to ",
      process.env.DATABASE_URL
    );

    app.listen(port, () => {
      console.log(`Tenant service is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
