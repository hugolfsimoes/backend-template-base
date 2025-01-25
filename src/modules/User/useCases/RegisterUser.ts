import { v4 as uuidv4 } from "uuid";
import { IUserRepository } from "../interfaces/IUserRepository.ts";
import { User } from "../entities/User.ts";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = User.hashPassword(password);
    const user = new User(uuidv4(), name, email, hashedPassword);
    await this.userRepository.create(user);
    return user;
  }
}
