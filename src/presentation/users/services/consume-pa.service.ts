import { mssqlDatabase } from "../../../app";
import sql from "mssql";

export class ConsumePaService {
  async execute(payStatus: number) {
    try {
      const pool = mssqlDatabase.getPool();

      if (!pool) {
        throw new Error("SQL Server connection not available");
      }

      // Ejecutar el procedimiento almacenado PA_SCI_SQL_PAGOE_ESTADO con parámetro
      const request = pool.request();
      request.input("ESTA_PAG", sql.Int, payStatus);
      const result = await request.execute("PA_SCI_SQL_PAGOE_ESTADO");

      return {
        success: true,
        data: result.recordset,
        message: "Procedimiento almacenado ejecutado correctamente",
        parameter: { ESTA_PAG: payStatus },
      };
    } catch (error) {
      console.error("Error ejecutando PA_SCI_SQL_PAGOE_ESTADO:", error);
      throw error;
    }
  }
}
