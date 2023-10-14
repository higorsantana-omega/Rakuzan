"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const momentTimezone = require("moment-timezone");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@localhost:5672/ranking'],
            noAck: false,
            queue: 'ms-admin',
        },
    });
    Date.prototype.toJSON = function () {
        return momentTimezone(this)
            .tz('America/Sao_Paulo')
            .format('YYYY-MM-DD HH:mm:ss.SSS');
    };
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map