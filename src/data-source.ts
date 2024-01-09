import { DataSource } from "typeorm";
require("dotenv").config();

let data = {};

if (process.env.NODE_ENV === "production") {
  data = {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  };
} else if (process.env.NODE_ENV === "development") {
  data = {
    host: process.env.DB_HOST_DEV,
    port: +process.env.DB_PORT_DEV,
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PWD_DEV,
    database: process.env.DB_NAME_DEV,
  };
}

export const AppDataSource = new DataSource({
  type: "mysql",
  ...data,
  synchronize: process.env.NODE_ENV === "development",
  logging: false,
  entities: ["./src/entities/*{.ts, .js}"],
  migrations: [],
  subscribers: [],
});
