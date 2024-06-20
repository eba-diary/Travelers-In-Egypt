"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    meta: {
        port: process.env.PORT || '8080'
    },
    redis: {
        socket: {
            host: process.env.REDIS__HOST || '0.0.0.0',
            port: process.env.REDIS__PORT && parseInt(process.env.REDIS__PORT) || 6379
        }
    }
};
