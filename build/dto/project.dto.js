"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserToProjectDto = exports.ModifyProjectDto = exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
class CreateProjectDto {
    name;
    description;
    code;
    status;
    budget;
    estimEndDate;
    owner;
    users;
    constructor(body) {
        const { name, description, code, status, budget, estimEndDate, owner, users } = body;
        this.name = name,
            this.description = description,
            this.code = code,
            this.status = status,
            this.budget = budget,
            this.estimEndDate = estimEndDate,
            this.owner = owner,
            this.users = users;
    }
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 250),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(16, 16),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateProjectDto.prototype, "estimEndDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "users", void 0);
class ModifyProjectDto {
    name;
    description;
    status;
    budget;
    estimEndDate;
    constructor(body) {
        const { name, description, status, budget, estimEndDate } = body;
        this.name = name,
            this.description = description,
            this.status = status,
            this.budget = +budget,
            this.estimEndDate = estimEndDate;
    }
}
exports.ModifyProjectDto = ModifyProjectDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], ModifyProjectDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 250),
    __metadata("design:type", String)
], ModifyProjectDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], ModifyProjectDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ModifyProjectDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ModifyProjectDto.prototype, "estimEndDate", void 0);
class AddUserToProjectDto {
}
exports.AddUserToProjectDto = AddUserToProjectDto;
//# sourceMappingURL=project.dto.js.map