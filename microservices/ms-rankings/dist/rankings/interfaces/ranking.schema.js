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
exports.RankingSchema = exports.Ranking = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let Ranking = class Ranking extends mongoose_1.Document {
};
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.ObjectId }),
    __metadata("design:type", String)
], Ranking.prototype, "challenge", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.ObjectId }),
    __metadata("design:type", String)
], Ranking.prototype, "player", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.ObjectId }),
    __metadata("design:type", String)
], Ranking.prototype, "match", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.ObjectId }),
    __metadata("design:type", String)
], Ranking.prototype, "category", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.String }),
    __metadata("design:type", String)
], Ranking.prototype, "event", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.String }),
    __metadata("design:type", String)
], Ranking.prototype, "operation", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.default.Schema.Types.Number }),
    __metadata("design:type", Number)
], Ranking.prototype, "points", void 0);
Ranking = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true, collection: 'rankings' })
], Ranking);
exports.Ranking = Ranking;
exports.RankingSchema = mongoose_2.SchemaFactory.createForClass(Ranking);
//# sourceMappingURL=ranking.schema.js.map