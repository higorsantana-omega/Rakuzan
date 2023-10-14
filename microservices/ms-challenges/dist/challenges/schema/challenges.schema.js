"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ChallengeSchema = new mongoose_1.default.Schema({
    dateTime: { type: Date },
    dateRequest: { type: Date },
    dateResponse: { type: Date },
    status: { type: String },
    request: { type: mongoose_1.default.Schema.Types.ObjectId },
    category: { type: mongoose_1.default.Schema.Types.ObjectId },
    players: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
        },
    ],
    match: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Match',
    },
}, { timestamps: true, collection: 'challenges' });
//# sourceMappingURL=challenges.schema.js.map