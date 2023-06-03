import { SupabaseClient, createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

export class SupabaseService {
    private sb?: SupabaseClient;

    constructor() { }

    public getClient(): SupabaseClient {
        if (this.sb) {
            return this.sb
        }

        this.sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

        return this.sb
    }
}