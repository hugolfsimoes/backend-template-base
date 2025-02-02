import type { IUserRepository } from "../../User/interfaces/IUserRepository.js";
import { TokenService } from "../services/TokenService.js";
import bcrypt from "bcryptjs";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ user: any; token: string; }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      throw new Error("Invalid email or password");
    }

    const token = TokenService.generateToken({ id: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
