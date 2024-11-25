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
      profiles: {
        Row: {
          account_type: string | null
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          "collectif-name": string | null
          expertise: string | null
          facebook: string | null
          first_name: string | null
          github: string | null
          id: string
          instagram: string | null
          invitation_email: string | null
          is_claimed: boolean | null
          last_name: string | null
          linkedin: string | null
          spotify: string | null
          updated_at: string | null
          username: string | null
          website: string | null
          youtube: string | null
        }
        Insert: {
          account_type?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          "collectif-name"?: string | null
          expertise?: string | null
          facebook?: string | null
          first_name?: string | null
          github?: string | null
          id?: string
          instagram?: string | null
          invitation_email?: string | null
          is_claimed?: boolean | null
          last_name?: string | null
          linkedin?: string | null
          spotify?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
          youtube?: string | null
        }
        Update: {
          account_type?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          "collectif-name"?: string | null
          expertise?: string | null
          facebook?: string | null
          first_name?: string | null
          github?: string | null
          id?: string
          instagram?: string | null
          invitation_email?: string | null
          is_claimed?: boolean | null
          last_name?: string | null
          linkedin?: string | null
          spotify?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      project_links: {
        Row: {
          created_at: string
          id: string
          project_id: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_links_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_participants: {
        Row: {
          avatar: string | null
          contribution: number
          contribution_description: string | null
          created_at: string
          id: string
          project_id: string | null
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          contribution: number
          contribution_description?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          contribution?: number
          contribution_description?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_participants_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          client: string | null
          created_at: string
          description: string
          due_date: string
          id: string
          team_leader: string
          team_leader_contribution: number | null
          team_leader_contribution_description: string | null
          testimonial: string | null
          thumbnail: string
          title: string
        }
        Insert: {
          category: string
          client?: string | null
          created_at?: string
          description: string
          due_date: string
          id: string
          team_leader: string
          team_leader_contribution?: number | null
          team_leader_contribution_description?: string | null
          testimonial?: string | null
          thumbnail: string
          title: string
        }
        Update: {
          category?: string
          client?: string | null
          created_at?: string
          description?: string
          due_date?: string
          id?: string
          team_leader?: string
          team_leader_contribution?: number | null
          team_leader_contribution_description?: string | null
          testimonial?: string | null
          thumbnail?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_team_leader_fkey"
            columns: ["team_leader"]
            isOneToOne: false
            referencedRelation: "profiles"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
