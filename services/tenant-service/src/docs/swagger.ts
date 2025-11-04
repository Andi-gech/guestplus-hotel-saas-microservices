import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { apiReference } from "@scalar/express-api-reference";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GuestPlus Tenant Service API",
      version: "1.0.0",
      description:
        "Tenant Service API — manages tenants, tenant users, and subscription plans. Spec: /api/v1/api-docs.json · UI: /api/v1/api-docs",
    },
    servers: [{ url: "http://localhost:3000/api/v1" }],
  },
  apis: ["./src/docs/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.get("/api/v1/api-docs.json", (req, res) => res.json(swaggerSpec));
  app.use(
    "/api/v1/api-docs",
    apiReference({
      spec: {
        url: "/api/v1/api-docs.json",
      },

      theme: "elysiajs",
      defaultOpenAllTags: true,
      expandAllModelSections: true,
      expandAllResponses: true,
      hideClientButton: true,
      hideDarkModeToggle: true,
      showSidebar: true,

      operationTitleSource: "summary",
      persistAuth: false,
      telemetry: true,
      layout: "modern",
      showToolbar: "never",
      isEditable: false,
      isLoading: false,
      hideModels: false,
      documentDownloadType: "both",
      hideTestRequestButton: false,
      hideSearch: false,
      showOperationId: false,
      withDefaultFonts: true,
      orderSchemaPropertiesBy: "alpha",
      orderRequiredPropertiesFirst: true,
      _integration: "express",
      default: false,
      slug: "tenant-service",
      title: "GuestPlus Tenant Service API",
    })
  );
};
