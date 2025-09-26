"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(),
    DB_NAME: (0, env_var_1.get)("DB_NAME").required().asString(),
    DB_USERNAME: (0, env_var_1.get)("DB_USERNAME").required().asString(),
    DB_PASSWORD: (0, env_var_1.get)("DB_PASSWORD").required().asString(),
    DB_HOST: (0, env_var_1.get)("DB_HOST").required().asString(),
    DB_PORT: (0, env_var_1.get)("DB_PORT").required().asPortNumber(),
    MSSQL_DB_PORT: (0, env_var_1.get)("MSSQL_DB_PORT").required().asPortNumber(),
    MSSQL_DB_NAME: (0, env_var_1.get)("MSSQL_DB_NAME").required().asString(),
    MSSQL_DB_PASSWORD: (0, env_var_1.get)("MSSQL_DB_PASSWORD").required().asString(),
    MSSQL_DB_USERNAME: (0, env_var_1.get)("MSSQL_DB_USERNAME").required().asString(),
    MSSQL_DB_HOST: (0, env_var_1.get)("MSSQL_DB_HOST").required().asString(),
};
