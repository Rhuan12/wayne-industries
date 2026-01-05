# 🦇 Wayne Industries - Sistema de Gerenciamento e Segurança

> Sistema Full Stack de gerenciamento de recursos e controle de segurança desenvolvido com Next.js 14, TypeScript e Supabase.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 📋 Sobre o Projeto

O **Wayne Industries System** é uma aplicação web completa para gerenciamento de recursos e controle de segurança empresarial. Desenvolvido como projeto acadêmico, o sistema demonstra a implementação de um stack moderno de desenvolvimento web com foco em segurança, usabilidade e escalabilidade.

### 🎯 Objetivos do Projeto

- ✅ Implementar autenticação segura com múltiplos níveis de acesso
- ✅ Desenvolver CRUD completo de recursos
- ✅ Criar dashboard com visualizações interativas
- ✅ Implementar sistema de controle de segurança e logs
- ✅ Aplicar boas práticas de desenvolvimento Full Stack

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **Next.js 14** - Framework React com App Router e Server Components
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Estilização utilitária e responsiva
- **Recharts** - Gráficos interativos e visualizações
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Sonner** - Notificações toast elegantes
- **Lucide React** - Ícones modernos

### **Backend**
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL (Banco de dados)
  - Authentication (JWT)
  - Row Level Security (RLS)
  - Real-time subscriptions

### **Ferramentas**
- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Compatibilidade CSS

---

## ✨ Funcionalidades Principais

### 🔐 **Autenticação e Segurança**
- Login seguro com email e senha
- 3 níveis de acesso (Admin, Manager, Employee)
- Proteção de rotas com middleware
- Row Level Security (RLS) no banco de dados
- Logout seguro com limpeza de sessão

### 📦 **Gerenciamento de Recursos**
- **CRUD Completo**: Create, Read, Update, Delete
- **Tipos de recursos**: Equipamentos, Veículos, Dispositivos de Segurança
- **Status**: Disponível, Em Uso, Manutenção, Aposentado
- **Filtros avançados**: Por tipo, status e busca textual
- **Validação de formulários** com feedback em tempo real

### 📊 **Dashboard Analítico**
- Cards de estatísticas em tempo real
- Gráfico de barras (distribuição de recursos por tipo)
- Gráfico de linha (monitoramento de acessos)
- Lista de atividades recentes
- Indicadores visuais (cores e badges)

### 🛡️ **Controle de Segurança**
- 5 áreas restritas pré-cadastradas
- Logs de acesso (entrada, saída, negados)
- Controle de permissões por nível de acesso
- Estatísticas de segurança
- Histórico completo de atividades

### 👤 **Perfil de Usuário**
- Informações pessoais
- Estatísticas de uso
- Histórico de atividades
- Badge de nível de acesso

---

## 📁 Estrutura do Projeto

```
wayne-industries/
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/          # Página principal do dashboard
│   │   ├── resources/          # Gerenciamento de recursos
│   │   │   ├── new/           # Criar novo recurso
│   │   │   └── edit/[id]/     # Editar recurso
│   │   ├── security/          # Controle de segurança
│   │   ├── profile/           # Perfil do usuário
│   │   └── layout.tsx         # Layout com sidebar
│   ├── login/                 # Página de login
│   ├── layout.tsx             # Layout raiz
│   ├── page.tsx               # Redirecionamento inicial
│   └── globals.css            # Estilos globais
│
├── components/
│   ├── ui/                    # Componentes UI reutilizáveis
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   └── badge.tsx
│   ├── dashboard/             # Componentes do dashboard
│   │   ├── sidebar.tsx
│   │   ├── resources-chart.tsx
│   │   ├── access-logs-chart.tsx
│   │   └── recent-activities-list.tsx
│   ├── resources/             # Componentes de recursos
│   │   ├── resources-list.tsx
│   │   └── resource-form.tsx
│   └── security/              # Componentes de segurança
│       ├── login-form.tsx
│       ├── access-logs-list.tsx
│       └── restricted-areas-list.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Cliente Supabase (client-side)
│   │   └── server.ts          # Cliente Supabase (server-side)
│   └── utils/
│       └── index.ts           # Funções utilitárias
│
├── types/
│   ├── database.types.ts      # Tipos do banco de dados
│   └── index.ts               # Tipos customizados
│
├── public/                    # Arquivos estáticos
├── middleware.ts              # Middleware de autenticação
├── tailwind.config.ts         # Configuração do Tailwind
├── tsconfig.json              # Configuração do TypeScript
├── next.config.js             # Configuração do Next.js
├── package.json               # Dependências do projeto
└── .env.local                 # Variáveis de ambiente (não versionado)
```

---

## 🛠️ Instalação e Configuração

### **Pré-requisitos**

- Node.js 18+ instalado
- npm ou yarn
- Conta no Supabase (gratuita)
- Git

### **1️⃣ Clone o Repositório**

```bash
git clone https://github.com/Rhuam12/wayne-industries.git
cd wayne-industries
```

### **2️⃣ Instale as Dependências**

```bash
npm install
# ou
yarn install
```

### **3️⃣ Configure o Supabase**

#### **A) Crie um Projeto no Supabase**
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (se não tiver)
3. Clique em "New Project"
4. Preencha:
   - Nome: `wayne-industries`
   - Database Password: (escolha uma senha forte)
   - Region: (mais próxima de você)

#### **B) Configure o Banco de Dados**

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Cole e execute o script SQL completo (disponível em `database/schema.sql`)

**Script SQL Resumido:**
```sql
-- 1. Criar tabelas
CREATE TABLE user_profiles (...);
CREATE TABLE resources (...);
CREATE TABLE restricted_areas (...);
CREATE TABLE access_logs (...);
CREATE TABLE activities (...);

-- 2. Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
-- ... (demais tabelas)

-- 3. Criar políticas de segurança
CREATE POLICY "Users can view own profile" ...
-- ... (demais políticas)

-- 4. Inserir áreas restritas
INSERT INTO restricted_areas ...
```

#### **C) Crie os Usuários de Teste**

1. No Supabase, vá em **Authentication > Users**
2. Clique em **Add user** e crie 3 usuários:

| Email | Senha | Função |
|-------|-------|--------|
| admin@wayne.com | admin123 | Admin |
| manager@wayne.com | manager123 | Manager |
| employee@wayne.com | employee123 | Employee |

3. **Copie os UIDs** dos usuários criados

#### **D) Insira os Perfis dos Usuários**

No **SQL Editor**, execute substituindo os UIDs:

```sql
INSERT INTO public.user_profiles (id, email, full_name, role, department) VALUES
    ('UUID-DO-ADMIN', 'admin@wayne.com', 'Bruce Wayne', 'admin', 'Diretoria'),
    ('UUID-DO-MANAGER', 'manager@wayne.com', 'Alfred Pennyworth', 'manager', 'Operações'),
    ('UUID-DO-EMPLOYEE', 'employee@wayne.com', 'Lucius Fox', 'employee', 'P&D');
```

#### **E) Insira Dados de Exemplo (Opcional)**

Execute os scripts SQL de exemplo para popular o banco:
- Recursos (equipamentos, veículos, dispositivos)
- Logs de acesso
- Atividades

### **4️⃣ Configure as Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Para obter as credenciais:**
1. No Supabase, vá em **Settings > API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### **5️⃣ Execute o Projeto**

```bash
npm run dev
# ou
yarn dev
```

Acesse: **http://localhost:3000** 🚀

---

## 🔑 Credenciais de Teste

Use uma das contas abaixo para fazer login:

### 👔 **Administrador (Acesso Total)**
- **Email:** admin@wayne.com
- **Senha:** admin123
- **Permissões:** Todas as funcionalidades

### 👨‍💼 **Gerente (Acesso Intermediário)**
- **Email:** manager@wayne.com
- **Senha:** manager123
- **Permissões:** Visualizar e gerenciar recursos

### 👷 **Funcionário (Acesso Básico)**
- **Email:** employee@wayne.com
- **Senha:** employee123
- **Permissões:** Visualizar recursos e áreas permitidas

---

## 📸 Screenshots

### 🔐 **Tela de Login**
![Login](./docs/screenshots/login.png)
*Sistema de autenticação seguro com tema Wayne Industries*

### 📊 **Dashboard Principal**
![Dashboard](./docs/screenshots/dashboard.png)
*Visão geral com estatísticas, gráficos e atividades recentes*

### 📦 **Gerenciamento de Recursos**
![Recursos](./docs/screenshots/resources.png)
*CRUD completo com filtros e busca avançada*

### 🛡️ **Controle de Segurança**
![Segurança](./docs/screenshots/security.png)
*Monitoramento de acessos e áreas restritas*

### 👤 **Perfil do Usuário**
![Perfil](./docs/screenshots/profile.png)
*Informações pessoais e estatísticas de uso*

---

## 🗄️ Estrutura do Banco de Dados

### **Tabelas Principais**

#### **1. user_profiles**
Armazena perfis e permissões dos usuários
- `id` (UUID) - Referência ao usuário do Supabase Auth
- `email` (TEXT)
- `full_name` (TEXT)
- `role` (TEXT) - employee, manager, admin
- `department` (TEXT)

#### **2. resources**
Recursos gerenciados pelo sistema
- `id` (UUID)
- `type` (TEXT) - equipment, vehicle, security_device
- `name` (TEXT)
- `description` (TEXT)
- `status` (TEXT) - available, in_use, maintenance, retired
- `location` (TEXT)
- `created_by` (UUID) - Referência ao usuário

#### **3. restricted_areas**
Áreas com acesso controlado
- `id` (UUID)
- `name` (TEXT)
- `description` (TEXT)
- `access_level` (TEXT) - employee, manager, admin
- `status` (TEXT) - active, inactive

#### **4. access_logs**
Registros de acesso às áreas
- `id` (UUID)
- `user_id` (UUID)
- `area_id` (UUID)
- `action` (TEXT) - entry, exit, denied
- `notes` (TEXT)
- `timestamp` (TIMESTAMP)

#### **5. activities**
Histórico de ações no sistema
- `id` (UUID)
- `user_id` (UUID)
- `resource_id` (UUID) - Opcional
- `action_type` (TEXT)
- `description` (TEXT)
- `timestamp` (TIMESTAMP)

---

## 🔒 Segurança Implementada

### **1. Row Level Security (RLS)**
Todas as tabelas possuem políticas RLS ativas que garantem:
- Usuários só acessam dados permitidos pelo seu nível
- Logs são protegidos contra modificação
- Recursos só podem ser editados pelo criador (ou admin)

### **2. Autenticação JWT**
- Tokens seguros fornecidos pelo Supabase Auth
- Refresh automático de sessão
- Logout com limpeza completa

### **3. Middleware de Proteção**
- Rotas protegidas por autenticação
- Redirecionamento automático
- Verificação de sessão em cada requisição

### **4. Validação de Dados**
- Validação client-side com Zod
- Validação server-side no Supabase
- Sanitização de inputs

---

## 🧪 Testes

### **Testar Localmente**

```bash
# Rodar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção localmente
npm start

# Lint
npm run lint
```

### **Cenários de Teste**

1. ✅ Login com diferentes níveis de acesso
2. ✅ Criar, editar e excluir recursos
3. ✅ Filtrar recursos por tipo e status
4. ✅ Visualizar dashboard e gráficos
5. ✅ Verificar logs de segurança
6. ✅ Testar responsividade (mobile/tablet/desktop)
7. ✅ Logout e proteção de rotas

---

## 🚀 Deploy

### **Opção 1: Vercel (Recomendado)**

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy automático! 🎉

### **Opção 2: Netlify**

1. Instale Netlify CLI: `npm install -g netlify-cli`
2. Execute: `netlify deploy`
3. Configure as variáveis de ambiente
4. Deploy!

---

## 📚 Aprendizados e Conceitos Aplicados

### **Frontend**
- ✅ Next.js App Router e Server Components
- ✅ TypeScript para tipagem forte
- ✅ React Hooks (useState, useRouter, usePathname)
- ✅ Form handling com React Hook Form
- ✅ Schema validation com Zod
- ✅ Componentização e reusabilidade
- ✅ Tailwind CSS e design system

### **Backend**
- ✅ Supabase como BaaS
- ✅ PostgreSQL e modelagem de dados
- ✅ Row Level Security (RLS)
- ✅ Autenticação e autorização
- ✅ Queries e filtros complexos

### **Boas Práticas**
- ✅ Separação de concerns (components, lib, types)
- ✅ Client vs Server Components
- ✅ Middleware para proteção de rotas
- ✅ Tratamento de erros
- ✅ Loading states e feedback visual
- ✅ Código limpo e documentado

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

## 👨‍💻 Autor

**[Seu Nome]**
- GitHub: [@Rhuam12](https://github.com/Rhuam12)
- LinkedIn: [Seu LinkedIn]
- Email: [seu.email@exemplo.com]

---

## 🎓 Projeto Acadêmico

Este projeto foi desenvolvido como trabalho de conclusão da disciplina **[Nome da Disciplina]** do curso **[Nome do Curso]** na **[Nome da Instituição]**.

**Orientador:** [Nome do Professor]  
**Período:** [Semestre/Ano]

---

## 🙏 Agradecimentos

- **Anthropic** - Pelo suporte via Claude
- **Vercel** - Pela plataforma Next.js
- **Supabase** - Pelo backend fantástico
- **Tailwind Labs** - Pelo framework CSS
- **Recharts** - Pela biblioteca de gráficos

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme que o Supabase está ativo
3. Verifique se os usuários foram criados corretamente
4. Abra uma issue no GitHub

---

<div align="center">

**Desenvolvido com 🦇 por [Seu Nome]**

⭐ Se este projeto foi útil, deixe uma estrela no GitHub!

</div>