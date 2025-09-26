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
exports.PostgresDatabase = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("../../config/constants");
const user_model_1 = require("./models/user.model");
class PostgresDatabase {
    constructor(options) {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "postgres",
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            logging: false,
            models: [user_model_1.User],
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                console.log("Connection has been established successfully.");
            }
            catch (error) {
                console.error("Error connecting to the database:", error);
                throw error;
            }
        });
    }
    //si se deja esto en true, buscar de Dios.....
    sync() {
        return __awaiter(this, arguments, void 0, function* (force = constants_1.SYNCHRONIZE_FORCE) {
            try {
                yield this.sequelize.sync({ force });
                console.log("Database & tables created!");
            }
            catch (error) {
                console.error("Error creating database & tables:", error);
                throw error;
            }
        });
    }
}
exports.PostgresDatabase = PostgresDatabase;
