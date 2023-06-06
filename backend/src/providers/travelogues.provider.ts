import { SupabaseService } from "../supabase/supabase.service";
import { CustomProviderError, Travelogue } from "../types/interface";

export class Travelogues {
    constructor(private readonly sb: SupabaseService) { }

    public async getAllTravelogues(): Promise<Travelogue[] | CustomProviderError> {
        const { data, error } = await this.sb.getClient()
            .from('Publications')
            .select('*')

        if (error) {
            return {
                status: 'failure',
                error: error
            } as CustomProviderError
        }

        const publications: Travelogue[] = data.map(row => {
            return {
                ...row
            }
        })

        return publications
    }

    public async getAllTraveloguesAndPublications(): Promise<any> {
        const { data, error } = await this.sb.getClient()
            .from('PublicationsAuthor')
            .select(`
                id,
                Publications (*),
                Travelers (*)
            `)
        return data
    }
}