
-- =====================================================
-- POLÍTICAS DE SEGURANÇA RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Ativar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- FUNÇÕES DE SEGURANÇA
-- =====================================================

-- Função para obter o papel do usuário atual
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID, company_id_param INTEGER)
RETURNS TEXT AS $$
DECLARE
    user_role_name TEXT;
BEGIN
    SELECT r.name INTO user_role_name
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = user_uuid 
    AND ur.company_id = company_id_param;
    
    RETURN user_role_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para verificar se usuário pertence à empresa
CREATE OR REPLACE FUNCTION user_belongs_to_company(user_uuid UUID, company_id_param INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles ur
        WHERE ur.user_id = user_uuid 
        AND ur.company_id = company_id_param
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- POLÍTICAS PARA PROFILES
-- =====================================================

-- Usuários podem ver e editar apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- POLÍTICAS PARA COMPANIES
-- =====================================================

-- Proprietários podem ver suas empresas
CREATE POLICY "Owners can view their companies" ON companies
    FOR SELECT USING (owner_id = auth.uid());

-- Usuários podem ver empresas onde têm papel
CREATE POLICY "Users can view companies where they have roles" ON companies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            WHERE ur.user_id = auth.uid() 
            AND ur.company_id = companies.id
        )
    );

-- Proprietários podem atualizar suas empresas
CREATE POLICY "Owners can update their companies" ON companies
    FOR UPDATE USING (owner_id = auth.uid());

-- Proprietários podem inserir empresas
CREATE POLICY "Owners can insert companies" ON companies
    FOR INSERT WITH CHECK (owner_id = auth.uid());

-- =====================================================
-- POLÍTICAS PARA BRANCHES
-- =====================================================

-- Usuários podem ver filiais da empresa onde trabalham
CREATE POLICY "Users can view branches of their company" ON branches
    FOR SELECT USING (user_belongs_to_company(auth.uid(), company_id));

-- Proprietários e gestores podem atualizar filiais
CREATE POLICY "Owners and managers can update branches" ON branches
    FOR UPDATE USING (
        get_user_role(auth.uid(), company_id) IN ('proprietario', 'gestor')
    );

-- Proprietários podem inserir filiais
CREATE POLICY "Owners can insert branches" ON branches
    FOR INSERT WITH CHECK (
        get_user_role(auth.uid(), company_id) = 'proprietario'
    );

-- =====================================================
-- POLÍTICAS PARA STAFF
-- =====================================================

-- Staff podem ver colegas da mesma empresa
CREATE POLICY "Staff can view colleagues" ON staff
    FOR SELECT USING (user_belongs_to_company(auth.uid(), company_id));

-- Proprietários e gestores podem gerenciar staff
CREATE POLICY "Owners and managers can manage staff" ON staff
    FOR ALL USING (
        get_user_role(auth.uid(), company_id) IN ('proprietario', 'gestor')
    );

-- =====================================================
-- POLÍTICAS PARA STUDENTS
-- =====================================================

-- Usuários podem ver alunos da empresa onde trabalham
CREATE POLICY "Users can view students of their company" ON students
    FOR SELECT USING (user_belongs_to_company(auth.uid(), company_id));

-- Alunos podem ver apenas seu próprio perfil
CREATE POLICY "Students can view own profile" ON students
    FOR SELECT USING (user_id = auth.uid());

-- Staff pode gerenciar alunos
CREATE POLICY "Staff can manage students" ON students
    FOR ALL USING (
        get_user_role(auth.uid(), company_id) IN ('proprietario', 'gestor', 'recepcionista', 'professor')
    );

-- =====================================================
-- POLÍTICAS PARA CLASSES
-- =====================================================

-- Usuários podem ver aulas da empresa
CREATE POLICY "Users can view company classes" ON classes
    FOR SELECT USING (user_belongs_to_company(auth.uid(), company_id));

-- Proprietários, gestores e professores podem gerenciar aulas
CREATE POLICY "Managers and instructors can manage classes" ON classes
    FOR ALL USING (
        get_user_role(auth.uid(), company_id) IN ('proprietario', 'gestor', 'professor')
    );

-- =====================================================
-- POLÍTICAS PARA WORKOUTS
-- =====================================================

-- Alunos podem ver seus próprios treinos
CREATE POLICY "Students can view own workouts" ON workouts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s
            WHERE s.id = workouts.student_id 
            AND s.user_id = auth.uid()
        )
    );

-- Professores podem ver treinos dos alunos da empresa
CREATE POLICY "Instructors can view student workouts" ON workouts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s
            WHERE s.id = workouts.student_id 
            AND user_belongs_to_company(auth.uid(), s.company_id)
            AND get_user_role(auth.uid(), s.company_id) IN ('proprietario', 'gestor', 'professor')
        )
    );

-- Professores podem criar/editar treinos
CREATE POLICY "Instructors can manage workouts" ON workouts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM students s
            WHERE s.id = workouts.student_id 
            AND user_belongs_to_company(auth.uid(), s.company_id)
            AND get_user_role(auth.uid(), s.company_id) IN ('proprietario', 'gestor', 'professor')
        )
    );

-- =====================================================
-- POLÍTICAS PARA PAYMENTS
-- =====================================================

-- Usuários podem ver pagamentos da empresa
CREATE POLICY "Users can view company payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s
            WHERE s.id = payments.student_id 
            AND user_belongs_to_company(auth.uid(), s.company_id)
        )
    );

-- Alunos podem ver seus próprios pagamentos
CREATE POLICY "Students can view own payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s
            WHERE s.id = payments.student_id 
            AND s.user_id = auth.uid()
        )
    );

-- Proprietários, gestores e recepcionistas podem gerenciar pagamentos
CREATE POLICY "Managers can manage payments" ON payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM students s
            WHERE s.id = payments.student_id 
            AND user_belongs_to_company(auth.uid(), s.company_id)
            AND get_user_role(auth.uid(), s.company_id) IN ('proprietario', 'gestor', 'recepcionista')
        )
    );

-- =====================================================
-- POLÍTICAS PARA NOTIFICATIONS
-- =====================================================

-- Usuários podem ver suas próprias notificações
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

-- Proprietários e gestores podem enviar notificações
CREATE POLICY "Managers can send notifications" ON notifications
    FOR INSERT WITH CHECK (
        get_user_role(auth.uid(), company_id) IN ('proprietario', 'gestor')
    );

-- =====================================================
-- POLÍTICAS PARA AUDIT_LOGS
-- =====================================================

-- Proprietários podem ver logs de auditoria
CREATE POLICY "Owners can view audit logs" ON audit_logs
    FOR SELECT USING (
        get_user_role(auth.uid(), company_id) = 'proprietario'
    );
