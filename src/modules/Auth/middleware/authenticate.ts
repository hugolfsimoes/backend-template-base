import type { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/TokenService.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [ , token ] = authHeader.split(" ");

  try {
    const decoded = TokenService.verifyToken(token);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
