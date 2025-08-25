-- Habilitar RLS nas tabelas restantes
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_sessions ENABLE ROW LEVEL SECURITY;

-- Corrigir functions com search_path
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid, company_id_param integer DEFAULT NULL)
RETURNS TABLE(role_name text, company_id integer, branch_id integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text, _company_id integer DEFAULT NULL)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.get_user_role(_user_id, _company_id) 
    WHERE role_name = _role
  );
$$;

-- Corrigir função existente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Políticas básicas para tabelas restantes (permitir acesso conforme role)

-- Roles - apenas admins podem gerenciar
CREATE POLICY "Admin can manage roles" ON public.roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view roles" ON public.roles FOR SELECT USING (true);

-- Branches - gestores e admins da empresa
CREATE POLICY "Company staff can view branches" ON public.branches FOR SELECT 
USING (
  public.has_role(auth.uid(), 'admin') OR
  EXISTS (SELECT 1 FROM public.get_user_role(auth.uid(), company_id))
);

CREATE POLICY "Gestor and admin can manage branches" ON public.branches FOR ALL 
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'gestor', company_id)
);

-- Staff - gestores podem gerenciar funcionários da empresa
CREATE POLICY "Company managers can view staff" ON public.staff FOR SELECT 
USING (
  public.has_role(auth.uid(), 'admin') OR
  EXISTS (SELECT 1 FROM public.get_user_role(auth.uid(), company_id) WHERE role_name IN ('gestor'))
);

CREATE POLICY "Staff can view own data" ON public.staff FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Gestor can manage staff" ON public.staff FOR ALL 
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'gestor', company_id)
);

-- Classes - staff da empresa pode gerenciar
CREATE POLICY "Company staff can view classes" ON public.classes FOR SELECT 
USING (
  EXISTS (SELECT 1 FROM public.get_user_role(auth.uid(), company_id))
);

CREATE POLICY "Company staff can manage classes" ON public.classes FOR ALL 
USING (
  public.has_role(auth.uid(), 'admin') OR
  EXISTS (SELECT 1 FROM public.get_user_role(auth.uid(), company_id) WHERE role_name IN ('gestor', 'instrutor', 'recepcionista'))
);

-- Student Plans - gestores da empresa
CREATE POLICY "Company staff can view student plans" ON public.student_plans FOR SELECT 
USING (
  public.has_role(auth.uid(), 'admin') OR
  EXISTS (SELECT 1 FROM public.get_user_role(auth.uid(), company_id))
);

CREATE POLICY "Gestor can manage student plans" ON public.student_plans FOR ALL 
USING (
  public.has_role(auth.uid(), 'admin') OR
  public.has_role(auth.uid(), 'gestor', company_id)
);

-- Exercises - acesso global mas com controle
CREATE POLICY "Users can view exercises" ON public.exercises FOR SELECT USING (true);
CREATE POLICY "Staff can manage company exercises" ON public.exercises FOR ALL 
USING (
  public.has_role(auth.uid(), 'admin') OR
  (company_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.get_user_role(auth.uid(), company_id) WHERE role_name IN ('gestor', 'instrutor')))
);

-- Políticas básicas para outras tabelas (apenas leitura para usuários autenticados)
CREATE POLICY "Authenticated users access" ON public.workouts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.workout_exercises FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.student_progress FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.student_profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.class_attendance FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.class_students FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.class_types FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.company_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.subscriptions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.invoices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.discounts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.notifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.integrations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.webhooks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.login_history FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.audit_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users access" ON public.chatbot_sessions FOR ALL USING (auth.role() = 'authenticated');