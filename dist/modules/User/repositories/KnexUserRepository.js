import { User } from "../entities/User.js";
export class KnexUserRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async findById(id) {
        const user = await this.knex("users").where({ id }).first();
        return user ? new User(user.id, user.name, user.email, user.password) : null;
    }
    async findByEmail(email) {
        const user = await this.knex("users").where({ email }).first();
        return user ? new User(user.id, user.name, user.email, user.password) : null;
    }
    async create(user) {
        await this.knex("users").insert({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    }
}
