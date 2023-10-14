"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProxyBasket = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ClientProxyBasket = class ClientProxyBasket {
    getClientProxyAdmin() {
        return microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@localhost:5672/ranking'],
                queue: 'ms-admin',
            },
        });
    }
    getClientProxyChallenge() {
        return microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@localhost:5672/ranking'],
                queue: 'ms-challenges',
            },
        });
    }
    getClientProxyRankings() {
        return microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@localhost:5672/ranking'],
                queue: 'ms-rankings',
            },
        });
    }
};
ClientProxyBasket = __decorate([
    (0, common_1.Injectable)()
], ClientProxyBasket);
exports.ClientProxyBasket = ClientProxyBasket;
//# sourceMappingURL=client-proxy.js.map