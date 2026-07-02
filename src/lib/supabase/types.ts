export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          city: string | null;
          role: 'organiser' | 'vendor' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          city?: string | null;
          role?: 'organiser' | 'vendor' | 'admin';
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          city?: string | null;
          role?: 'organiser' | 'vendor' | 'admin';
        };
        Relationships: [];
      };
      vendor_profiles: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          category: string;
          city: string;
          description: string | null;
          address: string | null;
          website: string | null;
          whatsapp: string | null;
          email: string | null;
          logo_url: string | null;
          cover_url: string | null;
          price_range: string | null;
          rating: number;
          review_count: number;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          business_name: string;
          category: string;
          city: string;
          description?: string | null;
          address?: string | null;
          website?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          price_range?: string | null;
        };
        Update: {
          business_name?: string;
          category?: string;
          city?: string;
          description?: string | null;
          address?: string | null;
          website?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          price_range?: string | null;
          rating?: number;
          review_count?: number;
          verified?: boolean;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          type: string;
          date: string;
          guests: number;
          budget: number | null;
          venue: string | null;
          city: string | null;
          description: string | null;
          status: 'planning' | 'confirmed' | 'completed' | 'cancelled';
          cover_url: string | null;
          ai_plan: Json | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          type: string;
          date: string;
          guests?: number;
          budget?: number | null;
          venue?: string | null;
          city?: string | null;
          description?: string | null;
          status?: 'planning' | 'confirmed' | 'completed' | 'cancelled';
          cover_url?: string | null;
          ai_plan?: Record<string, unknown> | null;
        };
        Update: {
          user_id?: string;
          title?: string;
          type?: string;
          date?: string;
          guests?: number;
          budget?: number | null;
          venue?: string | null;
          city?: string | null;
          description?: string | null;
          status?: 'planning' | 'confirmed' | 'completed' | 'cancelled';
          cover_url?: string | null;
          ai_plan?: Record<string, unknown> | null;
        };
        Relationships: [];
      };
      quote_requests: {
        Row: {
          id: string;
          event_id: string;
          vendor_id: string;
          requester_id: string;
          message: string;
          event_date: string | null;
          guest_count: number | null;
          budget: number | null;
          status: 'pending' | 'replied' | 'accepted' | 'declined';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quote_requests']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['quote_requests']['Insert']>;
        Relationships: [];
      };
      quote_responses: {
        Row: {
          id: string;
          quote_request_id: string;
          sender_id: string;
          message: string;
          price: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quote_responses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['quote_responses']['Insert']>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          event_id: string;
          vendor_id: string;
          quote_request_id: string | null;
          user_id: string;
          service: string;
          amount: number;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          payment_proof_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
        Relationships: [];
      };
      tickets: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          ticket_type: string;
          price: number;
          qr_data: string;
          status: 'active' | 'used' | 'cancelled';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tickets']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['tickets']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
