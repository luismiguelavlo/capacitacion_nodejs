import { mssqlDatabase } from "../../../app";
import { PAY_STATUS_PA } from "../../../config/constants";
import sql from "mssql";
import { CustomError } from "../../../domain/errors/custom.error";

export class ExamplePa1Service {
  async execute(payStatus: number) {
    try {
      const pool = mssqlDatabase.getPool();
      if (!pool) {
        throw CustomError.badRequest("Connection pool not established");
      }

      const request = pool.request();
      request.input(PAY_STATUS_PA, sql.Int, payStatus);
      const result = await request.execute("PA_SCI_SQL_PAGOE_ESTADO");

      return {
        success: true,
        data: result.recordset,
        message: "Consulta realizada correctamente",
        parameter: {
          PAY_STATUS_PA: payStatus,
        },
      };
    } catch (error) {
      throw CustomError.internalServer("Error al ejecutar el servicio");
    }
  }
}
