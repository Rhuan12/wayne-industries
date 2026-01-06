import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { AccessLogsList } from '@/components/security/access-logs-list'
import { RestrictedAreasList } from '@/components/security/restricted-areas-list'
import { AccessLog, RestrictedArea } from '@/types'

async function getSecurityStats() {
  const supabase = createClient()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count: todayLogs } = await supabase
    .from('access_logs')
    .select('*', { count: 'exact', head: true })
    .gte('timestamp', today.toISOString())

  const { count: deniedToday } = await supabase
    .from('access_logs')
    .select('*', { count: 'exact', head: true })
    .eq('action', 'denied')
    .gte('timestamp', today.toISOString())

  const { count: activeAreas } = await supabase
    .from('restricted_areas')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { data: logsData } = await supabase
    .from('access_logs')
    .select(`
      *,
      user_profiles!access_logs_user_id_fkey (
        full_name,
        email,
        role
      ),
      restricted_areas!access_logs_area_id_fkey (
        name,
        required_access_level
      )
    `)
    .order('timestamp', { ascending: false })
    .limit(10)

  const recentLogs = (logsData || []) as AccessLog[]

  const { data: areasData } = await supabase
    .from('restricted_areas')
    .select('*')
    .order('created_at', { ascending: false })

  const areas = (areasData || []) as RestrictedArea[]

  return {
    todayLogs: todayLogs || 0,
    deniedToday: deniedToday || 0,
    activeAreas: activeAreas || 0,
    recentLogs,
    areas,
  }
}

export default async function SecurityPage() {
  const stats = await getSecurityStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">
          Controle de Segurança
        </h1>
        <p className="text-gray-400 mt-2">
          Monitore acessos e gerencie áreas restritas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Acessos Hoje
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayLogs}</div>
            <p className="text-xs text-gray-400">
              Registros de entrada e saída
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Acessos Negados
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {stats.deniedToday}
            </div>
            <p className="text-xs text-gray-400">
              Tentativas bloqueadas hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Áreas Protegidas
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAreas}</div>
            <p className="text-xs text-gray-400">
              Áreas restritas ativas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Áreas Restritas</CardTitle>
          <CardDescription>
            Gerencie as áreas com acesso controlado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RestrictedAreasList areas={stats.areas} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registros de Acesso</CardTitle>
          <CardDescription>
            Últimas atividades registradas no sistema de segurança
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccessLogsList logs={stats.recentLogs} />
        </CardContent>
      </Card>
    </div>
  )
}