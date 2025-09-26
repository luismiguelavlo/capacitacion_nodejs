import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { PostgresDatabase, MssqlDatabase } from "./data";
import { SYNCHRONIZE_FORCE } from "./config/constants";

// Instancia global de SQL Server
export let mssqlDatabase: MssqlDatabase;

async function main() {
  // PostgreSQL Database
  const postgresDatabase = new PostgresDatabase({
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
  });

  await postgresDatabase.connect();
  await postgresDatabase.sync(SYNCHRONIZE_FORCE);

  // SQL Server Database
  mssqlDatabase = new MssqlDatabase({
    host: envs.MSSQL_DB_HOST,
    port: envs.MSSQL_DB_PORT,
    username: envs.MSSQL_DB_USERNAME,
    password: envs.MSSQL_DB_PASSWORD,
    database: envs.MSSQL_DB_NAME,
  });

  await mssqlDatabase.connect();

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}

main();
