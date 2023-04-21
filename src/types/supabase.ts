import type { CategoryEnum } from "@/constants";
import type { OutputData } from "@editorjs/editorjs";

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
          id: string;
          user_id: string;
          title: string;
          project: string;
          created_at: string;
          published: boolean;
          category: CategoryEnum;
          content: Json | OutputData | null;
          user_agent: string | null;
          upvotes: number;
          downvotes: number;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string;
          title: string;
          project?: string;
          created_at?: string;
          published?: boolean;
          category?: CategoryEnum;
          content?: Json | OutputData | null;
          user_agent?: string | null;
          upvotes?: number;
          downvotes?: number;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          project?: string;
          created_at?: string;
          published?: boolean;
          category?: CategoryEnum;
          content?: Json | OutputData | null;
          user_agent?: string | null;
          upvotes?: number;
          downvotes?: number;
          avatar_url?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          starts_at: string;
          ends_at: string;
          description: string | null;
          focus: CategoryEnum | null;
          logo: string | null;
          image: string | null;
        };
        Insert: {
          id?: string;
          name?: string;
          created_at?: string;
          starts_at?: string;
          ends_at?: string;
          description?: string | null;
          focus?: CategoryEnum | null;
          logo?: string | null;
          image?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
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
          created_at: string;
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
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project?: string;
          name?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project?: string;
          name?: string;
          created_at?: string;
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
      [_ in never]: never;
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
