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
var PlayersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const create_player_dto_1 = require("./dtos/create-player.dto");
const update_player_dto_1 = require("./dtos/update-player.dto");
const validation_params_pipe_1 = require("../common/pipes/validation-params.pipe");
const client_proxy_1 = require("src/proxy/client-proxy");
const rxjs_1 = require("rxjs");
const platform_express_1 = require("@nestjs/platform-express");
const local_storage_service_1 = require("src/local-storage/local-storage.service");
let PlayersController = PlayersController_1 = class PlayersController {
    constructor(clientProxyBasket, localStorageService) {
        this.clientProxyBasket = clientProxyBasket;
        this.localStorageService = localStorageService;
        this.logger = new common_1.Logger(PlayersController_1.name);
        this.clientMSAdmin = this.clientProxyBasket.getClientProxyAdmin();
    }
    async createPlayer(createPlayerDTO) {
        this.logger.log(`createPlayerDTO: ${JSON.stringify(createPlayerDTO)}`);
        const category = await this.clientMSAdmin
            .send('get-categories', createPlayerDTO.category)
            .toPromise();
        if (category) {
            this.clientMSAdmin.emit('create-player', createPlayerDTO);
        }
        else {
            throw new common_1.BadRequestException(`Category not exists!`);
        }
    }
    getPlayers(_id) {
        return this.clientMSAdmin.send('get-players', _id ? _id : '');
    }
    async updatePlayer(updatePlayerDTO, id) {
        const category = await this.clientMSAdmin
            .send('get-categories', updatePlayerDTO.category)
            .toPromise();
        if (category) {
            this.clientMSAdmin.emit('update-player', { id, player: updatePlayerDTO });
        }
        else {
            throw new common_1.BadRequestException(`Category not exists!`);
        }
    }
    async deletePlayer(id) {
        this.clientMSAdmin.emit('delete-player', { id });
    }
    async uploadFiles(file, _id) {
        if (!file) {
            throw new common_1.BadRequestException('File is empty');
        }
        const player = await this.clientMSAdmin
            .send('get-players', _id)
            .toPromise();
        if (!player) {
            throw new common_1.BadRequestException('Player not found');
        }
        const fileURL = await this.localStorageService.uploadFile(file);
        this.clientMSAdmin.emit('update-player', {
            id: _id,
            player: { photo: fileURL },
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.default]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "createPlayer", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('idPlayer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], PlayersController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', validation_params_pipe_1.ValidationParamsPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_player_dto_1.default, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updatePlayer", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', validation_params_pipe_1.ValidationParamsPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deletePlayer", null);
__decorate([
    (0, common_1.Post)('/:_id/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "uploadFiles", null);
PlayersController = PlayersController_1 = __decorate([
    (0, common_1.Controller)('/api/players'),
    __metadata("design:paramtypes", [client_proxy_1.ClientProxyBasket,
        local_storage_service_1.LocalStorageService])
], PlayersController);
exports.PlayersController = PlayersController;
//# sourceMappingURL=players.controller.js.map