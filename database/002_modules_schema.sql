-- ==========================================
-- WEFIT SAAS - MIGRAÇÃO 002: 6 MÓDULOS COMPLETOS
-- ==========================================

-- ==========================================
-- MÓDULO 1: MOTOR FINANCEIRO E COBRANÇA
-- ==========================================

-- 1.1 Métodos de pagamento do aluno
CREATE TABLE IF NOT EXISTS public.payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('pix', 'credit_card', 'boleto')),
    card_last_four VARCHAR(4),
    card_brand VARCHAR(50),
    card_token TEXT, -- token do gateway
    pix_key TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.2 Cobranças Pix
CREATE TABLE IF NOT EXISTS public.pix_charges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    pix_key_dynamic TEXT, -- chave copia-e-cola
    qr_code_base64 TEXT,  -- QR code em base64
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending','paid','expired','canceled')),
    expires_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.3 Cobranças em Cartão de Crédito (recorrente)
CREATE TABLE IF NOT EXISTS public.credit_card_charges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    payment_method_id UUID REFERENCES public.payment_methods(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending','authorized','paid','failed','refunded')),
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    next_retry_at TIMESTAMP WITH TIME ZONE,
    gateway_transaction_id TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.4 Caixa do balcão
CREATE TABLE IF NOT EXISTS public.cash_registers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    opened_by UUID NOT NULL REFERENCES public.profiles(id),
    closed_by UUID REFERENCES public.profiles(id),
    opening_balance DECIMAL(10,2) NOT NULL DEFAULT 0,
    closing_balance DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','closed')),
    opened_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP WITH TIME ZONE
);

-- 1.5 Transações do caixa (vendas avulsas)
CREATE TABLE IF NOT EXISTS public.cash_register_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    cash_register_id UUID NOT NULL REFERENCES public.cash_registers(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income','expense')),
    payment_method VARCHAR(30) DEFAULT 'cash',
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.6 Regras de inadimplência
CREATE TABLE IF NOT EXISTS public.delinquency_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    days_tolerance INT NOT NULL DEFAULT 5,
    action VARCHAR(50) NOT NULL DEFAULT 'block_access' CHECK (action IN ('block_access','send_reminder','both')),
    reminder_message TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.7 Log de inadimplência (bloqueios/lembretes disparados)
CREATE TABLE IF NOT EXISTS public.delinquency_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id),
    action_taken VARCHAR(50) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1.8 Notas Fiscais (NFS-e)
CREATE TABLE IF NOT EXISTS public.nfse_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id),
    nfse_number VARCHAR(50),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending','issued','canceled','error')),
    xml_content TEXT,
    pdf_url TEXT,
    issued_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- MÓDULO 2: MÁQUINA DE VENDAS E CRM
-- ==========================================

-- 2.1 Atividades/interações com lead
CREATE TABLE IF NOT EXISTS public.lead_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('call','whatsapp','email','visit','trial_class','follow_up','note')),
    description TEXT,
    performed_by UUID REFERENCES public.profiles(id),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.2 Metas de vendas
CREATE TABLE IF NOT EXISTS public.sales_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    consultant_id UUID REFERENCES public.profiles(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    target_revenue DECIMAL(10,2),
    target_enrollments INT,
    actual_revenue DECIMAL(10,2) DEFAULT 0,
    actual_enrollments INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- MÓDULO 3: OPERAÇÃO E CONTROLE DE ACESSO
-- ==========================================

-- 3.1 Dispositivos de acesso (catracas, totens)
CREATE TABLE IF NOT EXISTS public.access_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('turnstile','door','totem')),
    location VARCHAR(255),
    serial_number VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3.2 Log de acessos (check-in)
CREATE TABLE IF NOT EXISTS public.access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    device_id UUID REFERENCES public.access_devices(id),
    method VARCHAR(30) NOT NULL CHECK (method IN ('qr_code','biometric','facial','manual','card')),
    status VARCHAR(20) DEFAULT 'granted' CHECK (status IN ('granted','denied','blocked')),
    denied_reason TEXT,
    checked_in_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3.3 Grade de aulas recorrentes
CREATE TABLE IF NOT EXISTS public.class_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    instructor_id UUID REFERENCES public.profiles(id),
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Dom, 6=Sáb
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INT NOT NULL DEFAULT 20,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3.4 Reservas de aula (bookings + fila de espera)
CREATE TABLE IF NOT EXISTS public.class_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    class_schedule_id UUID NOT NULL REFERENCES public.class_schedules(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'booked' CHECK (status IN ('booked','checked_in','canceled','no_show','waitlist')),
    waitlist_position INT,
    booked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3.5 Contratos digitais
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.subscriptions(id),
    plan_id UUID REFERENCES public.plans(id),
    content TEXT NOT NULL, -- conteúdo do contrato em HTML/markdown
    signed_at TIMESTAMP WITH TIME ZONE,
    signature_ip VARCHAR(50),
    signature_hash TEXT, -- hash da assinatura digital
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','signed','canceled')),
    valid_from DATE,
    valid_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- MÓDULO 5: ÁREA TÉCNICA (PROFESSORES)
-- (Criado ANTES do Módulo 4 pois workout_logs depende de workouts)
-- ==========================================

-- 5.1 Catálogo de exercícios
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE, -- NULL = exercício global
    name VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(100),
    equipment VARCHAR(100),
    description TEXT,
    video_url TEXT,
    gif_url TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.2 Fichas de treino
CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES public.profiles(id),
    name VARCHAR(100) NOT NULL, -- "Treino A", "Treino B"
    description TEXT,
    is_template BOOLEAN DEFAULT false, -- se true, é um modelo padronizado
    valid_from DATE,
    valid_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.3 Exercícios dentro de cada ficha
CREATE TABLE IF NOT EXISTS public.workout_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id),
    order_index INT NOT NULL DEFAULT 0,
    sets INT NOT NULL DEFAULT 3,
    reps VARCHAR(20) NOT NULL DEFAULT '12', -- pode ser "12" ou "8-12" ou "até falha"
    weight VARCHAR(20), -- "20kg" ou "progressivo"
    rest_seconds INT DEFAULT 60,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.4 Avaliações físicas completas
CREATE TABLE IF NOT EXISTS public.physical_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES public.profiles(id),
    assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    -- Antropometria
    weight_kg DECIMAL(5,2),
    height_cm DECIMAL(5,1),
    body_fat_pct DECIMAL(5,2),
    lean_mass_kg DECIMAL(5,2),
    bmi DECIMAL(5,2),
    -- Dobras cutâneas (mm)
    chest_fold DECIMAL(5,1),
    abdominal_fold DECIMAL(5,1),
    thigh_fold DECIMAL(5,1),
    triceps_fold DECIMAL(5,1),
    suprailiac_fold DECIMAL(5,1),
    subscapular_fold DECIMAL(5,1),
    midaxillary_fold DECIMAL(5,1),
    -- Circunferências (cm)
    chest_circ DECIMAL(5,1),
    waist_circ DECIMAL(5,1),
    hip_circ DECIMAL(5,1),
    arm_right_circ DECIMAL(5,1),
    arm_left_circ DECIMAL(5,1),
    thigh_right_circ DECIMAL(5,1),
    thigh_left_circ DECIMAL(5,1),
    calf_right_circ DECIMAL(5,1),
    calf_left_circ DECIMAL(5,1),
    -- Bioimpedância
    bioimpedance_data JSONB,
    -- Anamnese
    anamnesis TEXT,
    objectives TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5.5 Fotos de evolução
CREATE TABLE IF NOT EXISTS public.assessment_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES public.physical_assessments(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    angle VARCHAR(30) CHECK (angle IN ('front','back','left','right')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- MÓDULO 4: EXPERIÊNCIA DO ALUNO
-- (Depois do Módulo 5 pois workout_logs referencia workouts)
-- ==========================================

-- 4.1 Log de treinos executados
CREATE TABLE IF NOT EXISTS public.workout_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    workout_id UUID REFERENCES public.workouts(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5)
);

-- 4.2 Pontuação de gamificação
CREATE TABLE IF NOT EXISTS public.gamification_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    points INT NOT NULL DEFAULT 0,
    reason VARCHAR(100) NOT NULL,
    reference_type VARCHAR(50), -- 'checkin', 'workout', 'streak'
    reference_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4.3 Badges de gamificação
CREATE TABLE IF NOT EXISTS public.gamification_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url TEXT,
    points_required INT DEFAULT 0,
    criteria_type VARCHAR(50), -- 'checkins', 'workouts', 'streak', 'custom'
    criteria_value INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4.4 Badges conquistados pelos alunos
CREATE TABLE IF NOT EXISTS public.student_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES public.gamification_badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4.5 Notificações do aluno (push/in-app)
CREATE TABLE IF NOT EXISTS public.student_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(30) DEFAULT 'info' CHECK (type IN ('info','payment','motivation','class','system')),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- MÓDULO 6: ARQUITETURA ABERTA (ECOSSISTEMA)
-- ==========================================

-- 6.1 API Keys para clientes
CREATE TABLE IF NOT EXISTS public.api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    key_hash TEXT NOT NULL, -- hash da chave (nunca armazenar em texto puro)
    key_prefix VARCHAR(10) NOT NULL, -- primeiros caracteres para identificação
    permissions JSONB DEFAULT '["read"]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6.2 Assinaturas de Webhook
CREATE TABLE IF NOT EXISTS public.webhook_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    events TEXT[] NOT NULL, -- ex: {'student.created', 'payment.received'}
    secret TEXT, -- para validação HMAC
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6.3 Log de disparos de Webhook
CREATE TABLE IF NOT EXISTS public.webhook_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    subscription_id UUID NOT NULL REFERENCES public.webhook_subscriptions(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    response_status INT,
    response_body TEXT,
    attempt INT DEFAULT 1,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- ATIVAR RLS EM TODAS AS NOVAS TABELAS
-- ==========================================

ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pix_charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_card_charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_registers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_register_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delinquency_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delinquency_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfse_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gamification_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.physical_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;


-- ==========================================
-- POLÍTICAS RLS (ISOLAMENTO POR TENANT)
-- ==========================================

-- Todas seguem o mesmo padrão: tenant_id = get_my_tenant_id()
CREATE POLICY "tenant_isolation" ON public.payment_methods FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.pix_charges FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.credit_card_charges FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.cash_registers FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.cash_register_transactions FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.delinquency_rules FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.delinquency_logs FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.nfse_invoices FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.lead_activities FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.sales_goals FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.access_devices FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.access_logs FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.class_schedules FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.class_bookings FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.contracts FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.workout_logs FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.gamification_points FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.gamification_badges FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.student_badges FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.student_notifications FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.exercises FOR ALL USING (tenant_id = public.get_my_tenant_id() OR tenant_id IS NULL);
CREATE POLICY "tenant_isolation" ON public.workouts FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.workout_exercises FOR ALL USING (
    workout_id IN (SELECT id FROM public.workouts WHERE tenant_id = public.get_my_tenant_id())
);
CREATE POLICY "tenant_isolation" ON public.physical_assessments FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.assessment_photos FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.api_keys FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.webhook_subscriptions FOR ALL USING (tenant_id = public.get_my_tenant_id());
CREATE POLICY "tenant_isolation" ON public.webhook_logs FOR ALL USING (tenant_id = public.get_my_tenant_id());


-- ==========================================
-- ÍNDICES PARA PERFORMANCE
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_access_logs_student ON public.access_logs(student_id, checked_in_at DESC);
CREATE INDEX IF NOT EXISTS idx_class_bookings_date ON public.class_bookings(class_schedule_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON public.leads(tenant_id, pipeline_stage_id);
CREATE INDEX IF NOT EXISTS idx_workout_logs_student ON public.workout_logs(student_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_gamification_points_student ON public.gamification_points(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_student ON public.student_notifications(student_id, is_read);
