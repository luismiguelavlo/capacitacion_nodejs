import sql, { ConnectionPool } from "mssql";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class MssqlDatabase {
  private config: sql.config;
  private pool: ConnectionPool | null = null;

  constructor(options: Options) {
    this.config = {
      server: options.host,
      port: options.port,
      user: options.username,
      password: options.password,
      database: options.database,

      options: {
        encrypt: true,
        trustServerCertificate: true,
      },

      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
    };
  }

  async connect() {
    try {
      this.pool = new ConnectionPool(this.config);
      await this.pool.connect();
      console.log("Connection mssql has been established successfully.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        console.log("Connection has been closed successfully.");
      }
    } catch (error) {
      console.error("Error closing the connection:", error);
      throw error;
    }
  }

  getPool(): ConnectionPool | null {
    return this.pool;
  }

  async query(queryString: string) {
    if (!this.pool) {
      throw new Error("Connection pool not established");
    }
    return this.pool.request().query(queryString);
  }
}
