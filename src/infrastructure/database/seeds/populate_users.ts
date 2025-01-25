import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").insert([
        {
            id: uuidv4(),
            name: "John Doe",
            email: "john@example.com",
            password: "hashed_password",
        },
        {
            id: uuidv4(),
            name: "Jane Smith",
            email: "jane@example.com",
            password: "hashed_password",
        },
    ]);
}
