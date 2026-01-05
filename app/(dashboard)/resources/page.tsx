import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ResourcesList } from '@/components/resources/resources-list'
import Link from 'next/link'

async function getResources() {
  const supabase = createClient()

  const { data: resources } = await supabase
    .from('resources')
    .select(`
      *,
      user_profiles!resources_created_by_fkey (
        full_name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  return resources || []
}

export default async function ResourcesPage() {
  const resources = await getResources()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Gerenciamento de Recursos
          </h1>
          <p className="text-gray-400 mt-2">
            Gerencie equipamentos, veículos e dispositivos de segurança
          </p>
        </div>
        <Link href="/resources/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Recurso
          </Button>
        </Link>
      </div>

      <ResourcesList resources={resources} />
    </div>
  )
}