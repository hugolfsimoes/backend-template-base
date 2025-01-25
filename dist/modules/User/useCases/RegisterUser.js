import { User } from "../entities/User.js";
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
        const user = new User(Date.now().toString(), name, email, hashedPassword);
        await this.userRepository.create(user);
        return user;
    }
}
