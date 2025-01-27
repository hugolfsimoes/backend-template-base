import { IUserRepository } from "../../User/interfaces/IUserRepository.js";
import { TokenService } from "../services/TokenService.js";
import bcrypt from "bcryptjs";

export class AuthenticateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      throw new Error("Invalid email or password");
    }


    return TokenService.generateToken({ id: user.id });
  }
}
