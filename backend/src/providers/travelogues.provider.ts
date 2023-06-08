import { SupabaseService } from "../supabase/supabase.service";
import { CustomProviderError, Publications, Travelogue } from "../types/interface";


export class Travelogues {
    constructor(private readonly sb: SupabaseService) { }

    public async getAllTravelogues(): Promise<Publications[] | CustomProviderError> {
        const { data, error } = await this.sb.getClient()
            .from('Publications')
            .select('*')

        if (error) {
            return {
                status: 'failure',
                error: error
            } as CustomProviderError
        }

        const publications = data.map(row => {
            return {
                ...row
            }
        }) as Publications[]

        return publications
    }

    public async getAllTraveloguesAndPublications() {
        const { data, error } = await this.sb.getClient()
            .from('PublicationsAuthor')
            .select(` 
                id,
                Publications (*),
                Travelers (*)
            `)

        if (error) {
            return {
                status: 'failure',
                error: error
            } as CustomProviderError
        }

        const reshaphedData = data.map((entry) => {
            return {
                ...entry,
                Travelers: entry.Travelers instanceof Array ? entry.Travelers[0] : entry.Travelers
            }
        })

        return reshaphedData as Travelogue[]
    }
}