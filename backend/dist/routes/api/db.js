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
exports.dbRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const handleRoute_1 = require("../../lib/handleRoute");
const boat_passengers_1 = require("./db/boat-passengers");
const nile_travelogues_1 = require("./db/nile-travelogues");
const dbRouter = new koa_router_1.default();
exports.dbRouter = dbRouter;
const db = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.status = 200;
    ctx.body = {
        db_version: 'v1'
    };
});
dbRouter.get('/', (0, handleRoute_1.handleRoute)(db));
dbRouter.use('/ships', boat_passengers_1.boatPassengersRouter.routes());
dbRouter.use('/travelogues', nile_travelogues_1.traveloguesRouter.routes());
