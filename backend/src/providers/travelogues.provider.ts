import { SupabaseService } from "../supabase/supabase.service";
import { CustomProviderError, Publication, Travelogue } from "../types/interface";


export class Travelogues {
    constructor(private readonly sb: SupabaseService) { }

    public async getAllTravelogues(): Promise<Publication[] | CustomProviderError> {
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
        }) as Publication[]

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


        return data as Travelogue[]
    }
}