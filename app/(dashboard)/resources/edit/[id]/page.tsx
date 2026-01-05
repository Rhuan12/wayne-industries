import { createClient } from '@/lib/supabase/server'
import { ResourceForm } from '@/components/resources/resource-form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

async function getResource(id: string) {
  const supabase = createClient()
  
  const { data: resource } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single()

  return resource
}

export default async function EditResourcePage({
  params,
}: {
  params: { id: string }
}) {
  const resource = await getResource(params.id)

  if (!resource) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/resources">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Editar Recurso</h1>
          <p className="text-gray-400 mt-1">
            Atualize as informações do recurso
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Recurso</CardTitle>
          <CardDescription>
            Edite os dados do recurso {resource.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResourceForm resource={resource} />
        </CardContent>
      </Card>
    </div>
  )
}