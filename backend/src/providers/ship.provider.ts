import { promisify } from 'util'
import { type SupabaseService } from '../supabase/supabase.service'
import { type CustomProviderError, type Ship } from '../types/interface'

export class ShipProvider {
	constructor(private readonly sb: SupabaseService) { }

	public async getAllShips(): Promise<Ship[] | CustomProviderError> {
		const { data, error } = await this.sb.getOrCreateClient()
			.from('Ships')
			.select('*')

		if (error) {
			return {
				status: 'failure',
				error: error
			} as CustomProviderError
		}

		const ships: Ship[] = data.map(row => {
			return {
				id: row.id,
				ship_name: row.ship_name,
				ship_date: new Date(row.ship_date),
				passenger_list: row.passenger_list
			}
		})

		return ships
	}
}
