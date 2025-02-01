import { CreateUser } from "../useCases/CreateUser.js";
import type { CreateUserDTO } from "../dtos/CreateUserDTO.js";
import { KnexUserRepository } from "../repositories/KnexUserRepository.js";
import { Knex } from "knex";

export class userService {
  static async create(data: CreateUserDTO, trx: Knex.Transaction) {
    const userRepository = new KnexUserRepository(trx);
    const createUser = new CreateUser(userRepository);
    return await createUser.execute(data);
  }
}
