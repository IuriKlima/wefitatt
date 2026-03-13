import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Target,
  Star,
  Activity,
  ArrowUp,
  ArrowDown,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';

const AdminDashboard: React.FC = () => {
  const alunosEvolution = [
    { mes: 'Jun', alunos: 2450 },
    { mes: 'Jul', alunos: 2680 },
    { mes: 'Ago', alunos: 2890 },
    { mes: 'Set', alunos: 3120 },
    { mes: 'Out', alunos: 3350 },
    { mes: 'Nov', alunos: 3580 },
    { mes: 'Dez', alunos: 3780 }
  ];

  const mrrData = [
    { mes: 'Jun', mrr: 485000 },
    { mes: 'Jul', mrr: 512000 },
    { mes: 'Ago', mrr: 548000 },
    { mes: 'Set', mrr: 578000 },
    { mes: 'Out', mrr: 612000 },
    { mes: 'Nov', mrr: 645000 },
    { mes: 'Dez', mrr: 678000 }
  ];

  const unidadesPerformance = [
    { nome: 'Wefit Centro', alunos: 680, receita: 168000, crescimento: 12.5 },
    { nome: 'Wefit Paulista', alunos: 620, receita: 155000, crescimento: 8.2 },
    { nome: 'Wefit Ipanema', alunos: 580, receita: 145000, crescimento: 15.1 },
    { nome: 'Wefit Vila Madalena', alunos: 420, receita: 105000, crescimento: -2.1 },
    { nome: 'Wefit Moema', alunos: 380, receita: 95000, crescimento: 5.8 }
  ];

  const alertas = [
    { id: 1, tipo: 'critico', titulo: 'Gateway de Pagamento Instável', descricao: 'Integração com PagSeguro apresentando falhas', tempo: '15 min' },
    { id: 2, tipo: 'warning', titulo: 'Backup Pendente', descricao: 'Backup diário ainda não foi executado', tempo: '2h' },
    { id: 3, tipo: 'info', titulo: 'Nova Versão Disponível', descricao: 'App móvel v2.1.5 aguardando aprovação', tempo: '4h' }
  ];

  const kpis = [
    { title: 'Unidades Ativas', value: '24', sub: '+2 novos neste mês', icon: Building2, color: 'from-purple-500 to-indigo-600', trend: null },
    { title: 'Alunos Ativos', value: '3.784', sub: '+5.8% vs mês anterior', icon: Users, color: 'from-blue-500 to-cyan-500', trend: 'up' },
    { title: 'MRR Global', value: 'R$ 678K', sub: '+5.1% crescimento mensal', icon: DollarSign, color: 'from-emerald-500 to-teal-500', trend: 'up' },
    { title: 'NPS Global', value: '74', sub: 'Média ponderada', icon: Star, color: 'from-amber-500 to-orange-500', trend: null },
  ];

  const metrics = [
    { title: 'LTV Médio', value: 'R$ 2.450', sub: 'Lifetime Value por aluno', icon: TrendingUp },
    { title: 'CAC Global', value: 'R$ 125', sub: 'Custo de Aquisição', icon: Target },
    { title: 'Taxa de Retenção', value: '87.2%', sub: '+2.1% vs trimestre anterior', icon: Activity, trend: 'up' },
    { title: 'Usuários Totais', value: '3.947', sub: 'Todos os perfis', icon: Users },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
        <p className="text-muted-foreground text-sm ml-11">Visão completa da plataforma e performance das unidades</p>
      </div>

      {/* KPI Cards - Main */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className={`relative overflow-hidden border-border/50 bg-card hover:border-border transition-all duration-300 animate-fade-in-delay-${i + 1}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}
                  style={{ boxShadow: `0 4px 14px -3px var(--tw-shadow-color, rgba(139, 92, 246, 0.25))` }}>
                  <kpi.icon className="h-5 w-5 text-white" />
                </div>
                {kpi.trend === 'up' && (
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-semibold">
                    <ArrowUp className="h-3 w-3" />
                    up
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-foreground tracking-tight">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{kpi.title}</div>
              <div className="text-[11px] text-muted-foreground/70 mt-0.5">{kpi.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">{m.title}</span>
              <m.icon className="h-4 w-4 text-muted-foreground/60" />
            </div>
            <div className="text-xl font-bold text-foreground">{m.value}</div>
            <p className="text-[11px] text-muted-foreground/70 mt-1 flex items-center">
              {m.trend === 'up' && <ArrowUp className="h-3 w-3 text-emerald-500 mr-0.5" />}
              {m.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Evolução de Alunos</CardTitle>
            <CardDescription className="text-xs">Últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={alunosEvolution}>
                <defs>
                  <linearGradient id="gradientAlunos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(258, 90%, 65%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(258, 90%, 65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 25%, 12%)',
                    border: '1px solid hsl(222, 20%, 18%)',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: 'hsl(220, 15%, 90%)'
                  }}
                />
                <Area type="monotone" dataKey="alunos" stroke="hsl(258, 90%, 65%)" strokeWidth={2.5} fill="url(#gradientAlunos)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Receita Recorrente (MRR)</CardTitle>
            <CardDescription className="text-xs">Últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mrrData} barSize={32}>
                <defs>
                  <linearGradient id="gradientMRR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 84%, 50%)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="hsl(160, 84%, 40%)" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'MRR']}
                  contentStyle={{
                    backgroundColor: 'hsl(222, 25%, 12%)',
                    border: '1px solid hsl(222, 20%, 18%)',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: 'hsl(220, 15%, 90%)'
                  }}
                />
                <Bar dataKey="mrr" fill="url(#gradientMRR)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Performance das Unidades</CardTitle>
            <CardDescription className="text-xs">Top 5 por receita</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {unidadesPerformance.map((unidade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{unidade.nome}</div>
                      <div className="text-[11px] text-muted-foreground">{unidade.alunos} alunos</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">R$ {unidade.receita.toLocaleString()}</div>
                    <div className={`text-[11px] flex items-center justify-end font-semibold ${unidade.crescimento >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
                      {unidade.crescimento >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                      {Math.abs(unidade.crescimento)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Alertas do Sistema</CardTitle>
            <CardDescription className="text-xs">Monitoramento em tempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {alertas.map((alerta) => (
                <div key={alerta.id} className="flex items-start gap-3 p-3 rounded-xl border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className={`mt-0.5 p-1.5 rounded-lg ${
                    alerta.tipo === 'critico' ? 'bg-red-500/10 text-red-400' :
                    alerta.tipo === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="text-sm font-medium text-foreground">{alerta.titulo}</div>
                      <Badge variant="outline" className={`text-[10px] shrink-0 rounded-full px-2 border-0 font-semibold ${
                        alerta.tipo === 'critico' ? 'bg-red-500/10 text-red-400' :
                        alerta.tipo === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {alerta.tempo}
                      </Badge>
                    </div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">{alerta.descricao}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
