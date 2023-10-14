"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PlayerSchema = new mongoose_1.Schema({
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Categories' },
    name: String,
    ranking: String,
    photo: String,
    position: Number,
}, { timestamps: true, collection: 'players' });
//# sourceMappingURL=player.schema.js.map