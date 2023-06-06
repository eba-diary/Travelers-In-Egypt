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
exports.ShipProvider = void 0;
class ShipProvider {
    constructor(sb) {
        this.sb = sb;
    }
    getAllShips() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.sb.getClient()
                .from('Ships')
                .select('*');
            if (error) {
                return {
                    status: 'failure',
                    error: error
                };
            }
            const ships = data.map(row => {
                return {
                    id: row.id,
                    ship_name: row.ship_name,
                    ship_date: new Date(row.ship_date),
                    passenger_list: row.passenger_list
                };
            });
            return ships;
        });
    }
}
exports.ShipProvider = ShipProvider;
