import jwt from "jsonwebtoken";
import fs from "fs";

const JWT_PUBLIC_KEY = fs.readFileSync(
  process.env.JWT_PUBLIC_KEY_PATH!,
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
