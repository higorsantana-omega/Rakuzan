"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CategoriesSchema = new mongoose_1.Schema({
    category: { type: String, unique: true },
    description: { type: String },
    events: [
        {
            name: { type: String },
            operation: { type: String },
            value: { type: Number },
        },
    ],
    players: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Player',
        },
    ],
}, { timestamps: true, collection: 'categories' });
//# sourceMappingURL=category.schema.js.map