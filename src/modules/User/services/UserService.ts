import { RegisterUser } from "../useCases/RegisterUser.ts";
import { KnexUserRepository } from "../repositories/KnexUserRepository.ts";
import knex from "../../../infrastructure/database/knexInstance.ts";

export class UserService {
  private userRepository = new KnexUserRepository(knex);

  async registerUser(name: string, email: string, password: string) {
    const registerUser = new RegisterUser(this.userRepository);
    return await registerUser.execute(name, email, password);
  }
}