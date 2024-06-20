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
exports.authRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const handleRoute_1 = require("../../../lib/handleRoute");
const authRouter = new koa_router_1.default();
exports.authRouter = authRouter;
const signIn = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = ctx.request.body;
    try {
        const data = yield ctx.sb.signInWithPassword({ email, password });
        ctx.status = 200;
    }
    catch (error) {
        ctx.status = 400;
        ctx.throw({
            status: 500,
            error: `Failed to sign in: ${error}`
        });
    }
});
authRouter.post('/signin', (0, handleRoute_1.handleRoute)(signIn));
