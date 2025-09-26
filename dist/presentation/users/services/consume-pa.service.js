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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumePaService = void 0;
const app_1 = require("../../../app");
const mssql_1 = __importDefault(require("mssql"));
class ConsumePaService {
    execute(payStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = app_1.mssqlDatabase.getPool();
                if (!pool) {
                    throw new Error("SQL Server connection not available");
                }
                // Ejecutar el procedimiento almacenado PA_SCI_SQL_PAGOE_ESTADO con parámetro
                const request = pool.request();
                request.input("ESTA_PAG", mssql_1.default.Int, payStatus);
                const result = yield request.execute("PA_SCI_SQL_PAGOE_ESTADO");
                return {
                    success: true,
                    data: result.recordset,
                    message: "Procedimiento almacenado ejecutado correctamente",
                    parameter: { ESTA_PAG: payStatus },
                };
            }
            catch (error) {
                console.error("Error ejecutando PA_SCI_SQL_PAGOE_ESTADO:", error);
                throw error;
            }
        });
    }
}
exports.ConsumePaService = ConsumePaService;
