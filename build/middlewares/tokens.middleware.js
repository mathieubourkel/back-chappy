"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefresh = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = require("../utils/CustomError");
async function verifyToken(request, response, next) {
    try {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        if (!token)
            throw new CustomError_1.CustomError("MDW-TK", 401, "No token find");
        if (type !== "Bearer")
            throw new CustomError_1.CustomError("MDW-TK", 401, "No bearer find");
        request["user"] = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (error) {
        response
            .status(401)
            .json({ code: "MDW-TK", message: "jwt expired", expiredAt: error.expiredAt });
    }
}
exports.verifyToken = verifyToken;
async function verifyRefresh(request, response, next) {
    try {
        const refreshToken = request.cookies.refreshToken;
        if (!refreshToken)
            throw new CustomError_1.CustomError("MDW-TK-REF", 401, "No refresh token find");
        request["user"] = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        next();
    }
    catch (error) {
        response
            .status(401)
            .json({ code: "MDW-TK-REF", message: "refresh token expired", expiredAt: error.expiredAt });
    }
}
exports.verifyRefresh = verifyRefresh;
//# sourceMappingURL=tokens.middleware.js.map