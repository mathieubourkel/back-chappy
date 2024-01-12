"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const HTTPMessages_1 = require("../utils/HTTPMessages");
const errorHandler = async (err, res) => {
    const status = err.status || 500;
    const message = err.message || HTTPMessages_1.HTTPMessages[500];
    res.status(status).json({ error: message, code: err.codePerso, status });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map