import { v4 as uuidv4 } from "uuid";
import { User } from "../entities/User.ts";
export class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(name, email, password) {
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
