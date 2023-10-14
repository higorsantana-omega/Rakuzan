"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MatchSchema = new mongoose_1.default.Schema({
    challenge: { type: mongoose_1.default.Schema.Types.ObjectId },
    category: { type: mongoose_1.default.Schema.Types.ObjectId },
    players: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
        },
    ],
    def: { type: mongoose_1.default.Schema.Types.ObjectId },
    result: [{ set: { type: String } }],
}, { timestamps: true, collection: 'matches' });
//# sourceMappingURL=match.schema.js.map