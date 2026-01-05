'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Resource } from '@/types'

const resourceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  type: z.enum(['equipment', 'vehicle', 'security_device']),
  status: z.enum(['available', 'in_use', 'maintenance', 'retired']),
  description: z.string().optional(),
  location: z.string().optional(),
})

type ResourceFormData = z.infer<typeof resourceSchema>

interface ResourceFormProps {
  resource?: Resource
}

export function ResourceForm({ resource }: ResourceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: resource
      ? {
          name: resource.name,
          type: resource.type,
          status: resource.status,
          description: resource.description || '',
          location: resource.location || '',
        }
      : {
          status: 'available',
        },
  })

  const onSubmit = async (data: ResourceFormData) => {
    setLoading(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('Usuário não autenticado')
        return
      }

      if (resource) {
        const { error } = await supabase
          .from('resources')
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', resource.id)

        if (error) throw error

        await supabase.from('activities').insert({
          user_id: user.id,
          resource_id: resource.id,
          action_type: 'update_resource',
          description: `Atualizou o recurso: ${data.name}`,
        })

        toast.success('Recurso atualizado com sucesso!')
      } else {
        const { error } = await supabase.from('resources').insert({
          ...data,
          created_by: user.id,
        })

        if (error) throw error

        await supabase.from('activities').insert({
          user_id: user.id,
          action_type: 'create_resource',
          description: `Criou o recurso: ${data.name}`,
        })

        toast.success('Recurso criado com sucesso!')
      }

      router.push('/resources')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao salvar recurso')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          placeholder="Ex: Batmóvel, Computador Principal..."
          {...register('name')}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo *</Label>
          <Select id="type" {...register('type')} disabled={loading}>
            <option value="equipment">Equipamento</option>
            <option value="vehicle">Veículo</option>
            <option value="security_device">Dispositivo de Segurança</option>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select id="status" {...register('status')} disabled={loading}>
            <option value="available">Disponível</option>
            <option value="in_use">Em Uso</option>
            <option value="maintenance">Manutenção</option>
            <option value="retired">Desativado</option>
          </Select>
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localização</Label>
        <Input
          id="location"
          placeholder="Ex: Batcaverna, Edifício Principal..."
          {...register('location')}
          disabled={loading}
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descrição detalhada do recurso..."
          rows={4}
          {...register('description')}
          disabled={loading}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : resource ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  )
}