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
exports.MssqlDatabase = void 0;
const mssql_1 = require("mssql");
class MssqlDatabase {
    constructor(options) {
        this.pool = null;
        this.config = {
            server: options.host,
            port: options.port,
            user: options.username,
            password: options.password,
            database: options.database,
            options: {
                encrypt: true, // Use this if you're on Windows Azure
                trustServerCertificate: true, // Use this if you're on Windows Azure
            },
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000,
            },
        };
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.pool = new mssql_1.ConnectionPool(this.config);
                yield this.pool.connect();
                console.log("SQL Server connection has been established successfully.");
            }
            catch (error) {
                console.error("Error connecting to SQL Server:", error);
                throw error;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.pool) {
                    yield this.pool.close();
                    this.pool = null;
                    console.log("SQL Server connection has been closed.");
                }
            }
            catch (error) {
                console.error("Error closing SQL Server connection:", error);
                throw error;
            }
        });
    }
    getPool() {
        return this.pool;
    }
    query(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.pool) {
                throw new Error("Database not connected");
            }
            return yield this.pool.request().query(queryString);
        });
    }
}
exports.MssqlDatabase = MssqlDatabase;
