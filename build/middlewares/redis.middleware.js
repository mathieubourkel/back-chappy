"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDataFromRedis = void 0;
const index_1 = require("../index");
const fetchDataFromRedis = async (req, res, next) => {
    const result = await index_1.client.get(req.url);
    if (result && result !== null) {
        res.status(200).json({ data: JSON.parse(result), message: "data from cache" });
    }
    else {
        next();
    }
};
exports.fetchDataFromRedis = fetchDataFromRedis;
//# sourceMappingURL=redis.middleware.js.map