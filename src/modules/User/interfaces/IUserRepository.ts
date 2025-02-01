import { User } from "../entities/User.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<number>;
}