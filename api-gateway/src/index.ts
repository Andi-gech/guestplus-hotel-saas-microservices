const express = require("express");

import { Request, Response } from "express";
const { createProxyMiddleware } = require("http-proxy-middleware");
const os = require("os");

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("API Gateway is running!");
});

app.get("/debug", (req: Request, res: Response) => {
  res.send(` api Handled by: ${os.hostname()}`);
});
app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
