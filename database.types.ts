export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          created_at: string
          id: number
          name: string
          players: number[]
          price_limit: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          players: number[]
          price_limit?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          players?: number[]
          price_limit?: number | null
        }
        Relationships: []
      }
      sorted_users: {
        Row: {
          created_at: string
          giftee_id: number
          gifter_id: number
          id: number
          room_id: number
        }
        Insert: {
          created_at?: string
          giftee_id: number
          gifter_id: number
          id?: number
          room_id: number
        }
        Update: {
          created_at?: string
          giftee_id?: number
          gifter_id?: number
          id?: number
          room_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sorted_users_giftee_id_fkey"
            columns: ["giftee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sorted_users_gifter_id_fkey"
            columns: ["gifter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sorted_users_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
