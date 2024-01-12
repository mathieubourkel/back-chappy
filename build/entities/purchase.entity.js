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
exports.Purchase = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const purchase_status_enum_1 = require("../enums/purchase.status.enum");
let Purchase = class Purchase {
    id;
    name;
    ref;
    status;
    price;
    commandDate;
    deliveryDate;
    project;
};
exports.Purchase = Purchase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Purchase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Purchase.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Purchase.prototype, "ref", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: purchase_status_enum_1.PurchaseStatus }),
    __metadata("design:type", String)
], Purchase.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Purchase.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Purchase.prototype, "commandDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Purchase.prototype, "deliveryDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, project => project.purchases),
    __metadata("design:type", project_entity_1.Project)
], Purchase.prototype, "project", void 0);
exports.Purchase = Purchase = __decorate([
    (0, typeorm_1.Entity)()
], Purchase);
//# sourceMappingURL=purchase.entity.js.map