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
        synchronize: true,
        logging: false,
        entities: ["./src/entities/*{.ts, .js}"],
        migrations: [],
        subscribers: [],
    })
}