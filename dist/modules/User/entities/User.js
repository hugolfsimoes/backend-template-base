export class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static hashPassword(password) {
        const bcrypt = require("bcryptjs");
        return bcrypt.hashSync(password, 10);
    }
    validatePassword(password) {
        const bcrypt = require("bcryptjs");
        return bcrypt.compareSync(password, this.password);
    }
}
