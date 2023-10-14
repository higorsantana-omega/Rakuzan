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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const create_category_dto_1 = require("./dtos/create-category.dto");
const rxjs_1 = require("rxjs");
const update_category_dto_1 = require("./dtos/update-category.dto");
const client_proxy_1 = require("src/proxy/client-proxy");
let CategoriesController = CategoriesController_1 = class CategoriesController {
    constructor(clientProxyBasket) {
        this.clientProxyBasket = clientProxyBasket;
        this.logger = new common_1.Logger(CategoriesController_1.name);
        this.clientMSAdmin = this.clientProxyBasket.getClientProxyAdmin();
    }
    createCategory(createCategoryDTO) {
        this.clientMSAdmin.emit('create-category', createCategoryDTO);
    }
    getCategories(_id) {
        return this.clientMSAdmin.send('get-categories', _id ? _id : '');
    }
    updateCategory(updateCategoryDTO, id) {
        this.clientMSAdmin.emit('update-category', {
            id,
            category: updateCategoryDTO,
        });
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDTO]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('idCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.UpdateCategoryDTO, String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "updateCategory", null);
CategoriesController = CategoriesController_1 = __decorate([
    (0, common_1.Controller)('/api/categories'),
    __metadata("design:paramtypes", [client_proxy_1.ClientProxyBasket])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map