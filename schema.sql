-- =====================================================
-- WAYNE INDUSTRIES - SISTEMA DE GERENCIAMENTO
-- Script de Configuração do Banco de Dados Supabase
-- =====================================================

-- Habilita a extensão UUID (caso não esteja habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABELA: user_profiles
-- Armazena informações adicionais dos usuários
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('employee', 'manager', 'admin')),
    department TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- TABELA: resources
-- Armazena equipamentos, veículos e dispositivos
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('equipment', 'vehicle', 'security_device')),
    name TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('available', 'in_use', 'maintenance', 'retired')),
    location TEXT,
    image_url TEXT,
    created_by UUID NOT NULL REFERENCES public.user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- TABELA: restricted_areas
-- Armazena áreas restritas do sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS public.restricted_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    required_access_level TEXT NOT NULL CHECK (required_access_level IN ('employee', 'manager', 'admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- TABELA: access_logs
-- Registra entradas e saídas de áreas restritas
-- =====================================================
CREATE TABLE IF NOT EXISTS public.access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id),
    area_id UUID NOT NULL REFERENCES public.restricted_areas(id),
    action TEXT NOT NULL CHECK (action IN ('entry', 'exit', 'denied')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    notes TEXT
);

-- =====================================================
-- TABELA: activities
-- Registra todas as atividades do sistema
-- =====================================================
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id),
    resource_id UUID REFERENCES public.resources(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- =====================================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_resources_created_by ON public.resources(created_by);
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_status ON public.resources(status);
CREATE INDEX IF NOT EXISTS idx_access_logs_user_id ON public.access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_area_id ON public.access_logs(area_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_timestamp ON public.access_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON public.activities(timestamp);

-- =====================================================
-- POLÍTICAS RLS (Row Level Security)
-- =====================================================

-- Habilita RLS em todas as tabelas
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restricted_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- USER_PROFILES: Todos podem ver, apenas o próprio usuário pode atualizar
CREATE POLICY "Todos podem ver perfis"
    ON public.user_profiles FOR SELECT
    USING (true);

CREATE POLICY "Usuários podem atualizar próprio perfil"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id);

-- RESOURCES: Todos podem ver, autenticados podem criar, apenas o criador ou admin pode atualizar/deletar
CREATE POLICY "Todos podem ver recursos"
    ON public.resources FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem criar recursos"
    ON public.resources FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Criador ou admin podem atualizar recursos"
    ON public.resources FOR UPDATE
    USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Criador ou admin podem deletar recursos"
    ON public.resources FOR DELETE
    USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RESTRICTED_AREAS: Todos podem ver, apenas admin pode modificar
CREATE POLICY "Todos podem ver áreas restritas"
    ON public.restricted_areas FOR SELECT
    USING (true);

CREATE POLICY "Apenas admin pode gerenciar áreas"
    ON public.restricted_areas FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ACCESS_LOGS: Todos podem ver, autenticados podem criar
CREATE POLICY "Todos podem ver logs de acesso"
    ON public.access_logs FOR SELECT
    USING (true);

CREATE POLICY "Sistema pode criar logs de acesso"
    ON public.access_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ACTIVITIES: Todos podem ver, sistema pode criar
CREATE POLICY "Todos podem ver atividades"
    ON public.activities FOR SELECT
    USING (true);

CREATE POLICY "Sistema pode criar atividades"
    ON public.activities FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- FUNÇÃO: Atualizar updated_at automaticamente
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restricted_areas_updated_at
    BEFORE UPDATE ON public.restricted_areas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

------------------------------------------------------------
-- Substitua os IDs pelos UUIDs que você copiou
INSERT INTO public.user_profiles (id, email, full_name, role, department) VALUES
    ('4323e1e9-210a-4b13-ad6b-e4b842779a9a', 'admin@wayne.com', 'Bruce Wayne', 'admin', 'Diretoria'),
    ('dbc7e3ac-5947-4d4d-8b84-078c599aa558', 'manager@wayne.com', 'Alfred Pennyworth', 'manager', 'Operações'),
    ('fc23b83b-64db-4294-a55b-df488727cf7c', 'employee@wayne.com', 'Lucius Fox', 'employee', 'P&D');

------------------------------------------------------------
INSERT INTO public.resources (type, name, description, status, location, created_by) VALUES
    ('equipment', 'Batcomputer', 'Supercomputador principal da Batcaverna', 'available', 'Batcaverna', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('equipment', 'Traje do Batman', 'Armadura reforçada com kevlar', 'in_use', 'Armário Principal', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('equipment', 'Batarangue', 'Arsenal de batarangues diversos', 'available', 'Arsenal', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('equipment', 'Cinto de Utilidades', 'Cinto com diversos gadgets', 'in_use', 'Armário Principal', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    
    ('vehicle', 'Batmóvel', 'Veículo blindado principal', 'available', 'Garagem Principal', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('vehicle', 'Batmoto', 'Motocicleta de alta velocidade', 'in_use', 'Garagem Principal', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('vehicle', 'Batwing', 'Aeronave de combate', 'maintenance', 'Hangar', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('vehicle', 'Bat-submarino', 'Veículo aquático', 'available', 'Doca Subterrânea', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    
    ('security_device', 'Sistema de Vigilância', 'Rede de câmeras de segurança', 'available', 'Sala de Controle', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('security_device', 'Scanner de Retina', 'Sistema de identificação biométrica', 'available', 'Entrada Principal', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('security_device', 'Detector de Movimento', 'Sensores infravermelhos', 'available', 'Perímetro Externo', '4323e1e9-210a-4b13-ad6b-e4b842779a9a'),
    ('security_device', 'Sistema de Alarme', 'Central de alarmes', 'available', 'Sala de Controle', '4323e1e9-210a-4b13-ad6b-e4b842779a9a');