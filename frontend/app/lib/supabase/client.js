
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://swkzekerbptppohgrzvh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3a3pla2VyYnB0cHBvaGdyenZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxNTMyMTIsImV4cCI6MjAwMDcyOTIxMn0.SFeIbGhQC80RYofY0_RuXl9WoNL4ab34T8XcSp_K2WY'
export const supabase = createClient(supabaseUrl, supabaseKey)