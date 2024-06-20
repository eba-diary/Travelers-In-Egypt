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
exports.SupabaseService = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class SupabaseService {
    constructor() { }
    getOrCreateClient() {
        if (this.sb) {
            return this.sb;
        }
        this.sb = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
        return this.sb;
    }
    signInWithPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            if (!this.sb) {
                return;
            }
            const { data, error } = yield this.sb.auth.signInWithPassword({ email, password });
            if (error) {
                throw error;
            }
            ;
            const { user, session } = data;
            return { user, session };
        });
    }
    signInWithGoogle() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sb) {
                return;
            }
            const { data, error } = yield this.sb.auth.signInWithOAuth({
                provider: "google"
            });
            if (error) {
                throw error;
            }
            const { provider, url } = data;
            return { provider, url };
        });
    }
    /** TODO: enumerate status codes  */
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sb) {
                return;
            }
            const { error } = yield this.sb.auth.signOut();
            if (error) {
                throw error;
            }
            ;
            return 200;
        });
    }
}
exports.SupabaseService = SupabaseService;
