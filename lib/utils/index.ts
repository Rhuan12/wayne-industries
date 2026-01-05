import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { 
    addSuffix: true,
    locale: ptBR 
  })
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    employee: 'Funcionário',
    manager: 'Gerente',
    admin: 'Administrador',
  }
  return labels[role] || role
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Disponível',
    in_use: 'Em Uso',
    maintenance: 'Manutenção',
    retired: 'Desativado',
  }
  return labels[status] || status
}

export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    equipment: 'Equipamento',
    vehicle: 'Veículo',
    security_device: 'Dispositivo de Segurança',
  }
  return labels[type] || type
}

export function getActionLabel(action: string): string {
  const labels: Record<string, string> = {
    entry: 'Entrada',
    exit: 'Saída',
    denied: 'Negado',
  }
  return labels[action] || action
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: 'text-green-600 bg-green-100',
    in_use: 'text-blue-600 bg-blue-100',
    maintenance: 'text-yellow-600 bg-yellow-100',
    retired: 'text-gray-600 bg-gray-100',
  }
  return colors[status] || 'text-gray-600 bg-gray-100'
}

export function getAccessColor(action: string): string {
  const colors: Record<string, string> = {
    entry: 'text-green-600 bg-green-100',
    exit: 'text-blue-600 bg-blue-100',
    denied: 'text-red-600 bg-red-100',
  }
  return colors[action] || 'text-gray-600 bg-gray-100'
}