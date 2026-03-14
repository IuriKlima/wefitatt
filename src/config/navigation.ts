import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Settings, 
  BarChart3,
  GraduationCap,
  Calendar,
  UserCheck,
  CreditCard,
  Dumbbell,
  ClipboardList,
  Activity,
  UserPlus,
  CalendarCheck,
  ShoppingCart,
  User,
  BookOpen,
  TrendingUp,
  Wallet,
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  Target,
  Package,
  Wrench,
  Mail,
  PartyPopper,
  Star,
  PieChart,
  FileText,
  Globe,
  Shield
} from 'lucide-react';
import { UserProfile } from '@/contexts/UserContext';

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const navigationConfig: Record<UserProfile, NavigationSection[]> = {
  super_admin: [
    {
      title: 'SaaS Management',
      items: [
        { title: 'Painel SaaS', href: '/super/dashboard', icon: LayoutDashboard },
        { title: 'Gerenciar Tenants', href: '/super/tenants', icon: Building2 },
        { title: 'Planos do Sistema', href: '/super/planos', icon: CreditCard },
      ],
    },
    {
      title: 'Configurações',
      items: [
        { title: 'Configurações Gerais', href: '/admin/configuracoes', icon: Settings },
      ],
    },
  ],
  administrador: [
    {
      title: 'Visão Global',
      items: [
        {
          title: 'Dashboard Global',
          href: '/admin/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Analytics Avançado',
          href: '/admin/analytics',
          icon: PieChart,
        },
      ],
    },
    {
      title: 'Gestão da Plataforma',
      items: [
        {
          title: 'Gerenciar Unidades',
          href: '/admin/unidades',
          icon: Building2,
        },
        {
          title: 'Gerenciar Usuários',
          href: '/admin/usuarios',
          icon: Users,
        },
        {
          title: 'Configurações do Sistema',
          href: '/admin/configuracoes',
          icon: Settings,
        },
      ],
    },
    {
      title: 'Relatórios e Auditoria',
      items: [
        {
          title: 'Relatórios Globais',
          href: '/admin/relatorios',
          icon: BarChart3,
        },
      ],
    },
  ],
  
  gestor: [
    {
      title: 'Gestão da Unidade',
      items: [
        {
          title: 'Dashboard (Unidade)',
          href: '/gestor/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Alunos da Unidade',
          href: '/gestor/alunos',
          icon: GraduationCap,
        },
        {
          title: 'Grade de Aulas',
          href: '/gestor/grade-aulas',
          icon: Calendar,
        },
        {
          title: 'Instrutores',
          href: '/gestor/instrutores',
          icon: UserCheck,
        },
        {
          title: 'Financeiro',
          href: '/gestor/financeiro',
          icon: CreditCard,
        },
        {
          title: 'Planos da Academia',
          href: '/gestor/planos',
          icon: FileText,
        },
      ],
    },
    {
      title: 'Operações',
      items: [
        {
          title: 'Metas e Performance',
          href: '/gestor/metas',
          icon: Target,
        },
        {
          title: 'Estoque',
          href: '/gestor/estoque',
          icon: Package,
        },
      ],
    },
    {
      title: 'Marketing & Vendas',
      items: [
        {
          title: 'Funil de Vendas (CRM)',
          href: '/gestor/crm',
          icon: Users,
          badge: 'Novo'
        },
        {
          title: 'Landing Page',
          href: '/gestor/landing-page',
          icon: Globe,
        },
      ],
    },
    {
      title: 'Engajamento',
      items: [
        {
          title: 'Feedback e NPS',
          href: '/gestor/feedback',
          icon: Star,
        },
        {
          title: 'Comunicação',
          href: '/gestor/comunicacao',
          icon: Mail,
        },
      ],
    },
    {
      title: 'Configurações',
      items: [
        {
          title: 'Configurações da Academia',
          href: '/gestor/configuracoes',
          icon: Settings,
        },
      ],
    },
  ],

  instrutor: [
    {
      title: 'Painel Principal',
      items: [
        {
          title: 'Dashboard',
          href: '/instrutor/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'Instrução',
      items: [
        {
          title: 'Minhas Aulas',
          href: '/instrutor/aulas',
          icon: Calendar,
        },
        {
          title: 'Meus Alunos',
          href: '/instrutor/alunos',
          icon: Users,
        },
        {
          title: 'Planos de Treino',
          href: '/instrutor/planos-treino',
          icon: ClipboardList,
        },
        {
          title: 'Biblioteca de Exercícios',
          href: '/instrutor/exercicios',
          icon: BookOpen,
        },
        {
          title: 'Avaliações Físicas',
          href: '/instrutor/avaliacoes',
          icon: Activity,
        },
      ],
    },
  ],

  recepcionista: [
    {
      title: 'Atendimento',
      items: [
        {
          title: 'Dashboard/Alertas',
          href: '/recepcionista/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Check-in / Check-out',
          href: '/recepcionista/checkin',
          icon: Activity,
        },
        {
          title: 'Cadastro Rápido',
          href: '/recepcionista/cadastro',
          icon: UserPlus,
        },
        {
          title: 'Agendamentos',
          href: '/recepcionista/agendamentos',
          icon: CalendarCheck,
        },
        {
          title: 'Ponto de Venda (POS)',
          href: '/recepcionista/pos',
          icon: ShoppingCart,
        },
        {
          title: 'Central de Alertas',
          href: '/recepcionista/alertas',
          icon: AlertTriangle,
        },
      ],
    },
    {
      title: 'Suporte e Gestão',
      items: [
        {
          title: 'Listas de Espera',
          href: '/recepcionista/lista-espera',
          icon: Users,
        },
        {
          title: 'Registrar Ocorrência',
          href: '/recepcionista/ocorrencias',
          icon: MessageSquare,
        },
        {
          title: 'FAQ Interno',
          href: '/recepcionista/faq',
          icon: HelpCircle,
        },
      ],
    },
  ],

  aluno: [
    {
      title: 'Minha Academia',
      items: [
        {
          title: 'Meu Painel',
          href: '/aluno/painel',
          icon: LayoutDashboard,
        },
        {
          title: 'Agendar Aulas',
          href: '/aluno/agendar',
          icon: Calendar,
        },
        {
          title: 'Meus Treinos',
          href: '/aluno/treinos',
          icon: Dumbbell,
        },
        {
          title: 'Meu Progresso',
          href: '/aluno/progresso',
          icon: TrendingUp,
        },
        {
          title: 'Gamificação',
          href: '/aluno/gamificacao',
          icon: Star,
        },
        {
          title: 'Minha Conta',
          href: '/aluno/conta',
          icon: Wallet,
        },
      ],
    },
  ],
};
