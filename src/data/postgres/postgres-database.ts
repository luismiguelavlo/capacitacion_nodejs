import { Sequelize } from "sequelize-typescript";
import { SYNCHRONIZE_FORCE } from "../../config/constants";
import { User } from "./models/user.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  public sequelize: Sequelize;

  constructor(options: Options) {
    this.sequelize = new Sequelize({
      dialect: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      logging: false,
      models: [User],
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }

  //si se deja esto en true, buscar de Dios.....
  async sync(force: boolean = SYNCHRONIZE_FORCE) {
    try {
      await this.sequelize.sync({ force });
      console.log("Database & tables created!");
    } catch (error) {
      console.error("Error creating database & tables:", error);
      throw error;
    }
  }
}
