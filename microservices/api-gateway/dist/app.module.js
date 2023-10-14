"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const categories_controller_1 = require("./categories/categories.controller");
const categories_module_1 = require("./categories/categories.module");
const proxyrmq_module_1 = require("./proxy/proxyrmq.module");
const players_controller_1 = require("./players/players.controller");
const local_storage_module_1 = require("./local-storage/local-storage.module");
const players_module_1 = require("./players/players.module");
const challenges_module_1 = require("./challenges/challenges.module");
const rankings_module_1 = require("./rankings/rankings.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            categories_module_1.CategoriesModule,
            players_module_1.PlayersModule,
            proxyrmq_module_1.ProxyRMQModule,
            local_storage_module_1.LocalStorageModule,
            challenges_module_1.ChallengesModule,
            rankings_module_1.RankingsModule,
        ],
        controllers: [categories_controller_1.CategoriesController, players_controller_1.PlayersController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map