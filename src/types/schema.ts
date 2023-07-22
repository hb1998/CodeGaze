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
                    candidate_id: number | null
                    challenge_id: number | null
                    code: string | null
                    created_at: string | null
                    exam_id: number | null
                    id: number
                    joined: string | null
                    language: string | null
                    status: number | null
                }
                Insert: {
                    candidate_id?: number | null
                    challenge_id?: number | null
                    code?: string | null
                    created_at?: string | null
                    exam_id?: number | null
                    id?: number
                    joined?: string | null
                    language?: string | null
                    status?: number | null
                }
                Update: {
                    candidate_id?: number | null
                    challenge_id?: number | null
                    code?: string | null
                    created_at?: string | null
                    exam_id?: number | null
                    id?: number
                    joined?: string | null
                    language?: string | null
                    status?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "assessment_candidate_id_fkey"
                        columns: ["candidate_id"]
                        referencedRelation: "candidate"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "assessment_challenge_id_fkey"
                        columns: ["challenge_id"]
                        referencedRelation: "challenge"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "assessment_exam_id_fkey"
                        columns: ["exam_id"]
                        referencedRelation: "exam"
                        referencedColumns: ["id"]
                    }
                ]
            }
            candidate: {
                Row: {
                    created_at: string | null
                    emailId: string | null
                    id: number
                    name: string | null
                    token: string | null
                }
                Insert: {
                    created_at?: string | null
                    emailId?: string | null
                    id?: number
                    name?: string | null
                    token?: string | null
                }
                Update: {
                    created_at?: string | null
                    emailId?: string | null
                    id?: number
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
                    id: number
                    input_output: Json | null
                    name: string | null
                    short_description: string | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    difficulty?: number | null
                    id?: number
                    input_output?: Json | null
                    name?: string | null
                    short_description?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    difficulty?: number | null
                    id?: number
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
                    id: number
                    name: string | null
                }
                Insert: {
                    created_at?: string | null
                    created_by?: string | null
                    id?: number
                    name?: string | null
                }
                Update: {
                    created_at?: string | null
                    created_by?: string | null
                    id?: number
                    name?: string | null
                }
                Relationships: []
            }
            exam_challenge: {
                Row: {
                    challenge_id: number
                    created_at: string | null
                    exam_id: number
                    id: number
                }
                Insert: {
                    challenge_id: number
                    created_at?: string | null
                    exam_id: number
                    id?: number
                }
                Update: {
                    challenge_id?: number
                    created_at?: string | null
                    exam_id?: number
                    id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "exam_challenge_challenge_id_fkey"
                        columns: ["challenge_id"]
                        referencedRelation: "challenge"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "exam_challenge_exam_id_fkey"
                        columns: ["exam_id"]
                        referencedRelation: "exam"
                        referencedColumns: ["id"]
                    }
                ]
            }
            language_info: {
                Row: {
                    challenge_id: number | null
                    created_at: string | null
                    id: number
                    language: string | null
                    starter_code: string | null
                    test_cases: string | null
                }
                Insert: {
                    challenge_id?: number | null
                    created_at?: string | null
                    id?: number
                    language?: string | null
                    starter_code?: string | null
                    test_cases?: string | null
                }
                Update: {
                    challenge_id?: number | null
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
                        referencedRelation: "challenge"
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
