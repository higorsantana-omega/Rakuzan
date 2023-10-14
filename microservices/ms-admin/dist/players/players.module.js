"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const player_schema_1 = require("./interfaces/player.schema");
const players_service_1 = require("./players.service");
const players_controller_1 = require("./players.controller");
let PlayersModule = class PlayersModule {
};
PlayersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Players', schema: player_schema_1.PlayerSchema }]),
        ],
        providers: [players_service_1.PlayersService],
        controllers: [players_controller_1.PlayersController],
    })
], PlayersModule);
exports.PlayersModule = PlayersModule;
//# sourceMappingURL=players.module.js.map