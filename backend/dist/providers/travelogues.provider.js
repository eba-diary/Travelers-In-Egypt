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
exports.Travelogues = void 0;
class Travelogues {
    constructor(sb) {
        this.sb = sb;
    }
    getAllTravelogues() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.sb.getClient()
                .from('Publications')
                .select('*');
            if (error) {
                return {
                    status: 'failure',
                    error: error
                };
            }
            const publications = data.map(row => {
                return Object.assign({}, row);
            });
            return publications;
        });
    }
    getAllTraveloguesAndPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.sb.getClient()
                .from('PublicationsAuthor')
                .select(`
                id,
                Publications (*),
                Travelers (*)
            `);
            return data;
        });
    }
}
exports.Travelogues = Travelogues;
