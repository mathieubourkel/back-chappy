import {DataSource} from "typeorm";
require('dotenv').config()

export class dataBaseSource {

    static AppDataSource = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: false,
        entities: ["./src/entities/*{.ts, .js}"],
        migrations: [],
        subscribers: [],
    })

    static AppDataSourceDev = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST_DEV,
        port: +process.env.DB_PORT_DEV,
        username: process.env.DB_USER_DEV,
        password: process.env.DB_PWD_DEV,
        database: process.env.DB_NAME_DEV,
        synchronize: true,
        logging: true,
        entities: ["./src/entities/*{.ts, .js}"],
        migrations: [],
        subscribers: [],
    })
}