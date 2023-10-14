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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CategoriesController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const microservices_1 = require("@nestjs/microservices");
const ackErrors = ['E1100'];
let CategoriesController = CategoriesController_1 = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
        this.logger = new common_1.Logger(CategoriesController_1.name);
    }
    async createCategory(category, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        this.logger.log(`category: ${JSON.stringify(category)}`);
        try {
            await this.categoriesService.createCategory(category);
            await channel.ack(originalMessage);
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            const errors = ackErrors.filter((ack) => error.message.includes(ack));
            if (errors) {
                await channel.ack(originalMessage);
            }
        }
    }
    async updateCategory(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        this.logger.log(`data: ${JSON.stringify(data)}`);
        try {
            const category = data.category;
            await this.categoriesService.updateCategory(data.id, category);
            await channel.ack(originalMessage);
        }
        catch (error) {
            const errors = ackErrors.filter((ack) => error.message.includes(ack));
            if (errors) {
                await channel.ack(originalMessage);
            }
        }
    }
    async getCategories(_id, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            if (!_id) {
                return this.categoriesService.getAllCategories();
            }
            return this.categoriesService.getCategoryById(_id);
        }
        finally {
            await channel.ack(originalMessage);
        }
    }
};
__decorate([
    (0, microservices_1.EventPattern)('create-category'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, microservices_1.EventPattern)('update-category'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)('get-categories'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategories", null);
CategoriesController = CategoriesController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map