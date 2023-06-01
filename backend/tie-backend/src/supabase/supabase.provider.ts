import { Injectable, Logger } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config()

@Injectable()
export class Supabase {
    private sb: SupabaseClient
    private readonly logger = new Logger(Supabase.name)

    constructor() { }

    public getClient(): SupabaseClient {
        this.logger.log('getting supabase client')
        if (this.sb) {
            this.logger.log('client exists, returning current client')
            return this.sb
        }

        this.logger.log('initializing new supabase client')
        this.sb = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY
        )

        this.logger.log('client created')

        return this.sb
    }
}