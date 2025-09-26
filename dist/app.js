"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mssqlDatabase = void 0;
const routes_1 = require("./presentation/routes");
const server_1 = require("./presentation/server");
const envs_1 = require("./config/envs");
const data_1 = require("./data");
const constants_1 = require("./config/constants");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // PostgreSQL Database
        const postgresDatabase = new data_1.PostgresDatabase({
            host: envs_1.envs.DB_HOST,
            port: envs_1.envs.DB_PORT,
            username: envs_1.envs.DB_USERNAME,
            password: envs_1.envs.DB_PASSWORD,
            database: envs_1.envs.DB_NAME,
        });
        yield postgresDatabase.connect();
        yield postgresDatabase.sync(constants_1.SYNCHRONIZE_FORCE);
        // SQL Server Database
        exports.mssqlDatabase = new data_1.MssqlDatabase({
            host: envs_1.envs.MSSQL_DB_HOST,
            port: envs_1.envs.MSSQL_DB_PORT,
            username: envs_1.envs.MSSQL_DB_USERNAME,
            password: envs_1.envs.MSSQL_DB_PASSWORD,
            database: envs_1.envs.MSSQL_DB_NAME,
        });
        yield exports.mssqlDatabase.connect();
        const server = new server_1.Server({
            port: envs_1.envs.PORT,
            routes: routes_1.AppRoutes.routes,
        });
        server.start();
    });
}
main();
