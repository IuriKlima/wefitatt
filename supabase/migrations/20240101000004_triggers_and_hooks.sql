
-- =====================================================
-- TRIGGERS E HOOKS PARA AUTOMAÇÃO
-- =====================================================

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, full_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aplicar trigger quando usuário é criado
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Trigger para registrar logs de auditoria
CREATE OR REPLACE FUNCTION log_audit_trail()
RETURNS TRIGGER AS $$
DECLARE
    company_id_val INTEGER;
BEGIN
    -- Tentar obter company_id baseado na tabela
    IF TG_TABLE_NAME = 'companies' THEN
        company_id_val := COALESCE(NEW.id, OLD.id);
    ELSIF TG_TABLE_NAME = 'branches' THEN
        company_id_val := COALESCE(NEW.company_id, OLD.company_id);
    ELSIF TG_TABLE_NAME = 'students' THEN
        company_id_val := COALESCE(NEW.company_id, OLD.company_id);
    ELSIF TG_TABLE_NAME = 'staff' THEN
        company_id_val := COALESCE(NEW.company_id, OLD.company_id);
    ELSIF TG_TABLE_NAME = 'classes' THEN
        company_id_val := COALESCE(NEW.company_id, OLD.company_id);
    END IF;
    
    -- Inserir log de auditoria
    INSERT INTO audit_logs (
        company_id,
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values
    ) VALUES (
        company_id_val,
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id::TEXT, OLD.id::TEXT),
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aplicar triggers de auditoria nas tabelas principais
CREATE TRIGGER audit_companies_trigger
    AFTER INSERT OR UPDATE OR DELETE ON companies
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_branches_trigger
    AFTER INSERT OR UPDATE OR DELETE ON branches
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_students_trigger
    AFTER INSERT OR UPDATE OR DELETE ON students
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_staff_trigger
    AFTER INSERT OR UPDATE OR DELETE ON staff
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_classes_trigger
    AFTER INSERT OR UPDATE OR DELETE ON classes
    FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

-- Trigger para gerar código do aluno automaticamente
CREATE OR REPLACE FUNCTION generate_student_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.student_code IS NULL THEN
        NEW.student_code := 'ST' || LPAD(NEW.id::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_student_code_trigger
    BEFORE INSERT ON students
    FOR EACH ROW EXECUTE FUNCTION generate_student_code();

-- Trigger para atualizar status de pagamento automaticamente
CREATE OR REPLACE FUNCTION update_payment_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Se o pagamento foi marcado como pago, definir data de pagamento
    IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
        NEW.paid_at = NOW();
    END IF;
    
    -- Se o pagamento foi cancelado, limpar data de pagamento
    IF NEW.status IN ('cancelled', 'failed') THEN
        NEW.paid_at = NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payment_status_trigger
    BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_payment_status();

-- Função para enviar notificação (placeholder para integração futura)
CREATE OR REPLACE FUNCTION send_notification(
    company_id_param INTEGER,
    user_id_param UUID,
    notification_type_param notification_type,
    title_param TEXT,
    message_param TEXT,
    recipient_param TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    notification_id INTEGER;
    result JSON;
BEGIN
    -- Inserir notificação na tabela
    INSERT INTO notifications (company_id, user_id, type, title, message, recipient)
    VALUES (company_id_param, user_id_param, notification_type_param, title_param, message_param, recipient_param)
    RETURNING id INTO notification_id;
    
    -- Retornar resultado (futuramente aqui seria chamada a API externa)
    SELECT json_build_object(
        'notification_id', notification_id,
        'message', 'Notification queued successfully'
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
