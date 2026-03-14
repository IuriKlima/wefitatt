-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Pipeline Stages
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  name TEXT NOT NULL,
  order_index INT DEFAULT 0,
  color TEXT DEFAULT '#8B5CF6',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  stage_id UUID REFERENCES pipeline_stages(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  score NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'open',
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Lead Activities
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMPTZ,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Plans
CREATE TABLE IF NOT EXISTS plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  billing_cycle TEXT DEFAULT 'MONTHLY',
  duration_days INT DEFAULT 30,
  features JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  plan_id UUID REFERENCES plans(id) NOT NULL,
  status TEXT DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE,
  payment_gateway_id TEXT,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subscription_id UUID REFERENCES subscriptions(id),
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  amount NUMERIC NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id),
  amount NUMERIC NOT NULL,
  gateway TEXT NOT NULL,
  gateway_txn_id TEXT,
  status TEXT DEFAULT 'pending',
  gateway_response JSONB DEFAULT '{}'::jsonb,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Landing Pages
CREATE TABLE IF NOT EXISTS landing_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  target_plan_id UUID REFERENCES plans(id),
  facebook_pixel_id TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- Policies (may fail if already exists, that is fine)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenant_leads_all" ON leads FOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);

ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenant_pipeline_stages_all" ON pipeline_stages FOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenant_plans_all" ON plans FOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);
