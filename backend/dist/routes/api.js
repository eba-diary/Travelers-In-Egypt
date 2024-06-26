"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const handleRoute_1 = require("../lib/handleRoute");
const db_1 = require("./api/db");
const router = new koa_router_1.default();
const handleApi = (_a) => __awaiter(void 0, [_a], void 0, function* ({ status, body, throw: throwError }) {
    try {
        status = 200;
        body = {
            "api_version": 1
        };
    }
    catch (error) {
        throwError(500, "Error getting api version", {});
    }
});
router.get('/', (0, handleRoute_1.handleRoute)(handleApi));
router.use('/api/v1/db', db_1.dbRouter.routes());
exports.default = router;
