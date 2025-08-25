-- Implementar Row Level Security (RLS) nas tabelas principais

-- 1. Habilitar RLS nas tabelas críticas
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_plans ENABLE ROW LEVEL SECURITY;

-- 2. Criar função auxiliar para verificar roles do usuário
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid, company_id_param integer DEFAULT NULL)
RETURNS TABLE(role_name text, company_id integer, branch_id integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    r.name::text as role_name,
    ur.company_id,
    ur.branch_id
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.id
  WHERE ur.user_id = user_id 
    AND (company_id_param IS NULL OR ur.company_id = company_id_param);
$$;

-- 3. Criar função para verificar se usuário tem role específico
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text, _company_id integer DEFAULT NULL)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.get_user_role(_user_id, _company_id) 
    WHERE role_name = _role
  );
$$;

-- 4. Políticas para tabela profiles (usuários podem ver/editar apenas seu próprio perfil)
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 5. Políticas para tabela companies (apenas admins globais e donos podem gerenciar)
CREATE POLICY "Admin can view all companies" 
  ON public.companies FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Company owners can view their company" 
  ON public.companies FOR SELECT 
  USING (auth.uid() = owner_id);

CREATE POLICY "Admin can manage companies" 
  ON public.companies FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Company owners can update their company" 
  ON public.companies FOR UPDATE 
  USING (auth.uid() = owner_id);

-- 6. Políticas para user_roles (admins e gestores podem gerenciar)
CREATE POLICY "Admin can manage all user roles" 
  ON public.user_roles FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Gestor can manage roles in their company" 
  ON public.user_roles FOR ALL 
  USING (
    public.has_role(auth.uid(), 'gestor', company_id) OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can view own roles" 
  ON public.user_roles FOR SELECT 
  USING (auth.uid() = user_id);

-- 7. Políticas para students (apenas da mesma empresa)
CREATE POLICY "Company staff can view students" 
  ON public.students FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.get_user_role(auth.uid(), company_id)
      WHERE role_name IN ('admin', 'gestor', 'instrutor', 'recepcionista')
    )
  );

CREATE POLICY "Students can view own data" 
  ON public.students FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Company staff can manage students" 
  ON public.students FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.get_user_role(auth.uid(), company_id)
      WHERE role_name IN ('admin', 'gestor', 'recepcionista')
    )
  );

-- 8. Políticas para payments (apenas da mesma empresa)
CREATE POLICY "Company staff can view payments" 
  ON public.payments FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      JOIN public.get_user_role(auth.uid(), s.company_id) ur ON true
      WHERE s.id = student_id 
        AND ur.role_name IN ('admin', 'gestor', 'recepcionista')
    )
  );

CREATE POLICY "Students can view own payments" 
  ON public.payments FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );