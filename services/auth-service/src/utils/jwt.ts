import jwt from "jsonwebtoken";
import fs from "fs";

const JWT_PUBLIC_KEY = fs.readFileSync(
  process.env.JWT_PUBLIC_KEY_PATH!,
  "utf8"
);
const JWT_PRIVATE_KEY = fs.readFileSync(
  process.env.JWT_PRIVATE_KEY_PATH!,
  "utf8"
);

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
  const accessToken = jwt.sign(
    { sub: payload.userId, tenantId: payload.tenantId, scope: payload.role },
    JWT_PRIVATE_KEY,
    {
      algorithm: "RS256",
      expiresIn: "30d",
      issuer: "auth-service",
      audience: "microservices",
    }
  );

  const expiresIn = "30d";
  return {
    accessToken,
    expireIn: expiresIn,
  };
};

export const generateRefreshToken = (payload: {
  userId: string;
  tenantId?: string;
  role: string;
}): { refreshToken: string; expireIn: string } => {
  const refreshToken = jwt.sign(
    { sub: payload.userId, tenantId: payload.tenantId, scope: payload.role },
    JWT_PRIVATE_KEY,
    {
      algorithm: "RS256",
      expiresIn: "7d",
      issuer: "auth-service",
      audience: "microservices",
    }
  );
  return {
    refreshToken,
    expireIn: "7d",
  };
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
      issuer: "auth-service",
      audience: "microservices",
    }) as JwtPayload;
    return payload;
  } catch (err) {
    return null;
  }
};
