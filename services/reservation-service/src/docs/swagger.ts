import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { apiReference } from "@scalar/express-api-reference";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GuestPlus Reservation Service API",
      version: "1.0.0",
      description:
        "Reservation Service API — manages Reservations and their data. Spec: /api/v1/api-docs.json · UI: /api/v1/api-docs",
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
      mode: "light",

      showSidebar: true,

      operationTitleSource: "summary",
      persistReservation: false,
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
      slug: "Reservation-service",
      title: "GuestPlus Reservation API",
    })
  );
};
