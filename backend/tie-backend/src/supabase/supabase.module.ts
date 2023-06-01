import { Module } from "@nestjs/common";
import { Supabase } from "./supabase.provider";

@Module({
    providers: [Supabase],
    exports: [Supabase]
})

export class SupabaseModule { }