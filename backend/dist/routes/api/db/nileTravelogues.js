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
const travelogues_provider_1 = require("../../../providers/travelogues.provider");
const router = new koa_router_1.default();
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const traveloguesProvider = new travelogues_provider_1.Travelogues(ctx.sb);
    try {
        const traveloguesAndAuthors = yield traveloguesProvider.getAllTraveloguesAndPublications();
        if (traveloguesAndAuthors instanceof Array) {
            const publicationsMap = new Map();
            traveloguesAndAuthors.forEach((travelogue) => {
                const publication = travelogue.Publications;
                const publicationTitle = publication.title;
                if (!publicationsMap.has(publicationTitle)) {
                    publicationsMap.set(publicationTitle, {
                        id: publication.publications_id,
                        Publications: Object.assign({}, publication),
                        Travelers: [Object.assign({}, travelogue.Travelers)]
                    });
                }
                else {
                    const existingPublication = publicationsMap.get(publicationTitle);
                    existingPublication.Travelers.push(Object.assign({}, travelogue.Travelers));
                }
            });
            const reshapedData = Array.from(publicationsMap.values()).map((travelogue) => {
                const trimmedTitle = travelogue.Publications.title.trim();
                const canReadSymbol = travelogue.Publications.can_read ? '✅' : '❌';
                return Object.assign(Object.assign({}, travelogue), { Travelers: {
                        info: [...travelogue.Travelers],
                        travelers_name: travelogue.Travelers.map((entry) => entry.travelers_name)
                    }, Publications: Object.assign(Object.assign({}, travelogue.Publications), { title: trimmedTitle, can_read: canReadSymbol }) });
            });
            ctx.status = 200;
            ctx.body = reshapedData;
        }
        else {
            ctx.status = 400;
            ctx.body = {
                status: 'failure',
                error: {
                    message: 'Bad Request. Try a different request.'
                }
            };
        }
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}));
router.get('/publications', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const traveloguesProvider = new travelogues_provider_1.Travelogues(ctx.sb);
    try {
        const travelogues = yield traveloguesProvider.getAllTravelogues();
        if (travelogues instanceof Array) {
            ctx.status = 200;
            ctx.body = travelogues;
        }
        else {
            ctx.status = 400;
            ctx.body = {
                status: 'failure',
                error: {
                    message: 'Bad Request. Try a different request.'
                }
            };
        }
        ctx.status = 200;
        ctx.body = travelogues;
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}));
exports.default = router;
