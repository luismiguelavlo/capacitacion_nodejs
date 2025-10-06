import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DB_NAME: get("DB_NAME").required().asString(),
  DB_USERNAME: get("DB_USERNAME").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().asString(),
  DB_HOST: get("DB_HOST").required().asString(),
  DB_PORT: get("DB_PORT").required().asPortNumber(),

  MSSQL_DB_PORT: get("MSSQL_DB_PORT").required().asPortNumber(),
  MSSQL_DB_NAME: get("MSSQL_DB_NAME").required().asString(),
  MSSQL_DB_PASSWORD: get("MSSQL_DB_PASSWORD").required().asString(),
  MSSQL_DB_USERNAME: get("MSSQL_DB_USERNAME").required().asString(),
  MSSQL_DB_HOST: get("MSSQL_DB_HOST").required().asString(),
};
