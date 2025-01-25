import knex from "knex";
import config from "../../knexfile.ts";


const knexInstance = knex(config.development);

export default knexInstance;