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
exports.ModifyStepDto = exports.CreateStepDto = void 0;
const class_validator_1 = require("class-validator");
class CreateStepDto {
    name;
    description;
    status;
    budget;
    estimEndDate;
    project;
    constructor(body) {
        const { name, description, status, budget, estimEndDate, project } = body;
        this.name = name,
            this.description = description,
            this.status = status,
            this.budget = budget,
            this.estimEndDate = estimEndDate,
            this.project = project;
    }
}
exports.CreateStepDto = CreateStepDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], CreateStepDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 250),
    __metadata("design:type", String)
], CreateStepDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], CreateStepDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateStepDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateStepDto.prototype, "estimEndDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateStepDto.prototype, "project", void 0);
class ModifyStepDto {
}
exports.ModifyStepDto = ModifyStepDto;
//# sourceMappingURL=step.dto.js.map