-- Inserir roles básicos usando o enum existente
INSERT INTO public.roles (name, description, permissions) VALUES 
('proprietario', 'Proprietário da academia', '{"manage_all": true, "view_all": true}'),
('gestor', 'Gestor de academia', '{"manage_company": true, "view_company": true, "manage_staff": true}'),
('professor', 'Professor/Instrutor de academia', '{"manage_classes": true, "manage_workouts": true, "view_students": true}'),
('recepcionista', 'Recepcionista', '{"manage_checkin": true, "view_students": true, "manage_bookings": true}'),
('aluno', 'Aluno da academia', '{"view_own_data": true, "book_classes": true}')
ON CONFLICT (name) DO NOTHING;

-- Criar trigger para criar profile automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, cpf)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'cpf'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger para executar a função quando usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados de exemplo para demonstração
INSERT INTO public.companies (name, cnpj, email, phone, status) VALUES 
('Academia Exemplo', '12.345.678/0001-90', 'contato@academiaexemplo.com', '(11) 99999-9999', 'active')
ON CONFLICT DO NOTHING;