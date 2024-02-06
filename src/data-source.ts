import { DataSource, EntityTarget } from "typeorm";
require("dotenv").config();

// CONNEXION DB TYPEORM
export class dataBaseSource{
  static getRepository(entity: EntityTarget<any>): import("typeorm").Repository<any> {
    throw new Error("Method not implemented.");
  }
  static initialize() {
    throw new Error("Method not implemented.");
  }
  static AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.MYSQL_TCP_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/entities/*{.js,.ts}`],
    migrations: [],
    subscribers: [],
  })
};
