"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastcsv = exports.fs = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
exports.fs = fs_1.default;
const fast_csv_1 = __importDefault(require("fast-csv"));
exports.fastcsv = fast_csv_1.default;
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
