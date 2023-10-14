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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsController = void 0;
const common_1 = require("@nestjs/common");
const client_proxy_1 = require("../proxy/client-proxy");
let RankingsController = class RankingsController {
    constructor(clientProxyBasket) {
        this.clientProxyBasket = clientProxyBasket;
        this.clientMSRankings = this.clientProxyBasket.getClientProxyRankings();
    }
    getRankigns(categoryId, dateRef) {
        if (!categoryId) {
            throw new common_1.BadRequestException('categoryId is required.');
        }
        return this.clientMSRankings.send('get-rankings', { categoryId, dateRef });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('dateRef')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "getRankigns", null);
RankingsController = __decorate([
    (0, common_1.Controller)('/api/rankings'),
    __metadata("design:paramtypes", [client_proxy_1.ClientProxyBasket])
], RankingsController);
exports.RankingsController = RankingsController;
//# sourceMappingURL=rankings.controller.js.map