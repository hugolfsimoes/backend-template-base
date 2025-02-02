import type { IUserRepository } from "../interfaces/IUserRepository.js";
import { User } from "../entities/User.js";
import type { CreateUserDTO } from "../dtos/CreateUserDTO.js";
import { UserResponseDTO } from "../dtos/UserResponseDTO.js";



export class CreateUser {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = User.hashPassword(data.password);
    const user = new User(undefined, data.name, data.email, hashedPassword);

    const newUser = await this.userRepository.create(user);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}
