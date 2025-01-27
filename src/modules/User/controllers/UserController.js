import { UserService } from "../services/UserService.ts";
export class UserController {
    static async register(req, res) {
        const { name, email, password } = req.body;
        const userService = new UserService();
        try {
            const user = await userService.registerUser(name, email, password);
            res.status(201).json({ message: "User registered successfully", user });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            }
            else {
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    }
}
