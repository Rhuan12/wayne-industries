'use client'

import { Activity } from '@/types'
import { formatRelativeTime } from '@/lib/utils'
import { Activity as ActivityIcon } from 'lucide-react'

interface RecentActivitiesListProps {
  activities: (Activity & {
    user_profiles?: {
      full_name: string
      email: string
    }
  })[]
}

export function RecentActivitiesList({ activities }: RecentActivitiesListProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <ActivityIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Nenhuma atividade recente</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
        >
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-wayne-600/20 flex items-center justify-center">
              <ActivityIcon className="h-4 w-4 text-wayne-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200">
              {activity.user_profiles?.full_name || 'Usuário'}
            </p>
            <p className="text-sm text-gray-400 truncate">
              {activity.description}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {formatRelativeTime(activity.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}