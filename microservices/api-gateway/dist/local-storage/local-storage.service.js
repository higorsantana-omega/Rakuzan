"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LocalStorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const mkdirp_1 = require("mkdirp");
const path_1 = require("path");
let LocalStorageService = LocalStorageService_1 = class LocalStorageService {
    constructor() {
        this.logger = new common_1.Logger(LocalStorageService_1.name);
    }
    async uploadFile(file) {
        const fileName = this.generateFileName(file);
        const pathComplete = (0, path_1.join)(__dirname, '..', '..', 'uploads', fileName);
        await (0, mkdirp_1.mkdirp)((0, path_1.join)(__dirname, '..', '..', 'uploads'));
        try {
            await new Promise((resolve, reject) => (0, fs_1.createWriteStream)(pathComplete)
                .on('finish', () => resolve())
                .on('error', (error) => reject(error))
                .end(file.buffer));
            this.logger.log(`file ${fileName} saved with success`);
            return pathComplete;
        }
        catch (error) {
            this.logger.error(`error on save file:`, error.message);
            throw new common_1.BadRequestException('Error on save file');
        }
    }
    generateFileName(file) {
        const dataAtual = new Date();
        const extension = file.originalname.split('.')[1];
        const year = `${dataAtual.getFullYear()}${dataAtual.getMonth() + 1}`;
        const minutes = `${dataAtual.getDate()}${dataAtual.getHours()}${dataAtual.getMinutes()}${dataAtual.getSeconds()}`;
        const secondsAndExtension = `${dataAtual.getMilliseconds()}.${extension}`;
        const fileName = year + minutes + secondsAndExtension;
        return fileName;
    }
};
LocalStorageService = LocalStorageService_1 = __decorate([
    (0, common_1.Injectable)()
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=local-storage.service.js.map