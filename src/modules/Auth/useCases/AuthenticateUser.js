import { TokenService } from "../services/TokenService.js";
import bcrypt from "bcryptjs";
export class AuthenticateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, password) {
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
