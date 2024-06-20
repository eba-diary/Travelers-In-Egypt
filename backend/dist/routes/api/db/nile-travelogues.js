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
exports.traveloguesRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const handleRoute_1 = require("../../../lib/handleRoute");
const prisma_client_1 = require("../../../providers/prisma-client");
``;
const traveloguesRouter = new koa_router_1.default();
exports.traveloguesRouter = traveloguesRouter;
;
const getTravelogues = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_client_1.prisma.publication.findMany({
        include: {
            publication_traveler: {
                include: {
                    traveler: true
                }
            }
        }
    });
    if (!data) {
        ctx.throw(400, "publication to traveler linking threw an error");
    }
    ctx.status = 200;
    ctx.body = data;
});
const getPublications = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_client_1.prisma.publication.findMany();
    if (!data) {
        ctx.throw(400, "getting all publications failed");
    }
    ctx.status = 200;
    ctx.body = data;
});
traveloguesRouter.get('/', (0, handleRoute_1.handleRoute)(getTravelogues));
traveloguesRouter.get('/publications', (0, handleRoute_1.handleRoute)(getPublications));
