import { Injectable } from "@nestjs/common";
import { Supabase } from "src/supabase/supabase.provider";
import { Ship } from "./ships.model";

@Injectable()
export class ShipsRepository {
    constructor(private readonly sb: Supabase) { }

    public async getAllShips(): Promise<Ship[]> {
        let { data, error } = await this.sb.getClient()
            .from('Ships')
            .select('*')

        if (error) {
            throw new Error('Failed to fetch ship')
        }

        const ships: Ship[] = data.map(row => {
            return new Ship(
                row.id,
                row.ship_name,
                new Date(row.ship_date),
                row.passenger_list
            )
        })

        return ships
    }
}