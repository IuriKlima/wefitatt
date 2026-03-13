-- ==========================================
-- WEFIT SAAS - SCRIPT DE CRIAÇÃO DO BANCO (SUPABASE)
-- ==========================================

-- Extensão necessária para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. TABELAS DE SISTEMA (BASE MULTI-TENANT)
-- ==========================================

-- 1.1 Tabela de Unidades (Academias/Tenants)
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    document_cnpj VARCHAR(20),
    subdomain VARCHAR(100) UNIQUE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.2 Tabela de Perfis de Usuário (Integrada com o auth.users do Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'aluno', -- admin, gestor, instrutor, recepcionista, aluno
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    document_cpf VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Função otimizada para buscar o tenant do usuário logado e ler no RLS
CREATE OR REPLACE FUNCTION public.get_my_tenant_id()
RETURNS UUID
LANGUAGE sql SECURITY DEFINER STABLE
AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$;


-- ==========================================
-- 2. GESTÃO FINANCEIRA
-- ==========================================

-- 2.1 Planos Disponíveis
CREATE TABLE IF NOT EXISTS public.plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    billing_cycle VARCHAR(50) DEFAULT 'mensal', -- mensal, trimestral, anual
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.2 Assinaturas / Matrículas
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES public.plans(id),
    status VARCHAR(50) DEFAULT 'active', -- active, past_due, canceled
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.3 Faturas / Pagamentos
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- paid, pending, overdue
    due_date DATE NOT NULL,
    payment_method VARCHAR(50), -- pix, credit_card, boleto
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- 3. AGENDAMENTO E COMERCIAL
-- ==========================================

-- 3.1 Funil de Etapas (CRM)
CREATE TABLE IF NOT EXISTS public.pipeline_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3.2 Oportunidades (Leads)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    source VARCHAR(100), -- whatsapp, instagram, site
    pipeline_stage_id UUID REFERENCES public.pipeline_stages(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- 4. POLÍTICAS DE SEGURANÇA (RLS - ROW LEVEL SECURITY)
-- ==========================================

-- Ativar RLS nas tabelas
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4.1 Políticas de Profiles (Lê se for do mesmo tenant ou a própria conta)
CREATE POLICY "Profiles do mesmo tenant" ON public.profiles
    FOR SELECT USING (
        tenant_id = public.get_my_tenant_id() OR id = auth.uid()
    );

-- 4.2 Restantes (Sempre isola pelo tenant_id do usuário)
CREATE POLICY "Leitura de Planos (Tenant Isolado)" ON public.plans
    FOR ALL USING (tenant_id = public.get_my_tenant_id());

CREATE POLICY "Leitura de Assinaturas (Tenant Isolado)" ON public.subscriptions
    FOR ALL USING (tenant_id = public.get_my_tenant_id() OR student_id = auth.uid());

CREATE POLICY "Leitura de Faturas (Tenant Isolado)" ON public.invoices
    FOR ALL USING (tenant_id = public.get_my_tenant_id());

CREATE POLICY "Leitura de Etapas do CRM (Tenant Isolado)" ON public.pipeline_stages
    FOR ALL USING (tenant_id = public.get_my_tenant_id());

CREATE POLICY "Leitura de Leads (Tenant Isolado)" ON public.leads
    FOR ALL USING (tenant_id = public.get_my_tenant_id());

-- ==========================================
-- 5. DADOS DE APRESENTAÇÃO (GERA UM TENANT DEMO PARA INÍCIO IMEDIATO)
-- ==========================================

INSERT INTO public.tenants (id, name, document_cnpj, subdomain) 
VALUES ('11111111-1111-1111-1111-111111111111', 'WeFit Matriz (Demo)', '00.000.000/0001-00', 'wefit-matriz')
ON CONFLICT DO NOTHING;
