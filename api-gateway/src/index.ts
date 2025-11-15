import express, { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import "dotenv/config";

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// // Targets (use service DNS names as defined in docker-compose)
const AUTH_URL = process.env.AUTH_URL || "http://auth-service:3006";
const HOTEL_URL = process.env.HOTEL_URL || "http://hotel-service:3001";
const RESERVATION_URL =
  process.env.RESERVATION_URL || "http://reservation-service:3003";
const REWARD_URL = process.env.REWARD_URL || "http://reward-service:3004";
const TENANT_URL = process.env.TENANT_URL || "http://tenant-service:3010";

// // Proxy routes under /api/v1/
app.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: AUTH_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/auth": "" },
  })
);

app.use(
  "/api/v1/hotel",
  createProxyMiddleware({
    target: HOTEL_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/hotel": "" },
  })
);

app.use(
  "/api/v1/reservation",
  createProxyMiddleware({
    target: RESERVATION_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/reservation": "" },
  })
);

app.use(
  "/api/v1/reward",
  createProxyMiddleware({
    target: REWARD_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/reward": "" },
  })
);

app.use(
  "/api/v1/tenant",
  createProxyMiddleware({
    target: TENANT_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/tenant": "" },
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("API Gateway is running!");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
