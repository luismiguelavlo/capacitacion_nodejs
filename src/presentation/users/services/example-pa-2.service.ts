import { mssqlDatabase } from "../../../app";
import sql from "mssql";

export class ExamplePa2Service {
  async execute(payStatus: number = 888) {
    try {
      const pool = mssqlDatabase.getPool();

      if (!pool) {
        throw new Error("SQL Server connection not available");
      }

      // Ejecutar el procedimiento almacenado PA_SCI_SQL_PAGOS_ELECTRONICOS
      const request = pool.request();
      request.input("ESTA_PAG", sql.Int, payStatus);
      request.output("TOTAL_PAG", sql.Int);

      const result = await request.execute("PA_SCI_SQL_PAGOS_ELECTRONICOS");

      return {
        success: true,
        data: result.recordset,
        totalPayments: result.output.TOTAL_PAG,
        message:
          "Procedimiento almacenado PA_SCI_SQL_PAGOS_ELECTRONICOS ejecutado correctamente",
        parameter: { ESTA_PAG: payStatus },
      };
    } catch (error) {
      console.error("Error ejecutando PA_SCI_SQL_PAGOS_ELECTRONICOS:", error);
      throw error;
    }
  }
}
