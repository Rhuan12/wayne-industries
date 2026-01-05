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
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'employee' | 'manager' | 'admin'
          department: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'employee' | 'manager' | 'admin'
          department?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'employee' | 'manager' | 'admin'
          department?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          type: 'equipment' | 'vehicle' | 'security_device'
          name: string
          description: string | null
          status: 'available' | 'in_use' | 'maintenance' | 'retired'
          location: string | null
          image_url: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: 'equipment' | 'vehicle' | 'security_device'
          name: string
          description?: string | null
          status?: 'available' | 'in_use' | 'maintenance' | 'retired'
          location?: string | null
          image_url?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: 'equipment' | 'vehicle' | 'security_device'
          name?: string
          description?: string | null
          status?: 'available' | 'in_use' | 'maintenance' | 'retired'
          location?: string | null
          image_url?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      restricted_areas: {
        Row: {
          id: string
          name: string
          description: string | null
          required_access_level: 'employee' | 'manager' | 'admin'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          required_access_level: 'employee' | 'manager' | 'admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          required_access_level?: 'employee' | 'manager' | 'admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      access_logs: {
        Row: {
          id: string
          user_id: string
          area_id: string
          action: 'entry' | 'exit' | 'denied'
          timestamp: string
          notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          area_id: string
          action: 'entry' | 'exit' | 'denied'
          timestamp?: string
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          area_id?: string
          action?: 'entry' | 'exit' | 'denied'
          timestamp?: string
          notes?: string | null
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          resource_id: string | null
          action_type: string
          description: string
          timestamp: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id?: string | null
          action_type: string
          description: string
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string | null
          action_type?: string
          description?: string
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'employee' | 'manager' | 'admin'
      resource_type: 'equipment' | 'vehicle' | 'security_device'
      resource_status: 'available' | 'in_use' | 'maintenance' | 'retired'
      access_action: 'entry' | 'exit' | 'denied'
    }
  }
}