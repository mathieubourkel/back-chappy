"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Service_1 = require("../services/Service");
const controller_1 = require("./controller");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = require("../utils/CustomError");
class AuthController extends controller_1.GlobalController {
    userService = new Service_1.Service(user_entity_1.User);
    async __decryptPassword(input, bdd) {
        const result = await bcrypt_1.default.compare(input, bdd);
        return result;
    }
    async __createTokens(userId, email, res) {
        let date = new Date();
        const tokenDate = date.getHours() + 3;
        const refreshDate = date.getMonth() + 1;
        const token = jsonwebtoken_1.default.sign({ userId, email, exirationDate: tokenDate }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
        const refreshToken = jsonwebtoken_1.default.sign({ userId, email, exirationDate: refreshDate }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1w" });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: process.env.NODE_ENV === 'production',
            maxAge: 700000000,
            secure: process.env.NODE_ENV === 'production',
        });
        const { id, firstname, lastname, status } = await this.userService.update(userId, { refreshToken });
        const user = { id, firstname, lastname, status, email };
        return { token, user };
    }
    async login(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            const user = await this.userService.getOneBySearchOptions({ email: req.body.email });
            if (!user)
                throw new CustomError_1.CustomError("AUTH-C", 401, "Bad Credentials");
            const isPasswordMatched = await this.__decryptPassword(req.body.password, user.password);
            if (!isPasswordMatched)
                throw new CustomError_1.CustomError("AUTH-C", 401, "Bad Credentials");
            return this.__createTokens(user.id, req.body.email, res);
        });
    }
    async refreshToken(req, res, next) {
        await this.handleGlobal(req, res, next, async () => {
            const user = await this.userService.getOneById(req.user.userId);
            if (!user)
                throw new CustomError_1.CustomError("AUTH-C", 401, "No User");
            if (user.refreshToken != req.cookies.refreshToken)
                throw new CustomError_1.CustomError("AUTH-C", 401, "Refresh Token not good");
            return this.__createTokens(user.id, user.email, res);
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map