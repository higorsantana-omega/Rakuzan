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
var CategoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
let CategoriesService = CategoriesService_1 = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
        this.logger = new common_1.Logger(CategoriesService_1.name);
    }
    async createCategory(createCategoryDTO) {
        try {
            const category = await this.categoryModel
                .findOne({ category: createCategoryDTO.category })
                .exec();
            if (category) {
                throw new common_1.BadRequestException(`Category ${createCategoryDTO.category} already exists.`);
            }
            const categoryCreated = new this.categoryModel(createCategoryDTO);
            return categoryCreated.save();
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async updateCategory(id, updateCategory) {
        try {
            const category = await this.categoryModel.findOne({ _id: id }).exec();
            if (!category) {
                throw new common_1.BadRequestException(`category with id ${id} not exists.`);
            }
            await this.categoryModel
                .findOneAndUpdate({ _id: id }, { $set: updateCategory })
                .exec();
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async getAllCategories() {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }
    async getCategoryById(id) {
        const category = await this.categoryModel.findOne({ _id: id }).exec();
        if (!category)
            throw new common_1.NotFoundException(`category with id ${id} not found.`);
        return category;
    }
};
CategoriesService = CategoriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Categories')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map