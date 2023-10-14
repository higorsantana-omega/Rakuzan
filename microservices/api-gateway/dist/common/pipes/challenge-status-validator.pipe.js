"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeStatusValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
class ChallengeStatusValidatorPipe {
    constructor() {
        this.statusAccepted = [
            'ACCEPTED',
            'DECLINED',
            'CANCELLED',
        ];
    }
    transform(value) {
        const status = value.status.trim().toUpperCase();
        if (!this.statusAccepted.includes(status)) {
            throw new common_1.BadRequestException(`The status: ${status} is invalid.`);
        }
        return value;
    }
}
exports.ChallengeStatusValidatorPipe = ChallengeStatusValidatorPipe;
//# sourceMappingURL=challenge-status-validator.pipe.js.map