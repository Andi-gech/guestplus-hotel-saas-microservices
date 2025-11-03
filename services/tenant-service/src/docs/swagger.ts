import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tenant Microservice API",
      version: "1.0.0",
      description: "API documentation for Tenant and related modules",
    },
    servers: [{ url: "http://localhost:3000/api/v1" }],
  },
  apis: ["./src/docs/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
