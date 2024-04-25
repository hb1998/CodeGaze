export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessment: {
        Row: {
          candidate_id: string | null
          challenge_id: string | null
          code: string | null
          created_at: string | null
          exam_id: string | null
          execution_memory: number | null
          execution_time: number | null
          finished: string | null
          id: number
          joined: string | null
          language: string | null
          result: Json | null
          status: number | null
        }
        Insert: {
          candidate_id?: string | null
          challenge_id?: string | null
          code?: string | null
          created_at?: string | null
          exam_id?: string | null
          execution_memory?: number | null
          execution_time?: number | null
          finished?: string | null
          id?: number
          joined?: string | null
          language?: string | null
          result?: Json | null
          status?: number | null
        }
        Update: {
          candidate_id?: string | null
          challenge_id?: string | null
          code?: string | null
          created_at?: string | null
          exam_id?: string | null
          execution_memory?: number | null
          execution_time?: number | null
          finished?: string | null
          id?: number
          joined?: string | null
          language?: string | null
          result?: Json | null
          status?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exam"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate: {
        Row: {
          created_at: string | null
          emailId: string | null
          id: string
          name: string | null
          token: string | null
        }
        Insert: {
          created_at?: string | null
          emailId?: string | null
          id?: string
          name?: string | null
          token?: string | null
        }
        Update: {
          created_at?: string | null
          emailId?: string | null
          id?: string
          name?: string | null
          token?: string | null
        }
        Relationships: []
      }
      challenge: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: number | null
          id: string
          input_output: Json | null
          name: string | null
          short_description: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          id?: string
          input_output?: Json | null
          name?: string | null
          short_description?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          id?: string
          input_output?: Json | null
          name?: string | null
          short_description?: string | null
        }
        Relationships: []
      }
      exam: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      exam_challenge: {
        Row: {
          challenge_id: string
          created_at: string | null
          exam_id: string
          id: number
        }
        Insert: {
          challenge_id: string
          created_at?: string | null
          exam_id: string
          id?: number
        }
        Update: {
          challenge_id?: string
          created_at?: string | null
          exam_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_challenge_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_challenge_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exam"
            referencedColumns: ["id"]
          },
        ]
      }
      language_info: {
        Row: {
          challenge_id: string | null
          created_at: string | null
          id: number
          language: string | null
          starter_code: string | null
          test_cases: string | null
        }
        Insert: {
          challenge_id?: string | null
          created_at?: string | null
          id?: number
          language?: string | null
          starter_code?: string | null
          test_cases?: string | null
        }
        Update: {
          challenge_id?: string | null
          created_at?: string | null
          id?: number
          language?: string | null
          starter_code?: string | null
          test_cases?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "language_info_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
