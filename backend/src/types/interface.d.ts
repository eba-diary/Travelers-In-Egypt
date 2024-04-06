import { type PostgrestError } from '@supabase/supabase-js';

export interface IConfig {
  meta: {
    port: string
  }
  redis: {
    socket: {
      host: string
      port: number
    }
  }
}

export interface Ship {
  id: BigInteger
  ship_name: string
  ship_date: Date
  passenger_list: Passenger
}

export interface Passenger {
  passenger: string[]
}

export interface CustomProviderError {
  status: 'success' | 'failure'
  error: PostgrestError
}

export interface Travelogue {
  id: number
  Publications: Publications | any
  Travelers: Traveler
}

export interface Publications {
  title: string
  summary: string
  can_read: boolean
  publications_id: number
}

export interface Traveler {
  travelers_name: string
  travelers_type: string
  travelers_id: number
}
