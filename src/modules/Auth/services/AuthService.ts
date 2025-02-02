import { LoginUseCase } from "../useCases/LoginUseCase.js";
import { KnexUserRepository } from "../../User/repositories/KnexUserRepository.js";
import knex from "../../../infrastructure/database/knexInstance.js";

export class AuthService {
  static async login(email: string, password: string): Promise<string> {

    const userRepository = new KnexUserRepository(knex);


    const authenticateUser = new LoginUseCase(userRepository);
    return await authenticateUser.execute({ email, password });
  }
}
