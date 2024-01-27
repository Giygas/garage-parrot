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
            referencedRelation: "employees"
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
      employees: {
        Row: {
          created_at: string
          email: string
          id: string
          last_password: string | null
          name: string
          password: string
          role: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_password?: string | null
          name: string
          password?: string
          role?: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_password?: string | null
          name?: string
          password?: string
          role?: number
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
            referencedRelation: "employees"
            referencedColumns: ["id"]
          }
        ]
      }
      voitures: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          equipment: string[] | null
          id: string
          image: string
          kilometrage: number
          options: string[] | null
          price: number
          year: number
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          equipment?: string[] | null
          id?: string
          image: string
          kilometrage: number
          options?: string[] | null
          price: number
          year: number
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          equipment?: string[] | null
          id?: string
          image?: string
          kilometrage?: number
          options?: string[] | null
          price?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "voitures_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          }
        ]
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

