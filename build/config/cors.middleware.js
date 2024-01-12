"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: process.env.FRONT_URL,
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH,HEAD',
    credentials: true,
    allowedHeaders: 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
};
//# sourceMappingURL=cors.middleware.js.map