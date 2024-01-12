"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
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
}
else if (process.env.NODE_ENV === "development") {
    data = {
        host: process.env.DB_HOST_DEV,
        port: +process.env.DB_PORT_DEV,
        username: process.env.DB_USER_DEV,
        password: process.env.DB_PWD_DEV,
        database: process.env.DB_NAME_DEV,
    };
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    ...data,
    synchronize: process.env.NODE_ENV === "development",
    logging: false,
    entities: [`${__dirname}/entities/*{.js,.ts}`],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map