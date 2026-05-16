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
      users: {
        Row: {
          id: string
          full_name: string | null
          email: string
          role: string | null
          avatar_url: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          role?: string | null
          avatar_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          role?: string | null
          avatar_url?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isRelationOneToOne: true
            referencedRelation: "users"
            referencedTable: "auth.users"
          }
        ]
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          category: string | null
          image_url: string | null
          technologies: string[] | null
          featured: boolean | null
          created_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          category?: string | null
          image_url?: string | null
          technologies?: string[] | null
          featured?: boolean | null
          created_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          category?: string | null
          image_url?: string | null
          technologies?: string[] | null
          featured?: boolean | null
          created_by?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isRelationOneToOne: false
            referencedRelation: "users"
            referencedTable: "public.users"
          }
        ]
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          status?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          cover_image: string | null
          published: boolean | null
          author_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          cover_image?: string | null
          published?: boolean | null
          author_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          cover_image?: string | null
          published?: boolean | null
          author_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isRelationOneToOne: false
            referencedRelation: "users"
            referencedTable: "public.users"
          }
        ]
      }
      chat_messages: {
        Row: {
          id: string
          sender_id: string | null
          role: string
          message: string
          created_at: string | null
        }
        Insert: {
          id?: string
          sender_id?: string | null
          role: string
          message: string
          created_at?: string | null
        }
        Update: {
          id?: string
          sender_id?: string | null
          role?: string
          message?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isRelationOneToOne: false
            referencedRelation: "users"
            referencedTable: "public.users"
          }
        ]
      }
      admin_settings: {
        Row: {
          id: string
          site_name: string | null
          maintenance_mode: boolean | null
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          site_name?: string | null
          maintenance_mode?: boolean | null
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          site_name?: string | null
          maintenance_mode?: boolean | null
          settings?: Json | null
          updated_at?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database }
  ,
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
    | { schema: keyof Database }
  ,
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
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
    | { schema: keyof Database }
  ,
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
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
