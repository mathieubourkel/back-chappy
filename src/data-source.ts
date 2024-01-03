import {DataSource} from "typeorm";

export class dataBaseSource {
    static AppDataSource = new DataSource({
        type:"mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "password",
        database: "db_chappy",
        synchronize: true,
        logging: false,
        entities: ["./src/entities/*{.ts, .js}"],
        migrations: [],
        subscribers: [],
    })
}