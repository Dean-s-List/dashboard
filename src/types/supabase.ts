import { MyValue } from "@/components/editor/typescript/plateTypes";
import type { CategoryEnum } from "@/constants";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name: string;
          avatar_url: string;
          account_enum: number;
          feedback_count: number;
        };
        Insert: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string;
          avatar_url?: string;
          account_enum?: number;
          feedback_count?: number;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string;
          avatar_url?: string;
          account_enum?: number;
          feedback_count?: number;
        };
      };
      feedbacks: {
        Row: {
          id: string | null;
          user_id: string;
          title: string | null;
          project: string;
          created_at: string | null;
          published: boolean;
          category: CategoryEnum | null;
          content: Json | MyValue | string;
          user_agent: string;
          avatar_url: string;
        };
        Insert: {
          id?: string | null;
          user_id?: string;
          title: string | null;
          project?: string;
          created_at?: string | null;
          published?: boolean;
          category?: CategoryEnum | null;
          content?: Json | MyValue | string;
          user_agent?: string;
          avatar_url?: string;
        };
        Update: {
          id?: string | null;
          user_id?: string;
          title?: string | null;
          project?: string;
          created_at?: string | null;
          published?: boolean;
          category?: CategoryEnum | null;
          content?: Json | MyValue | string;
          user_agent?: string;
          avatar_url?: string;
        };
      };
      projects: {
        Row: {
          id: string | null;
          name: string;
          created_at: string | null;
          starts_at: string;
          ends_at: string;
          description: string | null;
          focus: CategoryEnum;
          logo: string | null;
          image: string | null;
        };
        Insert: {
          id?: string | null;
          name?: string;
          created_at?: string | null;
          starts_at?: string;
          ends_at?: string;
          description?: string | null;
          focus?: CategoryEnum;
          logo?: string | null;
          image?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string | null;
          starts_at?: string;
          ends_at?: string;
          description?: string | null;
          focus?: CategoryEnum | null;
          logo?: string | null;
          image?: string | null;
        };
      };
      links: {
        Row: {
          id: string;
          project: string;
          text: string;
          link: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          project?: string;
          text?: string;
          link?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project?: string;
          text?: string;
          link?: string;
          created_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          project: string;
          text: string;
          link: string;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          project?: string;
          text?: string;
          link?: string;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          project?: string;
          text?: string;
          link?: string;
          uploaded_at?: string;
        };
      };
      deliverables: {
        Row: {
          id: string;
          name: string;
          project: string;
          due_date: string;
          value: number;
          category: CategoryEnum;
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string;
          project?: string;
          due_date?: string;
          value?: number;
          category?: CategoryEnum;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          project?: string;
          due_date?: string;
          value?: number;
          category?: CategoryEnum;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          user_id: string;
          content: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string;
          content?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
        };
      };
      stars: {
        Row: {
          id: string;
          user_id: string;
          value: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string;
          value?: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          value?: number;
          created_at?: string | null;
        };
      };
      admins: {
        Row: {
          id: string;
        };
        Insert: {
          id?: string;
        };
        Update: {
          id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_profiles_with_feedback: {
        Args: {
          project_id: string;
        };
        Returns: {
          id?: string;
          full_name?: string;
          avatar_url?: string | null;
        }[];
      };
      get_published_feedbacks: {
        Args: {
          project_id: string;
        };
        Returns: {
          id: string | null;
          user_id: string;
          title: string | null;
          project: string;
          created_at: string | null;
          published: boolean;
          category: CategoryEnum | null;
          content: Json | MyValue | string | null;
          user_agent: string;
          avatar_url: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
