-- ==========================================
-- WEFIT SAAS - SEED DATA (DADOS FAKE REALISTAS)
-- Rodar no SQL Editor do Supabase
-- ==========================================

-- Tenant demo: 11111111-1111-1111-1111-111111111111

-- ==========================================
-- 1. PLANOS DA ACADEMIA
-- ==========================================
INSERT INTO public.plans (id, tenant_id, name, price, billing_cycle) VALUES
  ('aaaa0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Básico - Musculação', 89.90, 'mensal'),
  ('aaaa0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'Intermediário - Musculação + Aulas', 129.90, 'mensal'),
  ('aaaa0001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'Premium - Acesso Total', 179.90, 'mensal'),
  ('aaaa0001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'Trimestral - Acesso Total', 449.70, 'trimestral'),
  ('aaaa0001-0001-0001-0001-000000000005', '11111111-1111-1111-1111-111111111111', 'Anual VIP - Tudo Incluso', 1499.00, 'anual')
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 2. ETAPAS DO FUNIL (CRM)
-- ==========================================
INSERT INTO public.pipeline_stages (id, tenant_id, name, order_index) VALUES
  ('bbbb0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Novo Contato', 0),
  ('bbbb0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'Aula Experimental Agendada', 1),
  ('bbbb0001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'Visitou a Academia', 2),
  ('bbbb0001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'Proposta Enviada', 3),
  ('bbbb0001-0001-0001-0001-000000000005', '11111111-1111-1111-1111-111111111111', 'Matriculado', 4),
  ('bbbb0001-0001-0001-0001-000000000006', '11111111-1111-1111-1111-111111111111', 'Perdido', 5)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 3. LEADS (OPORTUNIDADES)
-- ==========================================
INSERT INTO public.leads (id, tenant_id, name, phone, email, source, pipeline_stage_id) VALUES
  ('cccc0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Mariana Silva', '(11) 98765-4321', 'mariana.silva@email.com', 'instagram', 'bbbb0001-0001-0001-0001-000000000001'),
  ('cccc0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'Carlos Souza', '(11) 97654-3210', 'carlos.souza@email.com', 'whatsapp', 'bbbb0001-0001-0001-0001-000000000002'),
  ('cccc0001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'Ana Paula Ferreira', '(11) 96543-2109', 'ana.ferreira@email.com', 'site', 'bbbb0001-0001-0001-0001-000000000003'),
  ('cccc0001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'Rafael Mendes', '(11) 95432-1098', 'rafael.mendes@email.com', 'instagram', 'bbbb0001-0001-0001-0001-000000000004'),
  ('cccc0001-0001-0001-0001-000000000005', '11111111-1111-1111-1111-111111111111', 'Juliana Costa', '(11) 94321-0987', 'juliana.costa@email.com', 'whatsapp', 'bbbb0001-0001-0001-0001-000000000005'),
  ('cccc0001-0001-0001-0001-000000000006', '11111111-1111-1111-1111-111111111111', 'Pedro Almeida', '(11) 93210-9876', 'pedro.almeida@email.com', 'site', 'bbbb0001-0001-0001-0001-000000000001'),
  ('cccc0001-0001-0001-0001-000000000007', '11111111-1111-1111-1111-111111111111', 'Fernanda Lima', '(11) 92109-8765', 'fernanda.lima@email.com', 'instagram', 'bbbb0001-0001-0001-0001-000000000002'),
  ('cccc0001-0001-0001-0001-000000000008', '11111111-1111-1111-1111-111111111111', 'Lucas Oliveira', '(11) 91098-7654', 'lucas.oliveira@email.com', 'whatsapp', 'bbbb0001-0001-0001-0001-000000000003'),
  ('cccc0001-0001-0001-0001-000000000009', '11111111-1111-1111-1111-111111111111', 'Camila Santos', '(11) 90987-6543', 'camila.santos@email.com', 'site', 'bbbb0001-0001-0001-0001-000000000006'),
  ('cccc0001-0001-0001-0001-000000000010', '11111111-1111-1111-1111-111111111111', 'Bruno Rodrigues', '(11) 89876-5432', 'bruno.rodrigues@email.com', 'instagram', 'bbbb0001-0001-0001-0001-000000000004'),
  ('cccc0001-0001-0001-0001-000000000011', '11111111-1111-1111-1111-111111111111', 'Isabela Martins', '(11) 88765-4321', 'isabela.martins@email.com', 'whatsapp', 'bbbb0001-0001-0001-0001-000000000001'),
  ('cccc0001-0001-0001-0001-000000000012', '11111111-1111-1111-1111-111111111111', 'Thiago Pereira', '(11) 87654-3210', 'thiago.pereira@email.com', 'site', 'bbbb0001-0001-0001-0001-000000000005')
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 4. ATIVIDADES DOS LEADS
-- ==========================================
INSERT INTO public.lead_activities (id, tenant_id, lead_id, type, description) VALUES
  ('dddd0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'cccc0001-0001-0001-0001-000000000001', 'whatsapp', 'Primeiro contato via DM do Instagram. Interessada em musculação.'),
  ('dddd0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'cccc0001-0001-0001-0001-000000000002', 'call', 'Ligou pedindo informações sobre planos. Agendou aula experimental para sexta.'),
  ('dddd0001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'cccc0001-0001-0001-0001-000000000003', 'visit', 'Visitou a academia, gostou da estrutura. Pediu proposta do plano Premium.'),
  ('dddd0001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'cccc0001-0001-0001-0001-000000000004', 'email', 'Enviado proposta do plano Intermediário com desconto de 15%.'),
  ('dddd0001-0001-0001-0001-000000000005', '11111111-1111-1111-1111-111111111111', 'cccc0001-0001-0001-0001-000000000005', 'note', 'Aluna matriculada! Plano Premium anual. Início dia 01/02.'),
  ('dddd0001-0001-0001-0001-000000000006', '11111111-1111-1111-1111-111111111111', 'cccc0001-0001-0001-0001-000000000009', 'follow_up', 'Tentativa de follow-up após 3 dias sem resposta. Sem sucesso.')
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 5. METAS DE VENDAS
-- ==========================================
INSERT INTO public.sales_goals (id, tenant_id, period_start, period_end, target_revenue, target_enrollments, actual_revenue, actual_enrollments) VALUES
  ('eeee0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', '2026-03-01', '2026-03-31', 50000.00, 30, 32540.00, 18),
  ('eeee0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', '2026-02-01', '2026-02-28', 45000.00, 25, 47820.00, 28),
  ('eeee0001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', '2026-01-01', '2026-01-31', 40000.00, 22, 38150.00, 20)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 6. DISPOSITIVOS DE ACESSO (CATRACAS)
-- ==========================================
INSERT INTO public.access_devices (id, tenant_id, name, type, location, serial_number, is_active) VALUES
  ('ff000001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Catraca Entrada Principal', 'turnstile', 'Recepção', 'CAT-001-2026', true),
  ('ff000001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'Catraca Área VIP', 'turnstile', 'Área VIP - 2º Andar', 'CAT-002-2026', true),
  ('ff000001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'Porta Estúdio CrossFit', 'door', 'Estúdio CrossFit', 'DOOR-001-2026', true),
  ('ff000001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'Totem Check-in', 'totem', 'Recepção', 'TOTEM-001-2026', true)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 7. GRADE DE AULAS
-- ==========================================
INSERT INTO public.class_schedules (id, tenant_id, name, day_of_week, start_time, end_time, capacity, location, is_active) VALUES
  ('aabb0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'CrossFit WOD', 1, '06:30', '07:30', 15, 'Estúdio CrossFit', true),
  ('aabb0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'CrossFit WOD', 3, '06:30', '07:30', 15, 'Estúdio CrossFit', true),
  ('aabb0001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'CrossFit WOD', 5, '06:30', '07:30', 15, 'Estúdio CrossFit', true),
  ('aabb0001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'Spinning', 1, '07:00', '08:00', 25, 'Sala de Spinning', true),
  ('aabb0001-0001-0001-0001-000000000005', '11111111-1111-1111-1111-111111111111', 'Spinning', 3, '07:00', '08:00', 25, 'Sala de Spinning', true),
  ('aabb0001-0001-0001-0001-000000000006', '11111111-1111-1111-1111-111111111111', 'Yoga Flow', 2, '08:00', '09:00', 20, 'Sala Multiuso', true),
  ('aabb0001-0001-0001-0001-000000000007', '11111111-1111-1111-1111-111111111111', 'Yoga Flow', 4, '08:00', '09:00', 20, 'Sala Multiuso', true),
  ('aabb0001-0001-0001-0001-000000000008', '11111111-1111-1111-1111-111111111111', 'HIIT Express', 1, '12:00', '12:45', 20, 'Sala Multiuso', true),
  ('aabb0001-0001-0001-0001-000000000009', '11111111-1111-1111-1111-111111111111', 'HIIT Express', 3, '12:00', '12:45', 20, 'Sala Multiuso', true),
  ('aabb0001-0001-0001-0001-000000000010', '11111111-1111-1111-1111-111111111111', 'Muay Thai', 2, '19:00', '20:00', 18, 'Sala de Lutas', true),
  ('aabb0001-0001-0001-0001-000000000011', '11111111-1111-1111-1111-111111111111', 'Muay Thai', 4, '19:00', '20:00', 18, 'Sala de Lutas', true),
  ('aabb0001-0001-0001-0001-000000000012', '11111111-1111-1111-1111-111111111111', 'Funcional', 6, '09:00', '10:00', 20, 'Área Externa', true)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 8. CATÁLOGO DE EXERCÍCIOS (IDs hex válidos)
-- ==========================================
INSERT INTO public.exercises (id, tenant_id, name, muscle_group, equipment, description) VALUES
  -- Peito
  ('e0e10001-0001-0001-0001-000000000001', NULL, 'Supino Reto com Barra', 'Peitoral', 'Barra e banco', 'Deite no banco, agarre a barra na largura dos ombros, desça até o peito e empurre.'),
  ('e0e10001-0001-0001-0001-000000000002', NULL, 'Supino Inclinado com Halteres', 'Peitoral', 'Halteres e banco inclinado', 'No banco inclinado a 45°, faça o movimento de pressão com halteres.'),
  ('e0e10001-0001-0001-0001-000000000003', NULL, 'Crucifixo', 'Peitoral', 'Halteres', 'Braços abertos, halteres descem lateralmente até sentir alongamento no peito.'),
  -- Costas
  ('e0e10001-0001-0001-0001-000000000004', NULL, 'Puxada Frontal', 'Costas', 'Polia alta', 'Agarre a barra larga, puxe até o peitoral contraindo as costas.'),
  ('e0e10001-0001-0001-0001-000000000005', NULL, 'Remada Curvada', 'Costas', 'Barra', 'Incline o tronco a 45°, puxe a barra até o abdômen.'),
  ('e0e10001-0001-0001-0001-000000000006', NULL, 'Remada Unilateral', 'Costas', 'Halter e banco', 'Apoie joelho e mão no banco, puxe o halter até a cintura.'),
  -- Pernas
  ('e0e10001-0001-0001-0001-000000000007', NULL, 'Agachamento Livre', 'Quadríceps', 'Barra', 'Barra nas costas, agache até as coxas ficarem paralelas ao chão.'),
  ('e0e10001-0001-0001-0001-000000000008', NULL, 'Leg Press 45°', 'Quadríceps', 'Leg Press', 'Posicione os pés na plataforma e empurre controladamente.'),
  ('e0e10001-0001-0001-0001-000000000009', NULL, 'Stiff', 'Posterior de Coxa', 'Barra', 'Pés na largura dos ombros, desça a barra mantendo as pernas quase estendidas.'),
  ('e0e10001-0001-0001-0001-00000000000a', NULL, 'Cadeira Extensora', 'Quadríceps', 'Cadeira Extensora', 'Sente e estenda as pernas até a extensão completa.'),
  -- Ombros
  ('e0e10001-0001-0001-0001-00000000000b', NULL, 'Desenvolvimento Militar', 'Ombros', 'Barra', 'Empurre a barra acima da cabeça partindo do nível dos ombros.'),
  ('e0e10001-0001-0001-0001-00000000000c', NULL, 'Elevação Lateral', 'Ombros', 'Halteres', 'Braços estendidos ao lado, eleve até a altura dos ombros.'),
  -- Bíceps/Tríceps
  ('e0e10001-0001-0001-0001-00000000000d', NULL, 'Rosca Direta', 'Bíceps', 'Barra', 'Segure a barra com pegada supinada e flexione os cotovelos.'),
  ('e0e10001-0001-0001-0001-00000000000e', NULL, 'Tríceps Pulley', 'Tríceps', 'Polia', 'Empurre a barra para baixo estendendo completamente os braços.'),
  -- Abdômen
  ('e0e10001-0001-0001-0001-00000000000f', NULL, 'Prancha Isométrica', 'Abdômen', 'Peso corporal', 'Mantenha o corpo reto apoiado nos antebraços e pontas dos pés.')
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 9. FICHAS DE TREINO (TEMPLATES)
-- ==========================================
INSERT INTO public.workouts (id, tenant_id, name, description, is_template) VALUES
  ('f0a10001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Treino A - Peito e Tríceps', 'Treino focado em peito e tríceps para iniciantes e intermediários', true),
  ('f0a10001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'Treino B - Costas e Bíceps', 'Treino focado em costas e bíceps com volume progressivo', true),
  ('f0a10001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 'Treino C - Pernas Completo', 'Treino completo de membros inferiores com ênfase em quadríceps', true),
  ('f0a10001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'Treino D - Ombros e Abdômen', 'Treino de ombros com finalizador de core', true)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 10. EXERCÍCIOS NAS FICHAS
-- ==========================================
-- Treino A - Peito e Tríceps
INSERT INTO public.workout_exercises (workout_id, exercise_id, order_index, sets, reps, rest_seconds, weight) VALUES
  ('f0a10001-0001-0001-0001-000000000001', 'e0e10001-0001-0001-0001-000000000001', 1, 4, '10-12', 90, '40kg'),
  ('f0a10001-0001-0001-0001-000000000001', 'e0e10001-0001-0001-0001-000000000002', 2, 3, '12', 60, '16kg'),
  ('f0a10001-0001-0001-0001-000000000001', 'e0e10001-0001-0001-0001-000000000003', 3, 3, '12-15', 60, '12kg'),
  ('f0a10001-0001-0001-0001-000000000001', 'e0e10001-0001-0001-0001-00000000000e', 4, 3, '12-15', 60, '25kg');

-- Treino B - Costas e Bíceps
INSERT INTO public.workout_exercises (workout_id, exercise_id, order_index, sets, reps, rest_seconds, weight) VALUES
  ('f0a10001-0001-0001-0001-000000000002', 'e0e10001-0001-0001-0001-000000000004', 1, 4, '10-12', 90, '45kg'),
  ('f0a10001-0001-0001-0001-000000000002', 'e0e10001-0001-0001-0001-000000000005', 2, 4, '10', 90, '30kg'),
  ('f0a10001-0001-0001-0001-000000000002', 'e0e10001-0001-0001-0001-000000000006', 3, 3, '12', 60, '18kg'),
  ('f0a10001-0001-0001-0001-000000000002', 'e0e10001-0001-0001-0001-00000000000d', 4, 3, '12-15', 60, '12kg');

-- Treino C - Pernas
INSERT INTO public.workout_exercises (workout_id, exercise_id, order_index, sets, reps, rest_seconds, weight) VALUES
  ('f0a10001-0001-0001-0001-000000000003', 'e0e10001-0001-0001-0001-000000000007', 1, 4, '8-10', 120, '60kg'),
  ('f0a10001-0001-0001-0001-000000000003', 'e0e10001-0001-0001-0001-000000000008', 2, 4, '12', 90, '120kg'),
  ('f0a10001-0001-0001-0001-000000000003', 'e0e10001-0001-0001-0001-000000000009', 3, 3, '12', 90, '30kg'),
  ('f0a10001-0001-0001-0001-000000000003', 'e0e10001-0001-0001-0001-00000000000a', 4, 3, '15', 60, '35kg');

-- Treino D - Ombros e Abdômen
INSERT INTO public.workout_exercises (workout_id, exercise_id, order_index, sets, reps, rest_seconds, weight) VALUES
  ('f0a10001-0001-0001-0001-000000000004', 'e0e10001-0001-0001-0001-00000000000b', 1, 4, '10', 90, '25kg'),
  ('f0a10001-0001-0001-0001-000000000004', 'e0e10001-0001-0001-0001-00000000000c', 2, 3, '12-15', 60, '8kg'),
  ('f0a10001-0001-0001-0001-000000000004', 'e0e10001-0001-0001-0001-00000000000f', 3, 3, '45 seg', 45, NULL);


-- ==========================================
-- 11. BADGES DE GAMIFICAÇÃO
-- ==========================================
INSERT INTO public.gamification_badges (id, tenant_id, name, description, points_required, criteria_type, criteria_value) VALUES
  ('ba0d0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'Primeira Visita', 'Fez o primeiro check-in na academia', 10, 'checkins', 1),
  ('ba0d0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 'Semana Completa', 'Treinou 5 dias em uma semana', 100, 'checkins', 5),
  ('ba0d0001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', '30 Treinos', 'Completou 30 treinos registrados', 300, 'workouts', 30),
  ('ba0d0001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 'Mes Perfeito', 'Treinou pelo menos 20 dias no mes', 500, 'streak', 20),
  ('ba0d0001-0001-0001-0001-000000000005', '11111111-1111-1111-1111-111111111111', '100 Treinos', 'Completou 100 treinos registrados', 1000, 'workouts', 100),
  ('ba0d0001-0001-0001-0001-000000000006', '11111111-1111-1111-1111-111111111111', 'Elite', 'Acumulou 5000 pontos de gamificacao', 5000, 'custom', 5000)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 12. REGRAS DE INADIMPLÊNCIA
-- ==========================================
INSERT INTO public.delinquency_rules (id, tenant_id, days_tolerance, action, reminder_message, is_active) VALUES
  ('de1a0001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 3, 'send_reminder', 'Ola! Identificamos que sua mensalidade esta pendente. Regularize para continuar treinando normalmente.', true),
  ('de1a0001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 7, 'both', 'Atencao: sua fatura esta com 7 dias de atraso. O acesso a academia sera bloqueado ate a regularizacao.', true)
ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 13. FATURAS (SIMULANDO HISTÓRICO)
-- ==========================================
INSERT INTO public.invoices (id, tenant_id, amount, status, due_date, payment_method, paid_at) VALUES
  ('fa010001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 179.90, 'paid', '2026-01-05', 'pix', '2026-01-04 14:30:00+00'),
  ('fa010001-0001-0001-0001-000000000002', '11111111-1111-1111-1111-111111111111', 129.90, 'paid', '2026-01-05', 'credit_card', '2026-01-05 09:12:00+00'),
  ('fa010001-0001-0001-0001-000000000003', '11111111-1111-1111-1111-111111111111', 89.90, 'paid', '2026-01-10', 'pix', '2026-01-09 18:45:00+00'),
  ('fa010001-0001-0001-0001-000000000004', '11111111-1111-1111-1111-111111111111', 179.90, 'paid', '2026-02-05', 'pix', '2026-02-05 10:00:00+00'),
  ('fa010001-0001-0001-0001-000000000005', '11111111-1111-1111-1111-111111111111', 129.90, 'paid', '2026-02-05', 'credit_card', '2026-02-05 08:30:00+00'),
  ('fa010001-0001-0001-0001-000000000006', '11111111-1111-1111-1111-111111111111', 89.90, 'overdue', '2026-02-10', NULL, NULL),
  ('fa010001-0001-0001-0001-000000000007', '11111111-1111-1111-1111-111111111111', 179.90, 'paid', '2026-03-05', 'pix', '2026-03-04 16:20:00+00'),
  ('fa010001-0001-0001-0001-000000000008', '11111111-1111-1111-1111-111111111111', 129.90, 'pending', '2026-03-05', NULL, NULL),
  ('fa010001-0001-0001-0001-000000000009', '11111111-1111-1111-1111-111111111111', 89.90, 'pending', '2026-03-10', NULL, NULL),
  ('fa010001-0001-0001-0001-00000000000a', '11111111-1111-1111-1111-111111111111', 449.70, 'paid', '2026-01-15', 'credit_card', '2026-01-15 11:00:00+00'),
  ('fa010001-0001-0001-0001-00000000000b', '11111111-1111-1111-1111-111111111111', 1499.00, 'paid', '2026-01-20', 'pix', '2026-01-19 20:15:00+00'),
  ('fa010001-0001-0001-0001-00000000000c', '11111111-1111-1111-1111-111111111111', 179.90, 'overdue', '2026-02-28', NULL, NULL)
ON CONFLICT (id) DO NOTHING;
