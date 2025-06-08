
-- =====================================================
-- WEFIT - Sistema Inteligente para Academias
-- Esquema de Banco de Dados PostgreSQL
-- =====================================================

-- Configurações iniciais
SET timezone = 'UTC';

-- =====================================================
-- TIPOS ENUM
-- =====================================================

-- Tipos de usuários no sistema
CREATE TYPE user_role AS ENUM (
    'admin',
    'gestor', 
    'instrutor',
    'recepcionista',
    'aluno'
);

-- Status dos usuários
CREATE TYPE user_status AS ENUM (
    'active',
    'inactive',
    'pending_verification'
);

-- Status das unidades/academias
CREATE TYPE unit_status AS ENUM (
    'active',
    'inactive'
);

-- Tipos de planos de assinatura
CREATE TYPE plan_type AS ENUM (
    'mensal',
    'trimestral',
    'anual',
    'pacote_aulas'
);

-- Status das assinaturas
CREATE TYPE subscription_status AS ENUM (
    'active',
    'paused',
    'canceled',
    'expired'
);

-- Níveis de dificuldade dos exercícios
CREATE TYPE exercise_difficulty AS ENUM (
    'iniciante',
    'intermediario',
    'avancado'
);

-- Escopo dos exercícios (global, por unidade ou pessoal)
CREATE TYPE exercise_scope AS ENUM (
    'global',
    'unit',
    'personal'
);

-- Status dos agendamentos de aulas
CREATE TYPE booking_status AS ENUM (
    'confirmed',
    'canceled',
    'waitlisted',
    'attended'
);

-- Métodos de pagamento
CREATE TYPE payment_method AS ENUM (
    'credit_card',
    'boleto',
    'pix',
    'cash'
);

-- Status dos pagamentos
CREATE TYPE payment_status AS ENUM (
    'paid',
    'pending',
    'failed',
    'refunded'
);

-- Status dos feedbacks
CREATE TYPE feedback_status AS ENUM (
    'received',
    'in_analysis',
    'resolved'
);

-- =====================================================
-- FUNÇÃO PARA ATUALIZAR TIMESTAMP AUTOMATICAMENTE
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- MÓDULO CENTRAL: USUÁRIOS, ACADEMIAS E AUTENTICAÇÃO
-- =====================================================

-- Tabela de unidades/academias
CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    address_street VARCHAR(255),
    address_number VARCHAR(10),
    address_complement VARCHAR(100),
    address_neighborhood VARCHAR(100),
    address_city VARCHAR(100),
    address_state VARCHAR(2),
    address_zip_code VARCHAR(9),
    main_phone VARCHAR(20),
    main_email VARCHAR(255),
    logo_url VARCHAR(500),
    status unit_status NOT NULL DEFAULT 'active',
    operating_hours JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE units IS 'Armazena as informações de cada academia/unidade da rede Wefit';
COMMENT ON COLUMN units.cnpj IS 'CNPJ da unidade no formato XX.XXX.XXX/XXXX-XX';
COMMENT ON COLUMN units.operating_hours IS 'Horários de funcionamento em formato JSON. Ex: {"weekday": "06:00-22:00", "saturday": "08:00-14:00"}';

-- Tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    phone_number VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    date_of_birth DATE,
    profile_picture_url VARCHAR(500),
    status user_status NOT NULL DEFAULT 'pending_verification',
    unit_id INTEGER REFERENCES units(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE users IS 'Armazena todos os tipos de usuários da plataforma (admin, gestor, instrutor, recepcionista, aluno)';
COMMENT ON COLUMN users.cpf IS 'CPF do usuário no formato XXX.XXX.XXX-XX';
COMMENT ON COLUMN users.unit_id IS 'Referência à academia que o usuário pertence. Nulo para administradores globais';

-- Tabela de tokens de refresh/sessões
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE user_sessions IS 'Armazena tokens de refresh para autenticação segura e controle de sessões';

-- =====================================================
-- MÓDULO DE PLANOS E ASSINATURAS
-- =====================================================

-- Tabela de planos de assinatura
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type plan_type NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    trial_period_days INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE plans IS 'Armazena os modelos de planos de assinatura criados por gestores ou administradores';
COMMENT ON COLUMN plans.is_public IS 'Define se o plano pode ser visualizado e contratado pelos alunos';
COMMENT ON COLUMN plans.unit_id IS 'Referência à academia. Nulo para planos globais criados pelo administrador';

-- Tabela de assinaturas dos alunos
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER NOT NULL REFERENCES plans(id) ON DELETE RESTRICT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    next_billing_date DATE,
    status subscription_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT subscriptions_user_role_check 
        CHECK ((SELECT role FROM users WHERE id = user_id) = 'aluno')
);

COMMENT ON TABLE subscriptions IS 'Vincula alunos aos planos de assinatura contratados';
COMMENT ON COLUMN subscriptions.end_date IS 'Data de término da assinatura. Nulo para assinaturas sem data definida';

-- =====================================================
-- MÓDULO DE TREINOS E ACOMPANHAMENTO
-- =====================================================

-- Tabela de exercícios
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    media_url VARCHAR(500),
    muscle_group_primary VARCHAR(100),
    muscle_groups_secondary VARCHAR(255)[],
    equipment_needed VARCHAR(255)[],
    difficulty exercise_difficulty NOT NULL,
    created_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    scope exercise_scope NOT NULL,
    unit_id INTEGER REFERENCES units(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT exercises_scope_unit_check 
        CHECK ((scope != 'unit') OR (unit_id IS NOT NULL))
);

COMMENT ON TABLE exercises IS 'Biblioteca de exercícios disponíveis no sistema';
COMMENT ON COLUMN exercises.media_url IS 'URL para foto, GIF ou vídeo demonstrativo do exercício';
COMMENT ON COLUMN exercises.muscle_groups_secondary IS 'Array de grupos musculares secundários trabalhados';
COMMENT ON COLUMN exercises.equipment_needed IS 'Array de equipamentos necessários para o exercício';
COMMENT ON COLUMN exercises.scope IS 'Define o escopo: global (todos), unit (uma academia) ou personal (instrutor específico)';

-- Tabela de planos de treino
CREATE TABLE workout_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT workout_plans_creator_role_check 
        CHECK ((SELECT role FROM users WHERE id = created_by_user_id) = 'instrutor')
);

COMMENT ON TABLE workout_plans IS 'Modelos de treinos criados pelos instrutores';

-- Tabela de junção entre planos de treino e exercícios
CREATE TABLE workout_plan_exercises (
    workout_plan_id INTEGER NOT NULL REFERENCES workout_plans(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    sets INTEGER,
    reps VARCHAR(50),
    rest_time_seconds INTEGER,
    order_in_plan INTEGER NOT NULL,
    
    PRIMARY KEY (workout_plan_id, exercise_id, order_in_plan)
);

COMMENT ON TABLE workout_plan_exercises IS 'Relaciona exercícios aos planos de treino com suas configurações específicas';
COMMENT ON COLUMN workout_plan_exercises.reps IS 'Repetições do exercício. Ex: "10-12", "até a falha"';
COMMENT ON COLUMN workout_plan_exercises.order_in_plan IS 'Ordem de execução do exercício no plano de treino';

-- Tabela de treinos atribuídos aos alunos
CREATE TABLE assigned_workouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    workout_plan_id INTEGER REFERENCES workout_plans(id) ON DELETE SET NULL,
    assigned_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT assigned_workouts_user_role_check 
        CHECK ((SELECT role FROM users WHERE id = user_id) = 'aluno'),
    CONSTRAINT assigned_workouts_instructor_role_check 
        CHECK ((SELECT role FROM users WHERE id = assigned_by_user_id) = 'instrutor')
);

COMMENT ON TABLE assigned_workouts IS 'Vincula planos de treino aos alunos com período de validade';

-- Tabela de logs de treinos dos alunos
CREATE TABLE workout_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    workout_plan_id INTEGER REFERENCES workout_plans(id) ON DELETE SET NULL,
    log_date TIMESTAMP WITH TIME ZONE NOT NULL,
    sets_completed INTEGER,
    reps_completed INTEGER,
    weight_used DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE workout_logs IS 'Registra os treinos executados pelos alunos com detalhes de performance';
COMMENT ON COLUMN workout_logs.weight_used IS 'Peso utilizado no exercício em quilogramas';

-- =====================================================
-- MÓDULO DE AULAS E AGENDAMENTOS
-- =====================================================

-- Tabela de aulas coletivas
CREATE TABLE group_classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    capacity INTEGER NOT NULL,
    room VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT group_classes_instructor_role_check 
        CHECK ((SELECT role FROM users WHERE id = instructor_id) = 'instrutor'),
    CONSTRAINT group_classes_time_check 
        CHECK (end_time > start_time),
    CONSTRAINT group_classes_capacity_check 
        CHECK (capacity > 0)
);

COMMENT ON TABLE group_classes IS 'Aulas coletivas da grade horária das academias';
COMMENT ON COLUMN group_classes.capacity IS 'Número máximo de alunos que podem participar da aula';

-- Tabela de agendamentos de aulas
CREATE TABLE class_bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    class_id INTEGER NOT NULL REFERENCES group_classes(id) ON DELETE CASCADE,
    booking_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status booking_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE (user_id, class_id),
    CONSTRAINT class_bookings_user_role_check 
        CHECK ((SELECT role FROM users WHERE id = user_id) = 'aluno')
);

COMMENT ON TABLE class_bookings IS 'Agendamentos dos alunos nas aulas coletivas';
COMMENT ON COLUMN class_bookings.booking_time IS 'Timestamp de quando o agendamento foi realizado';

-- =====================================================
-- MÓDULO FINANCEIRO E OPERACIONAL
-- =====================================================

-- Tabela de pagamentos
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method payment_method NOT NULL,
    status payment_status NOT NULL,
    transaction_id VARCHAR(255),
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT payments_amount_check CHECK (amount > 0)
);

COMMENT ON TABLE payments IS 'Registra todas as transações financeiras do sistema';
COMMENT ON COLUMN payments.transaction_id IS 'ID fornecido pelo gateway de pagamento';
COMMENT ON COLUMN payments.subscription_id IS 'Referência à assinatura relacionada. Nulo para pagamentos avulsos';

-- Tabela de feedbacks
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    unit_id INTEGER NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    status feedback_status NOT NULL DEFAULT 'received',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE feedback IS 'Feedbacks e avaliações enviados pelos usuários sobre as academias';
COMMENT ON COLUMN feedback.user_id IS 'Usuário que enviou o feedback. Nulo se for anônimo';
COMMENT ON COLUMN feedback.rating IS 'Nota de 1 a 5 estrelas';

-- Tabela de landing pages personalizadas
CREATE TABLE landing_pages (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER NOT NULL UNIQUE REFERENCES units(id) ON DELETE CASCADE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    content JSONB,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE landing_pages IS 'Configurações das landing pages personalizadas por academia';
COMMENT ON COLUMN landing_pages.slug IS 'URL personalizada da landing page (ex: wefit.com/academia/paulista)';
COMMENT ON COLUMN landing_pages.content IS 'Configuração completa da página em JSON (títulos, textos, imagens, cores, etc.)';

-- Tabela de logs de auditoria
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE audit_logs IS 'Registra ações importantes realizadas no sistema para auditoria e rastreabilidade';
COMMENT ON COLUMN audit_logs.action IS 'Tipo de ação realizada (ex: "create_unit", "update_plan_price")';
COMMENT ON COLUMN audit_logs.entity_type IS 'Tipo de entidade afetada (ex: "unit", "plan", "user")';
COMMENT ON COLUMN audit_logs.details IS 'Detalhes da ação em JSON (dados antigos vs novos)';

-- =====================================================
-- TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA DE TIMESTAMPS
-- =====================================================

CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workout_plans_updated_at BEFORE UPDATE ON workout_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assigned_workouts_updated_at BEFORE UPDATE ON assigned_workouts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_group_classes_updated_at BEFORE UPDATE ON group_classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_class_bookings_updated_at BEFORE UPDATE ON class_bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_landing_pages_updated_at BEFORE UPDATE ON landing_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ÍNDICES PARA OTIMIZAÇÃO DE PERFORMANCE
-- =====================================================

-- Índices para consultas frequentes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_unit_id ON users(unit_id);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_next_billing_date ON subscriptions(next_billing_date);

CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX idx_exercises_scope ON exercises(scope);
CREATE INDEX idx_exercises_unit_id ON exercises(unit_id);

CREATE INDEX idx_group_classes_unit_id ON group_classes(unit_id);
CREATE INDEX idx_group_classes_instructor_id ON group_classes(instructor_id);
CREATE INDEX idx_group_classes_start_time ON group_classes(start_time);

CREATE INDEX idx_class_bookings_user_id ON class_bookings(user_id);
CREATE INDEX idx_class_bookings_class_id ON class_bookings(class_id);
CREATE INDEX idx_class_bookings_status ON class_bookings(status);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_payment_date ON payments(payment_date);

CREATE INDEX idx_workout_logs_user_id ON workout_logs(user_id);
CREATE INDEX idx_workout_logs_log_date ON workout_logs(log_date);

CREATE INDEX idx_feedback_unit_id ON feedback(unit_id);
CREATE INDEX idx_feedback_status ON feedback(status);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_entity_type_id ON audit_logs(entity_type, entity_id);

-- =====================================================
-- COMENTÁRIOS ADICIONAIS DO ESQUEMA
-- =====================================================

COMMENT ON DATABASE current_database() IS 'Base de dados do sistema Wefit - Plataforma inteligente para gestão de academias';

-- =====================================================
-- FIM DO ESQUEMA
-- =====================================================
