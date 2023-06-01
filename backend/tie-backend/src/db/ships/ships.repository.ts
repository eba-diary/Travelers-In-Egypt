import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/supabase/supabase.service";
import { Ship } from "./ships.model";

@Injectable()
export class ShipsRepository {
    constructor(private readonly sb: SupabaseService) { }

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