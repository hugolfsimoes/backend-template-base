import knex from "knex";
import config from "../../knexfile.js";


const knexInstance = knex(config.development);

export default knexInstance;