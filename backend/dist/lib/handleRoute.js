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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoute = void 0;
const handleRoute = (handler) => {
    return (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        ctx.log.info("handling route");
        /** TODO implement logging here. Shared api function */
        if (ctx.request.body && !(ctx.request.body)) {
            ctx.status = 400;
            ctx.throw(400);
        }
        yield handler(ctx);
        ctx.log.info("finished handling route");
    });
};
exports.handleRoute = handleRoute;
