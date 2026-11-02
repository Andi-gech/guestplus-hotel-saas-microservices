import jwt from "jsonwebtoken";
import fs from "fs";

const publicKeyPath = process.env.JWT_PUBLIC_KEY_PATH;
const privateKeyPath = process.env.JWT_PRIVATE_KEY_PATH;

if (!publicKeyPath || !privateKeyPath) {
  throw new Error("JWT_PUBLIC_KEY_PATH and JWT_PRIVATE_KEY_PATH must be configured.");
}

const JWT_PUBLIC_KEY = fs.readFileSync(publicKeyPath, "utf8");
const JWT_PRIVATE_KEY = fs.readFileSync(privateKeyPath, "utf8");

export interface JwtPayload {
  sub: string;
  tenantId?: string;
  scope: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}

export const generateAccessToken = (payload: {
  userId: string;
  tenantId?: string;
  role: string;
}): { accessToken: string; expireIn: string } => {
  const expireIn = "15m";
  const accessToken = jwt.sign(
    { sub: payload.userId, tenantId: payload.tenantId, scope: payload.role },
    JWT_PRIVATE_KEY,
    {
      algorithm: "RS256",
      expiresIn: expireIn,
      issuer: "auth-service",
      audience: "microservices",
    }
  );

  return { accessToken, expireIn };
};

export const generateRefreshToken = (payload: {
  userId: string;
  tenantId?: string;
  role: string;
}): { refreshToken: string; expireIn: string } => {
  const expireIn = "7d";
  const refreshToken = jwt.sign(
    { sub: payload.userId, tenantId: payload.tenantId, scope: payload.role },
    JWT_PRIVATE_KEY,
    {
      algorithm: "RS256",
      expiresIn: expireIn,
      issuer: "auth-service",
      audience: "microservices",
    }
  );
  return { refreshToken, expireIn };
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
      issuer: "auth-service",
      audience: "microservices",
    }) as JwtPayload;
  } catch {
    return null;
  }
};
