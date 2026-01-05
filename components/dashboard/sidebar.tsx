'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Package,
  Shield,
  User,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface SidebarProps {
  userRole?: string
  userName?: string
}

export function Sidebar({ userRole, userName }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      toast.success('Logout realizado com sucesso')
      router.push('/login')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao fazer logout')
      console.error(error)
    }
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Recursos',
      href: '/resources',
      icon: Package,
    },
    {
      name: 'Segurança',
      href: '/security',
      icon: Shield,
    },
    {
      name: 'Perfil',
      href: '/profile',
      icon: User,
    },
  ]

  return (
    <div className="flex h-full flex-col gap-y-5 bg-gray-900 border-r border-gray-800 px-6 pb-4">
      <div className="flex h-16 items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-wayne-400" />
          <div>
            <h1 className="text-lg font-bold text-gray-100">Wayne</h1>
            <p className="text-xs text-gray-400">Industries</p>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                        isActive
                          ? 'bg-wayne-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>

          <li className="mt-auto">
            <div className="rounded-lg bg-gray-800/50 p-4 mb-4">
              <p className="text-xs text-gray-400">Usuário</p>
              <p className="text-sm font-semibold text-gray-100 truncate">
                {userName || 'Usuário'}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {userRole || 'Função'}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}