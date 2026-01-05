'use client'

import { useState } from 'react'
import { Resource } from '@/types'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Edit, 
  Trash2, 
  Package, 
  Car, 
  Shield 
} from 'lucide-react'
import Link from 'next/link'
import { 
  getStatusColor, 
  getStatusLabel, 
  getTypeLabel,
  formatDate 
} from '@/lib/utils'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface ResourcesListProps {
  resources: (Resource & {
    user_profiles?: {
      full_name: string
      email: string
    }
  })[]
}

export function ResourcesList({ resources: initialResources }: ResourcesListProps) {
  const [resources, setResources] = useState(initialResources)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const router = useRouter()

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === '' || resource.type === typeFilter
    const matchesStatus = statusFilter === '' || resource.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'equipment':
        return Package
      case 'vehicle':
        return Car
      case 'security_device':
        return Shield
      default:
        return Package
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este recurso?')) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id)

      if (error) throw error

      setResources(resources.filter(r => r.id !== id))
      toast.success('Recurso excluído com sucesso')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao excluir recurso')
      console.error(error)
    }
  }

  if (resources.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Package className="h-12 w-12 mx-auto mb-4 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          Nenhum recurso cadastrado
        </h3>
        <p className="text-gray-400 mb-6">
          Comece adicionando um novo recurso ao sistema
        </p>
        <Link href="/resources/new">
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Adicionar Recurso
          </Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar recursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="equipment">Equipamentos</option>
            <option value="vehicle">Veículos</option>
            <option value="security_device">Dispositivos de Segurança</option>
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="available">Disponível</option>
            <option value="in_use">Em Uso</option>
            <option value="maintenance">Manutenção</option>
            <option value="retired">Desativado</option>
          </Select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => {
          const Icon = getIcon(resource.type)
          return (
            <Card key={resource.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-wayne-600/20">
                    <Icon className="h-6 w-6 text-wayne-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">
                      {resource.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {getTypeLabel(resource.type)}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(resource.status)}>
                  {getStatusLabel(resource.status)}
                </Badge>
              </div>

              {resource.description && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {resource.description}
                </p>
              )}

              {resource.location && (
                <p className="text-xs text-gray-500 mb-4">
                  📍 {resource.location}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="text-xs text-gray-500">
                  {formatDate(resource.created_at)}
                </div>
                <div className="flex space-x-2">
                  <Link href={`/resources/edit/${resource.id}`}>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-400">
            Nenhum recurso encontrado com os filtros aplicados
          </p>
        </Card>
      )}
    </div>
  )
}