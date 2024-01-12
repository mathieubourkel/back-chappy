"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("redis");
const data_source_1 = require("./data-source");
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./routes");
const tokens_middleware_1 = require("./middlewares/tokens.middleware");
const cors_middleware_1 = require("./config/cors.middleware");
const redis_config_1 = require("./config/redis.config");
const redis_middleware_1 = require("./middlewares/redis.middleware");
const app = (0, express_1.default)();
// REDIS
exports.client = (0, redis_1.createClient)(redis_config_1.redisConfig);
exports.client.on("connect", function () {
    console.log("Connected");
});
exports.client.on("error", (err) => {
    console.log(err);
});
(async () => {
    await exports.client.connect();
})();
app.use(bodyParser.json());
app.use((0, cors_1.default)(cors_middleware_1.corsOptions));
app.use((0, cookie_parser_1.default)());
app.use("/api", tokens_middleware_1.verifyToken);
app.use("/auth/refreshToken", tokens_middleware_1.verifyRefresh);
// Tu ajoutes un projet ca ne met pas a jour le cache
app.get('/api/*', redis_middleware_1.fetchDataFromRedis);
data_source_1.AppDataSource.initialize()
    .then(async () => {
    routes_1.Routes.forEach((_route) => {
        const { method, route, action, controller } = _route;
        app[method](route, (req, res, next) => {
            const result = new controller()[action](req, res, next);
            if (result instanceof Promise) {
                result.then((result) => result !== null && result !== undefined
                    ? res.send(result)
                    : undefined);
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    // middleware gestion des erreurs
    app.use((err, req, res, next) => {
        (0, ErrorHandler_1.errorHandler)(err, res);
    });
})
    .catch((error) => console.log(error));
switch (process.env.NODE_ENV) {
    case "production":
        app.listen(process.env.APP_PORT);
        console.log(`[PROD] Server Up on this URL : ${process.env.BACK_HOST}:${process.env.APP_PORT}`);
        break;
    case "development":
        app.listen(process.env.APP_PORT_DEV);
        console.log(`[DEV] Server Up on this URL : ${process.env.BACK_HOST_DEV}:${process.env.APP_PORT_DEV}`);
        break;
    default:
        console.log("Configure ton .env amig[o,a]");
}
//# sourceMappingURL=index.js.map