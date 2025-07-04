
-- =====================================================
-- WEFIT - Sistema SaaS para Gestão de Academias
-- Backend Completo com PostgreSQL + Supabase
-- =====================================================

-- Configurações iniciais
SET timezone = 'UTC';

-- =====================================================
-- TIPOS ENUM
-- =====================================================

-- Tipos de usuários no sistema
CREATE TYPE user_role AS ENUM (
    'proprietario',
    'gestor', 
    'recepcionista',
    'professor',
    'aluno'
);

-- Status geral
CREATE TYPE status_type AS ENUM (
    'active',
    'inactive',
    'suspended',
    'pending'
);

-- Tipos de planos SaaS
CREATE TYPE saas_plan_type AS ENUM (
    'personal',
    'studio',
    'rede'
);

-- Tipos de aula
CREATE TYPE class_type AS ENUM (
    'musculacao',
    'funcional',
    'yoga',
    'pilates',
    'crossfit',
    'spinning',
    'danca',
    'natacao',
    'luta',
    'outros'
);

-- Status de pagamento
CREATE TYPE payment_status AS ENUM (
    'pending',
    'paid',
    'failed',
    'refunded',
    'cancelled'
);

-- Métodos de pagamento
CREATE TYPE payment_method AS ENUM (
    'credit_card',
    'debit_card',
    'pix',
    'boleto',
    'cash',
    'transfer'
);

-- Tipos de notificação
CREATE TYPE notification_type AS ENUM (
    'whatsapp',
    'email',
    'sms',
    'push'
);

-- =====================================================
-- TABELAS DE AUTENTICAÇÃO E ACESSO
-- =====================================================

-- Tabela de perfis de usuário (vinculada ao Supabase Auth)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    cpf TEXT UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de roles/funções
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name user_role NOT NULL UNIQUE,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para associar usuários a roles
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    company_id INTEGER, -- Será referenciado depois
    branch_id INTEGER,  -- Será referenciado depois
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role_id, company_id, branch_id)
);

-- =====================================================
-- TABELAS DE EMPRESA E MULTI-TENANT
-- =====================================================

-- Tabela de empresas (clientes SaaS)
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    email TEXT,
    phone TEXT,
    address JSONB,
    logo_url TEXT,
    owner_id UUID REFERENCES profiles(id),
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de unidades/filiais
CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address JSONB,
    phone TEXT,
    email TEXT,
    operating_hours JSONB,
    capacity INTEGER DEFAULT 50,
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Planos SaaS contratados
CREATE TABLE company_plans (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    plan_type saas_plan_type NOT NULL,
    max_branches INTEGER DEFAULT 1,
    max_students INTEGER DEFAULT 100,
    max_staff INTEGER DEFAULT 10,
    price DECIMAL(10,2),
    billing_cycle TEXT DEFAULT 'monthly',
    features JSONB DEFAULT '{}',
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Histórico de assinaturas/pagamentos SaaS
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES company_plans(id),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'BRL',
    payment_method payment_method,
    status payment_status DEFAULT 'pending',
    paid_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELAS DE PESSOAS
-- =====================================================

-- Funcionários da academia
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    branch_id INTEGER REFERENCES branches(id) ON DELETE SET NULL,
    employee_id TEXT,
    position TEXT,
    salary DECIMAL(10,2),
    hire_date DATE,
    specialties TEXT[],
    cref TEXT,
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alunos da academia
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    branch_id INTEGER REFERENCES branches(id) ON DELETE SET NULL,
    student_code TEXT,
    birth_date DATE,
    gender TEXT,
    emergency_contact JSONB,
    medical_info JSONB,
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Perfis detalhados dos alunos
CREATE TABLE student_profiles (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    goal TEXT,
    physical_limitations TEXT,
    experience_level TEXT,
    preferences JSONB,
    body_measurements JSONB,
    medical_clearance BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELAS DE AULAS E AGENDAMENTO
-- =====================================================

-- Tipos de aula disponíveis
CREATE TABLE class_types (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category class_type,
    description TEXT,
    duration_minutes INTEGER DEFAULT 60,
    max_participants INTEGER DEFAULT 20,
    equipment_needed TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aulas agendadas
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    branch_id INTEGER REFERENCES branches(id) ON DELETE CASCADE,
    class_type_id INTEGER REFERENCES class_types(id),
    instructor_id INTEGER REFERENCES staff(id),
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    max_participants INTEGER DEFAULT 20,
    room TEXT,
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inscrições de alunos nas aulas
CREATE TABLE class_students (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'enrolled',
    UNIQUE(class_id, student_id)
);

-- Registro de presença
CREATE TABLE class_attendance (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    attended BOOLEAN DEFAULT FALSE,
    check_in_time TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELAS DE TREINO E EXERCÍCIOS
-- =====================================================

-- Lista de exercícios disponíveis
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    muscle_groups TEXT[],
    equipment TEXT[],
    instructions TEXT,
    video_url TEXT,
    image_url TEXT,
    difficulty_level INTEGER DEFAULT 1,
    is_global BOOLEAN DEFAULT TRUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    created_by INTEGER REFERENCES staff(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fichas de treino
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    instructor_id INTEGER REFERENCES staff(id),
    title TEXT NOT NULL,
    description TEXT,
    goal TEXT,
    frequency_per_week INTEGER DEFAULT 3,
    duration_weeks INTEGER DEFAULT 4,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exercícios em cada ficha
CREATE TABLE workout_exercises (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INTEGER REFERENCES exercises(id) ON DELETE CASCADE,
    sets INTEGER DEFAULT 3,
    reps TEXT, -- Ex: "12-15" ou "até falha"
    weight DECIMAL(5,2),
    rest_seconds INTEGER DEFAULT 60,
    order_position INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progresso do aluno
CREATE TABLE student_progress (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    workout_id INTEGER REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INTEGER REFERENCES exercises(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    sets_completed INTEGER,
    reps_completed TEXT,
    weight_used DECIMAL(5,2),
    duration_minutes INTEGER,
    difficulty_rating INTEGER, -- 1-5
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELAS FINANCEIRAS
-- =====================================================

-- Planos oferecidos aos alunos
CREATE TABLE student_plans (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT, -- mensalidade, combo, day_pass
    price DECIMAL(10,2) NOT NULL,
    duration_days INTEGER DEFAULT 30,
    class_credits INTEGER,
    features JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pagamentos dos alunos
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES student_plans(id),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'BRL',
    payment_method payment_method,
    status payment_status DEFAULT 'pending',
    due_date DATE,
    paid_at TIMESTAMPTZ,
    transaction_id TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Faturas geradas
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status payment_status DEFAULT 'pending',
    due_date DATE,
    paid_at TIMESTAMPTZ,
    items JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Descontos e promoções
CREATE TABLE discounts (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    type TEXT, -- percentage, fixed_amount
    value DECIMAL(10,2),
    min_amount DECIMAL(10,2),
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from DATE,
    valid_until DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELAS DE INTEGRAÇÕES E IA
-- =====================================================

-- Sessões do chatbot TalkMate
CREATE TABLE chatbot_sessions (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    phone_number TEXT,
    session_id TEXT NOT NULL,
    messages JSONB,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sistema de notificações
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    recipient TEXT, -- phone, email, etc
    status TEXT DEFAULT 'pending',
    sent_at TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Integrações com APIs externas
CREATE TABLE integrations (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL, -- whatsapp, stripe, google_calendar
    config JSONB,
    credentials JSONB, -- Criptografado
    is_active BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhooks recebidos
CREATE TABLE webhooks (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    source TEXT NOT NULL, -- catraca, calendario, pagamento
    event_type TEXT,
    payload JSONB,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABELAS DE SISTEMA E SEGURANÇA
-- =====================================================

-- Logs de auditoria
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT,
    record_id TEXT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Histórico de logins
CREATE TABLE login_history (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    device_info JSONB,
    success BOOLEAN DEFAULT TRUE,
    failure_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ADICIONANDO FOREIGN KEYS QUE DEPENDEM DE OUTRAS TABELAS
-- =====================================================

-- Adicionar referências que dependem de tabelas criadas posteriormente
ALTER TABLE user_roles ADD CONSTRAINT fk_user_roles_company 
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE;

ALTER TABLE user_roles ADD CONSTRAINT fk_user_roles_branch 
    FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL;

-- =====================================================
-- INSERIR DADOS INICIAIS
-- =====================================================

-- Inserir roles padrão
INSERT INTO roles (name, description, permissions) VALUES 
('proprietario', 'Proprietário da empresa', '{"all": true}'),
('gestor', 'Gestor de unidade', '{"branch_management": true, "student_management": true, "staff_management": true}'),
('recepcionista', 'Recepcionista', '{"student_checkin": true, "class_booking": true}'),
('professor', 'Professor/Instrutor', '{"workout_creation": true, "student_progress": true, "class_management": true}'),
('aluno', 'Aluno da academia', '{"profile_view": true, "class_booking": true, "workout_view": true}');

-- =====================================================
-- TRIGGERS PARA TIMESTAMPS AUTOMÁTICOS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers nas tabelas com updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chatbot_sessions_updated_at BEFORE UPDATE ON chatbot_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para consultas frequentes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_user_roles_user_company ON user_roles(user_id, company_id);
CREATE INDEX idx_branches_company ON branches(company_id);
CREATE INDEX idx_staff_company_branch ON staff(company_id, branch_id);
CREATE INDEX idx_students_company_branch ON students(company_id, branch_id);
CREATE INDEX idx_classes_branch_date ON classes(branch_id, start_time);
CREATE INDEX idx_workouts_student ON workouts(student_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_audit_logs_company_user ON audit_logs(company_id, user_id);

-- =====================================================
-- COMENTÁRIOS FINAIS
-- =====================================================

COMMENT ON DATABASE postgres IS 'WeFit SaaS - Sistema de Gestão para Academias';
