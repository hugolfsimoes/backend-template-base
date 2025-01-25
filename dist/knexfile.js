import dotenv from "dotenv";
dotenv.config();
const config = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST || "127.0.0.1",
            user: process.env.DB_USER || "postgres",
            password: process.env.DB_PASSWORD || "password",
            database: process.env.DB_NAME || "mydb",
        },
        migrations: {
            directory: "./src/infrastructure/database/migrations",
        },
        seeds: {
            directory: "./src/infrastructure/database/seeds",
        },
    },
};
export default config;
