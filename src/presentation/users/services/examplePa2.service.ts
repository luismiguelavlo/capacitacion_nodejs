import { mssqlDatabase } from "../../../app";
import sql from "mssql";
import { PAY_STATUS_PA } from "../../../config/constants";

export class ExamplePa2Service {
  async execute(payStatus: number, searcherParameter?: string) {
    try {
      let foundedRecord: string = "";
      const pool = mssqlDatabase.getPool();
      if (!pool) {
        throw new Error("Connection pool not established");
      }

      const request = pool.request();
      request.input(PAY_STATUS_PA, sql.Int, payStatus);
      request.output("TOTAL_PAG", sql.Int);

      const result = await request.execute("PA_SCI_SQL_PAGOS_ELECTRONICOS");

      if (searcherParameter) {
        const findRecord = result.recordset.find((record) => {
          return record.REFERENCIA_PAGO === searcherParameter;
        });

        if (findRecord) {
          foundedRecord =
            "Se encontro el registro con la referencia de pago: " +
            searcherParameter;
        } else {
          foundedRecord =
            "No se encontro el registro con la referencia de pago: " +
            searcherParameter;
        }
      }

      return {
        success: true,
        data: result.recordset,
        totalPayments: result.output.TOTAL_PAG,
        totalRecords: result.recordset.length,
        foundedRecord: foundedRecord,
        message: "Consulta realizada correctamente",
        parameter: {
          PAY_STATUS_PA: payStatus,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
