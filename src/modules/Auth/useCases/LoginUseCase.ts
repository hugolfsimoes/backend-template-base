import { IUserRepository } from "../../User/interfaces/IUserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginDTO } from "../dtos/LoginDTO.js";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: LoginDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
      expiresIn: "1h",
    });

    return token;
  }
}
