import { PostgrestError } from "@supabase/supabase-js"

export interface IConfig {
    meta: {
        port: string
    },
    redis: {
        socket: {
            host: string
            port: number
        }
    }
}

export interface Ship {
    id: BigInteger,
    ship_name: string,
    ship_date: Date,
    passenger_list: Passenger
}

export interface Passenger {
    passenger: string[]
}

export interface CustomProviderError {
    status: 'success' | 'failure'
    error: PostgrestError
}