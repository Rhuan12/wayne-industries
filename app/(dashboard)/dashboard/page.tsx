import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, ShieldCheck, Users, Activity } from 'lucide-react'
import { RecentActivitiesList } from '@/components/dashboard/recent-activities-list'
import { ResourcesChart } from '@/components/dashboard/resources-chart'
import { AccessLogsChart } from '@/components/dashboard/access-logs-chart'

async function getDashboardStats() {
  const supabase = createClient()

  const { count: totalResources } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })

  const { count: availableResources } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'available')

  const { count: totalUsers } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const { count: todayAccesses } = await supabase
    .from('access_logs')
    .select('*', { count: 'exact', head: true })
    .gte('timestamp', today.toISOString())

  const { data: recentActivities } = await supabase
    .from('activities')
    .select(`
      *,
      user_profiles!activities_user_id_fkey (
        full_name,
        email
      )
    `)
    .order('timestamp', { ascending: false })
    .limit(5)

  const { count: equipmentCount } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'equipment')

  const { count: vehicleCount } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'vehicle')

  const { count: securityDeviceCount } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'security_device')

  return {
    totalResources: totalResources || 0,
    availableResources: availableResources || 0,
    totalUsers: totalUsers || 0,
    todayAccesses: todayAccesses || 0,
    recentActivities: recentActivities || [],
    resourcesByType: {
      equipment: equipmentCount || 0,
      vehicle: vehicleCount || 0,
      security_device: securityDeviceCount || 0,
    },
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Visão geral do sistema das Indústrias Wayne
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Recursos
            </CardTitle>
            <Package className="h-4 w-4 text-wayne-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResources}</div>
            <p className="text-xs text-gray-400">
              {stats.availableResources} disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Acessos Hoje
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAccesses}</div>
            <p className="text-xs text-gray-400">
              Registros de entrada e saída
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-400">
              Funcionários cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atividades Recentes
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.recentActivities.length}
            </div>
            <p className="text-xs text-gray-400">
              Últimas 5 atividades
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recursos por Tipo</CardTitle>
            <CardDescription>
              Distribuição dos recursos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResourcesChart data={stats.resourcesByType} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações registradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivitiesList activities={stats.recentActivities} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acessos por Período</CardTitle>
          <CardDescription>
            Monitoramento de acessos às áreas restritas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccessLogsChart />
        </CardContent>
      </Card>
    </div>
  )
}