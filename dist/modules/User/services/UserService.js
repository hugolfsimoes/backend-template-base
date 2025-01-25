import { RegisterUser } from "../useCases/RegisterUser.js";
import { KnexUserRepository } from "../repositories/KnexUserRepository.js";
import knex from "../../../infrastructure/database/knexInstance.js";
export class UserService {
    constructor() {
        this.userRepository = new KnexUserRepository(knex);
    }
    async registerUser(name, email, password) {
        const registerUser = new RegisterUser(this.userRepository);
        return await registerUser.execute(name, email, password);
    }
}
