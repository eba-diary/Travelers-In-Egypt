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
exports.boatPassengersRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const handleRoute_1 = require("../../../lib/handleRoute");
const prisma_client_1 = require("../../../providers/prisma-client");
const boatPassengersRouter = new koa_router_1.default();
exports.boatPassengersRouter = boatPassengersRouter;
const boatPassengers = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.log.info("Boat passengers route called");
    try {
        const data = yield prisma_client_1.prisma.ships.findMany({});
        if (!data) {
            ctx.throw(400, "Failed to fetch ships");
        }
        ctx.status = 200;
        ctx.body = data;
    }
    catch (error) {
        ctx.log.error(error, "Error encountered when fetching boat passengers.");
        ctx.throw(error);
    }
});
boatPassengersRouter.get('/', (0, handleRoute_1.handleRoute)(boatPassengers));
