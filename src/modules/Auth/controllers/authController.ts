import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const { user, token } = await AuthService.login(email, password);

      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}
