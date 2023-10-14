"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationParamsPipe = void 0;
const common_1 = require("@nestjs/common");
class ValidationParamsPipe {
    transform(value, metadata) {
        if (!value)
            throw new common_1.BadRequestException(`The value ${metadata.data} should be informed.`);
        return value;
    }
}
exports.ValidationParamsPipe = ValidationParamsPipe;
//# sourceMappingURL=validation-params.pipe.js.map