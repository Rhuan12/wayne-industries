import { Database } from './database.types'

export type UserRole = 'employee' | 'manager' | 'admin'
export type ResourceType = 'equipment' | 'vehicle' | 'security_device'
export type ResourceStatus = 'available' | 'in_use' | 'maintenance' | 'retired'
export type AccessAction = 'entry' | 'exit' | 'denied'

export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type Resource = Database['public']['Tables']['resources']['Row']
export type RestrictedArea = Database['public']['Tables']['restricted_areas']['Row']
export type AccessLog = Database['public']['Tables']['access_logs']['Row']
export type Activity = Database['public']['Tables']['activities']['Row']

export interface DashboardStats {
  totalResources: number
  availableResources: number
  activeUsers: number
  todayAccesses: number
  recentActivities: Activity[]
  resourcesByType: {
    equipment: number
    vehicle: number
    security_device: number
  }
  resourcesByStatus: {
    available: number
    in_use: number
    maintenance: number
    retired: number
  }
}

export interface ResourceWithCreator extends Resource {
  creator?: {
    full_name: string
    email: string
  }
}

export interface AccessLogWithDetails extends AccessLog {
  user?: {
    full_name: string
    email: string
    role: UserRole
  }
  area?: {
    name: string
    required_access_level: UserRole
  }
}