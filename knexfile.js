"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
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
exports.default = config;
