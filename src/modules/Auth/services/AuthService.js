import { AuthenticateUser } from "../useCases/AuthenticateUser.js";
import { KnexUserRepository } from "../../User/repositories/KnexUserRepository.js";
import knex from "../../../infrastructure/database/knexInstance.ts";
export class AuthService {
    static async login(email, password) {
        const userRepository = new KnexUserRepository(knex);
        const authenticateUser = new AuthenticateUser(userRepository);
        return await authenticateUser.execute(email, password);
    }
}
