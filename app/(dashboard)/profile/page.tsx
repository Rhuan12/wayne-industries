import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Briefcase, Calendar } from 'lucide-react'
import { getRoleLabel, formatDate } from '@/lib/utils'
import { redirect } from 'next/navigation'

async function getUserProfile() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { count: resourcesCreated } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', user.id)

  const { count: activitiesCount } = await supabase
    .from('activities')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { data: recentActivities } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', user.id)
    .order('timestamp', { ascending: false })
    .limit(5)

  return {
    user,
    profile,
    stats: {
      resourcesCreated: resourcesCreated || 0,
      activitiesCount: activitiesCount || 0,
    },
    recentActivities: recentActivities || [],
  }
}

export default async function ProfilePage() {
  const { user, profile, stats, recentActivities } = await getUserProfile()

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-400">Perfil não encontrado</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Meu Perfil</h1>
        <p className="text-gray-400 mt-2">
          Informações da sua conta e estatísticas de uso
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Seus dados cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-wayne-600 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">
                  {profile.full_name}
                </h2>
                <Badge className="mt-2">
                  {getRoleLabel(profile.role)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-800/50">
                <Mail className="h-5 w-5 text-wayne-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-200">{profile.email}</p>
                </div>
              </div>

              {profile.department && (
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-800/50">
                  <Briefcase className="h-5 w-5 text-wayne-400" />
                  <div>
                    <p className="text-xs text-gray-500">Departamento</p>
                    <p className="text-sm text-gray-200">{profile.department}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-800/50">
                <Calendar className="h-5 w-5 text-wayne-400" />
                <div>
                  <p className="text-xs text-gray-500">Membro desde</p>
                  <p className="text-sm text-gray-200">
                    {formatDate(profile.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recursos Criados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-wayne-400">
              {stats.resourcesCreated}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Total de recursos adicionados por você
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Atividades Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-wayne-400">
              {stats.activitiesCount}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Total de ações no sistema
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suas Atividades Recentes</CardTitle>
          <CardDescription>
            Últimas ações que você realizou no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-3 rounded-lg bg-gray-800/50"
                >
                  <div>
                    <p className="text-sm text-gray-200">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">
              Nenhuma atividade recente
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}