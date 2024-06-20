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
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const config_1 = require("./config");
const api_1 = __importDefault(require("./routes/api"));
const healthcheck_1 = __importDefault(require("./routes/healthcheck"));
const bunyan_1 = __importDefault(require("bunyan"));
const supabase_service_1 = require("./supabase/supabase.service");
const app = new koa_1.default();
const PORT = config_1.config.meta.port;
const APP_NAME = "Travelers In Egypt Backend";
app.use((0, koa_bodyparser_1.default)());
app.use((0, koa2_cors_1.default)({
    origin: '*'
}));
app.use((0, koa_logger_1.default)());
const log = bunyan_1.default.createLogger({ name: APP_NAME });
log.info("Travelers in Egypt back-end entry point");
const sb = new supabase_service_1.SupabaseService();
/** add sb to context */
app.context.sb = sb;
app.context.log = log;
app.context.healthCheckRouter = healthcheck_1.default;
app.context.apiRouter = api_1.default;
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    /** apply and use the context */
    ctx.sb = sb;
    log.info("Supabase service established");
    yield next();
}));
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.log = log;
    log.info("Added log to context");
    yield next();
}));
app.use(healthcheck_1.default.routes());
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.healthCheckRouter = healthcheck_1.default;
    log.info("Health Check Router");
    yield next();
}));
app.use(api_1.default.routes());
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.apiRouter = api_1.default;
    log.info("API Router");
    yield next();
}));
const server = app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server listening on port ${PORT}`);
})).on('error', error => {
    console.log(error);
});
exports.default = server;
