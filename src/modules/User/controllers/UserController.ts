import type { Request, Response } from "express";
import { userService } from "../services/UserService.js";
import knex from "../../../infrastructure/database/knexInstance.js";

export class UserController {
  static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;


    const trx = await knex.transaction();

    try {

      const user = await userService.create({ name, email, password }, trx);

      await trx.commit();

      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      await trx.rollback();

      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred" });
      }
    }
  }
}
