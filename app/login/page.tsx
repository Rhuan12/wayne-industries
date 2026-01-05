import { LoginForm } from '@/components/security/login-form'
import { Shield } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-wayne-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-wayne-600/20 border border-wayne-600/30">
              <Shield className="h-12 w-12 text-wayne-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Wayne Industries
          </h1>
          <p className="text-gray-400">
            Sistema de Gerenciamento e Segurança
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Wayne Industries. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}