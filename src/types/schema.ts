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
      assessment: {
        Row: {
          candidateId: number | null
          code: string | null
          createdAt: string | null
          examId: number | null
          id: number
          joined: string | null
          status: number | null
        }
        Insert: {
          candidateId?: number | null
          code?: string | null
          createdAt?: string | null
          examId?: number | null
          id?: number
          joined?: string | null
          status?: number | null
        }
        Update: {
          candidateId?: number | null
          code?: string | null
          createdAt?: string | null
          examId?: number | null
          id?: number
          joined?: string | null
          status?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_candidateId_fkey"
            columns: ["candidateId"]
            referencedRelation: "candidate"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_examId_fkey"
            columns: ["examId"]
            referencedRelation: "exam"
            referencedColumns: ["id"]
          }
        ]
      }
      candidate: {
        Row: {
          createdAt: string | null
          emailId: string | null
          id: number
          name: string | null
        }
        Insert: {
          createdAt?: string | null
          emailId?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          createdAt?: string | null
          emailId?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      challenge: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: number | null
          id: number
          languageInfoId: number | null
          shortDescription: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          id?: number
          languageInfoId?: number | null
          shortDescription?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          id?: number
          languageInfoId?: number | null
          shortDescription?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_languageInfoId_fkey"
            columns: ["languageInfoId"]
            referencedRelation: "languageInfo"
            referencedColumns: ["id"]
          }
        ]
      }
      exam: {
        Row: {
          challengeId: number | null
          createdAt: string | null
          createdBy: string | null
          id: number
          name: string | null
        }
        Insert: {
          challengeId?: number | null
          createdAt?: string | null
          createdBy?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          challengeId?: number | null
          createdAt?: string | null
          createdBy?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_challengeId_fkey"
            columns: ["challengeId"]
            referencedRelation: "challenge"
            referencedColumns: ["id"]
          }
        ]
      }
      languageInfo: {
        Row: {
          created_at: string | null
          id: number
          inputOutput: Json | null
          starterCode: string | null
          tests: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          inputOutput?: Json | null
          starterCode?: string | null
          tests?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: number
          inputOutput?: Json | null
          starterCode?: string | null
          tests?: Json | null
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

