'use client'

import { RestrictedArea } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock } from 'lucide-react'
import { getRoleLabel } from '@/lib/utils'

interface RestrictedAreasListProps {
  areas: RestrictedArea[]
}

export function RestrictedAreasList({ areas }: RestrictedAreasListProps) {
  if (areas.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Nenhuma área restrita cadastrada</p>
      </div>
    )
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'admin':
        return 'text-red-600 bg-red-100'
      case 'manager':
        return 'text-orange-600 bg-orange-100'
      case 'employee':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-3">
      {areas.map((area) => (
        <div
          key={area.id}
          className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
        >
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-wayne-600/20 flex items-center justify-center">
              <Lock className="h-5 w-5 text-wayne-400" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-200">{area.name}</p>
                {area.description && (
                  <p className="text-sm text-gray-400 mt-1">{area.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {area.is_active ? (
                  <Badge className="text-green-600 bg-green-100">Ativa</Badge>
                ) : (
                  <Badge className="text-gray-600 bg-gray-100">Inativa</Badge>
                )}
              </div>
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xs text-gray-500">Nível de acesso:</span>
              <Badge className={getAccessLevelColor(area.required_access_level)}>
                {getRoleLabel(area.required_access_level)}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}