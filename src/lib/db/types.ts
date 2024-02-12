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
      contacts: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
          message: string
          responded: boolean
          responded_by: string | null
          telephone: string
          voiture_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
          message: string
          responded?: boolean
          responded_by?: string | null
          telephone: string
          voiture_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          message?: string
          responded?: boolean
          responded_by?: string | null
          telephone?: string
          voiture_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_responded_by_fkey"
            columns: ["responded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_voiture_id_fkey"
            columns: ["voiture_id"]
            isOneToOne: false
            referencedRelation: "voitures"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          name: string
          role_type: number
        }
        Insert: {
          id: string
          name: string
          role_type?: number
        }
        Update: {
          id?: string
          name?: string
          role_type?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          description: string
          id: number
          title: string
        }
        Insert: {
          description: string
          id?: never
          title: string
        }
        Update: {
          description?: string
          id?: never
          title?: string
        }
        Relationships: []
      }
      temoignages: {
        Row: {
          approved: boolean
          approved_by: string | null
          created_at: string
          id: number
          message: string
          name: string
          rating: number
        }
        Insert: {
          approved?: boolean
          approved_by?: string | null
          created_at?: string
          id?: never
          message: string
          name: string
          rating: number
        }
        Update: {
          approved?: boolean
          approved_by?: string | null
          created_at?: string
          id?: never
          message?: string
          name?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "temoignages_responded_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      voitures: {
        Row: {
          created_at: string
          created_by: string
          doors: number | null
          equipment: string[] | null
          id: string
          image: string
          kilometrage: number
          options: string[] | null
          power: string | null
          price: number
          seats: number | null
          traction_id: number | null
          transmission: string | null
          year: number
        }
        Insert: {
          created_at?: string
          created_by: string
          doors?: number | null
          equipment?: string[] | null
          id?: string
          image: string
          kilometrage: number
          options?: string[] | null
          power?: string | null
          price: number
          seats?: number | null
          traction_id?: number | null
          transmission?: string | null
          year: number
        }
        Update: {
          created_at?: string
          created_by?: string
          doors?: number | null
          equipment?: string[] | null
          id?: string
          image?: string
          kilometrage?: number
          options?: string[] | null
          power?: string | null
          price?: number
          seats?: number | null
          traction_id?: number | null
          transmission?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "voitures_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voitures_traction_id_fket"
            columns: ["traction_id"]
            isOneToOne: false
            referencedRelation: "voitures_traction"
            referencedColumns: ["id"]
          }
        ]
      }
      voitures_traction: {
        Row: {
          description: string
          id: number
        }
        Insert: {
          description: string
          id?: number
        }
        Update: {
          description?: string
          id?: number
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

