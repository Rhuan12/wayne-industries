'use client'

import { Badge } from '@/components/ui/badge'
import { getAccessColor, getActionLabel, formatDate, getRoleLabel } from '@/lib/utils'
import { ShieldAlert, ShieldCheck, LogOut } from 'lucide-react'

interface AccessLogsListProps {
  logs: any[]
}

export function AccessLogsList({ logs }: AccessLogsListProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <ShieldCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Nenhum registro de acesso encontrado</p>
      </div>
    )
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'entry':
        return ShieldCheck
      case 'exit':
        return LogOut
      case 'denied':
        return ShieldAlert
      default:
        return ShieldCheck
    }
  }

  return (
    <div className="space-y-3">
      {logs.map((log: any) => {
        const Icon = getActionIcon(log.action)
        return (
          <div
            key={log.id}
            className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
          >
            <div className="flex-shrink-0">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  log.action === 'denied'
                    ? 'bg-red-600/20'
                    : log.action === 'entry'
                    ? 'bg-green-600/20'
                    : 'bg-blue-600/20'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    log.action === 'denied'
                      ? 'text-red-400'
                      : log.action === 'entry'
                      ? 'text-green-400'
                      : 'text-blue-400'
                  }`}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {log.user_profiles?.full_name || 'Usuário Desconhecido'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {log.restricted_areas?.name || 'Área desconhecida'}
                  </p>
                </div>
                <Badge className={getAccessColor(log.action)}>
                  {getActionLabel(log.action)}
                </Badge>
              </div>

              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                <span>{formatDate(log.timestamp)}</span>
                {log.user_profiles?.role && (
                  <span>• {getRoleLabel(log.user_profiles.role)}</span>
                )}
              </div>

              {log.notes && (
                <p className="mt-2 text-sm text-gray-500 italic">{log.notes}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}