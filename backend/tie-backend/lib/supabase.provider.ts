import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config()

export const sb: SupabaseClient = createClient(
    // 'https://swkzekerbptppohgrzvh.supabase.co',
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3a3pla2VyYnB0cHBvaGdyenZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxNTMyMTIsImV4cCI6MjAwMDcyOTIxMn0.SFeIbGhQC80RYofY0_RuXl9WoNL4ab34T8XcSp_K2WY'
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)