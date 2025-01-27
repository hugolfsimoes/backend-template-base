import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
export class User {
    constructor(id = uuidv4(), name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}
