"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const HTTPMessages_1 = require("./HTTPMessages");
class CustomError {
    message;
    date;
    status;
    codePerso;
    constructor(codePerso, status, message) {
        this.date = new Date();
        this.message = message || HTTPMessages_1.HTTPMessages[status];
        this.codePerso = codePerso;
        this.status = status;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map