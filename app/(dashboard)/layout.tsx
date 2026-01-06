import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { redirect } from 'next/navigation'
import { getRoleLabel } from '@/lib/utils'
import { UserProfile } from '@/types'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const profile = data as UserProfile | null

  return (
    <div className="flex h-screen bg-gray-950">
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar 
          userRole={profile ? getRoleLabel(profile.role) : undefined}
          userName={profile?.full_name}
        />
      </div>

      <main className="lg:pl-72 flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}