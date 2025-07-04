
-- =====================================================
-- FUNÇÕES RPC PARA O SISTEMA WEFIT
-- =====================================================

-- Função para criar uma nova empresa e associar o usuário como proprietário
CREATE OR REPLACE FUNCTION create_company_with_owner(
    company_name TEXT,
    company_email TEXT DEFAULT NULL,
    company_phone TEXT DEFAULT NULL,
    company_cnpj TEXT DEFAULT NULL,
    company_address JSONB DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    new_company_id INTEGER;
    owner_role_id INTEGER;
    result JSON;
BEGIN
    -- Verificar se já existe perfil para o usuário
    IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()) THEN
        RAISE EXCEPTION 'User profile not found';
    END IF;
    
    -- Criar a empresa
    INSERT INTO companies (name, email, phone, cnpj, address, owner_id)
    VALUES (company_name, company_email, company_phone, company_cnpj, company_address, auth.uid())
    RETURNING id INTO new_company_id;
    
    -- Obter o ID do role proprietário
    SELECT id INTO owner_role_id FROM roles WHERE name = 'proprietario';
    
    -- Associar o usuário como proprietário da empresa
    INSERT INTO user_roles (user_id, role_id, company_id)
    VALUES (auth.uid(), owner_role_id, new_company_id);
    
    -- Retornar resultado
    SELECT json_build_object(
        'company_id', new_company_id,
        'message', 'Company created successfully'
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para criar uma filial
CREATE OR REPLACE FUNCTION create_branch(
    company_id_param INTEGER,
    branch_name TEXT,
    branch_address JSONB DEFAULT NULL,
    branch_phone TEXT DEFAULT NULL,
    branch_email TEXT DEFAULT NULL,
    operating_hours_param JSONB DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    new_branch_id INTEGER;
    result JSON;
BEGIN
    -- Verificar se o usuário tem permissão (proprietário)
    IF get_user_role(auth.uid(), company_id_param) != 'proprietario' THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;
    
    -- Criar a filial
    INSERT INTO branches (company_id, name, address, phone, email, operating_hours)
    VALUES (company_id_param, branch_name, branch_address, branch_phone, branch_email, operating_hours_param)
    RETURNING id INTO new_branch_id;
    
    -- Retornar resultado
    SELECT json_build_object(
        'branch_id', new_branch_id,
        'message', 'Branch created successfully'
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para registrar um novo aluno
CREATE OR REPLACE FUNCTION register_student(
    company_id_param INTEGER,
    branch_id_param INTEGER,
    student_name TEXT,
    student_email TEXT,
    student_phone TEXT DEFAULT NULL,
    student_cpf TEXT DEFAULT NULL,
    birth_date_param DATE DEFAULT NULL,
    gender_param TEXT DEFAULT NULL,
    emergency_contact_param JSONB DEFAULT NULL,
    goal_param TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    new_user_id UUID;
    new_student_id INTEGER;
    student_role_id INTEGER;
    result JSON;
BEGIN
    -- Verificar se o usuário tem permissão
    IF get_user_role(auth.uid(), company_id_param) NOT IN ('proprietario', 'gestor', 'recepcionista') THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;
    
    -- Criar perfil do usuário (será criado via Auth posteriormente)
    -- Por enquanto, vamos simular com um UUID
    new_user_id := gen_random_uuid();
    
    -- Criar registro do aluno
    INSERT INTO students (user_id, company_id, branch_id, birth_date, gender, emergency_contact)
    VALUES (new_user_id, company_id_param, branch_id_param, birth_date_param, gender_param, emergency_contact_param)
    RETURNING id INTO new_student_id;
    
    -- Criar perfil detalhado do aluno
    INSERT INTO student_profiles (student_id, goal)
    VALUES (new_student_id, goal_param);
    
    -- Obter o ID do role aluno
    SELECT id INTO student_role_id FROM roles WHERE name = 'aluno';
    
    -- Associar role de aluno
    INSERT INTO user_roles (user_id, role_id, company_id, branch_id)
    VALUES (new_user_id, student_role_id, company_id_param, branch_id_param);
    
    -- Retornar resultado
    SELECT json_build_object(
        'student_id', new_student_id,
        'user_id', new_user_id,
        'message', 'Student registered successfully'
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para agendar uma aula
CREATE OR REPLACE FUNCTION schedule_class(
    company_id_param INTEGER,
    branch_id_param INTEGER,
    class_type_id_param INTEGER,
    instructor_id_param INTEGER,
    class_title TEXT,
    class_description TEXT DEFAULT NULL,
    start_time_param TIMESTAMPTZ,
    end_time_param TIMESTAMPTZ,
    max_participants_param INTEGER DEFAULT 20,
    room_param TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    new_class_id INTEGER;
    result JSON;
BEGIN
    -- Verificar se o usuário tem permissão
    IF get_user_role(auth.uid(), company_id_param) NOT IN ('proprietario', 'gestor', 'professor') THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;
    
    -- Criar a aula
    INSERT INTO classes (company_id, branch_id, class_type_id, instructor_id, title, description, start_time, end_time, max_participants, room)
    VALUES (company_id_param, branch_id_param, class_type_id_param, instructor_id_param, class_title, class_description, start_time_param, end_time_param, max_participants_param, room_param)
    RETURNING id INTO new_class_id;
    
    -- Retornar resultado
    SELECT json_build_object(
        'class_id', new_class_id,
        'message', 'Class scheduled successfully'
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para inscrever aluno em uma aula
CREATE OR REPLACE FUNCTION enroll_student_in_class(
    class_id_param INTEGER,
    student_id_param INTEGER
)
RETURNS JSON AS $$
DECLARE
    class_company_id INTEGER;
    current_enrollments INTEGER;
    max_participants_count INTEGER;
    result JSON;
BEGIN
    -- Obter informações da aula
    SELECT c.company_id, c.max_participants INTO class_company_id, max_participants_count
    FROM classes c WHERE c.id = class_id_param;
    
    -- Verificar se o usuário tem permissão ou é o próprio aluno
    IF NOT (
        get_user_role(auth.uid(), class_company_id) IN ('proprietario', 'gestor', 'recepcionista', 'professor') OR
        EXISTS (SELECT 1 FROM students s WHERE s.id = student_id_param AND s.user_id = auth.uid())
    ) THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;
    
    -- Verificar se há vagas disponíveis
    SELECT COUNT(*) INTO current_enrollments
    FROM class_students cs
    WHERE cs.class_id = class_id_param AND cs.status = 'enrolled';
    
    IF current_enrollments >= max_participants_count THEN
        RAISE EXCEPTION 'Class is full';
    END IF;
    
    -- Inscrever o aluno
    INSERT INTO class_students (class_id, student_id)
    VALUES (class_id_param, student_id_param)
    ON CONFLICT (class_id, student_id) DO NOTHING;
    
    -- Retornar resultado
    SELECT json_build_object(
        'message', 'Student enrolled successfully',
        'class_id', class_id_param,
        'student_id', student_id_param
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter resumo diário da unidade
CREATE OR REPLACE FUNCTION get_daily_summary(
    branch_id_param INTEGER,
    summary_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON AS $$
DECLARE
    branch_company_id INTEGER;
    total_classes INTEGER;
    total_students_today INTEGER;
    total_checkins INTEGER;
    pending_payments INTEGER;
    result JSON;
BEGIN
    -- Obter company_id da filial
    SELECT company_id INTO branch_company_id FROM branches WHERE id = branch_id_param;
    
    -- Verificar se o usuário tem permissão
    IF NOT user_belongs_to_company(auth.uid(), branch_company_id) THEN
        RAISE EXCEPTION 'Insufficient permissions';
    END IF;
    
    -- Contar aulas do dia
    SELECT COUNT(*) INTO total_classes
    FROM classes c
    WHERE c.branch_id = branch_id_param
    AND DATE(c.start_time) = summary_date;
    
    -- Contar alunos inscritos em aulas do dia
    SELECT COUNT(DISTINCT cs.student_id) INTO total_students_today
    FROM class_students cs
    JOIN classes c ON cs.class_id = c.id
    WHERE c.branch_id = branch_id_param
    AND DATE(c.start_time) = summary_date
    AND cs.status = 'enrolled';
    
    -- Contar check-ins do dia
    SELECT COUNT(*) INTO total_checkins
    FROM class_attendance ca
    JOIN classes c ON ca.class_id = c.id
    WHERE c.branch_id = branch_id_param
    AND DATE(ca.created_at) = summary_date
    AND ca.attended = true;
    
    -- Contar pagamentos pendentes
    SELECT COUNT(*) INTO pending_payments
    FROM payments p
    JOIN students s ON p.student_id = s.id
    WHERE s.branch_id = branch_id_param
    AND p.status = 'pending';
    
    -- Montar resultado
    SELECT json_build_object(
        'date', summary_date,
        'branch_id', branch_id_param,
        'total_classes', total_classes,
        'total_students_today', total_students_today,
        'total_checkins', total_checkins,
        'pending_payments', pending_payments
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
