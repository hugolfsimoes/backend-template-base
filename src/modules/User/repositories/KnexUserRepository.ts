import type { IUserRepository } from "../interfaces/IUserRepository.js";
import { User } from "../entities/User.js";
import knex, { type Knex } from "knex";

export class KnexUserRepository implements IUserRepository {
  constructor(private db: Knex) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db("users").where({ email }).first();
    return user ? new User(user.id, user.name, user.email, user.password) : null;
  }

  async create(user: User): Promise<User> {
    const [ result ] = await this.db("users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }).returning('*');

    return result;
  }
}
