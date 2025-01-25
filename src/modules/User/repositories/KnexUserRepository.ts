import { Knex } from "knex";
import { IUserRepository } from "../interfaces/IUserRepository.ts";
import { User } from "../entities/User.ts";

export class KnexUserRepository implements IUserRepository {
  constructor(private knex: Knex) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.knex("users").where({ id }).first();
    return user ? new User(user.id, user.name, user.email, user.password) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.knex("users").where({ email }).first();
    return user ? new User(user.id, user.name, user.email, user.password) : null;
  }

  async create(user: User): Promise<void> {
    await this.knex("users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}