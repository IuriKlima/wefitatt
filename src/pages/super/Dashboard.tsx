import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users, Building, CreditCard, TrendingUp, BarChart3,
  ArrowUpRight, ArrowDownRight, DollarSign, Activity, Shield
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const revenueData = [
  { name: 'Set', mrr: 12400 }, { name: 'Out', mrr: 14800 },
  { name: 'Nov', mrr: 16200 }, { name: 'Dez', mrr: 18900 },
  { name: 'Jan', mrr: 21400 }, { name: 'Fev', mrr: 24800 },
  { name: 'Mar', mrr: 28200 },
];

const tenantGrowth = [
  { name: 'Set', new: 12 }, { name: 'Out', new: 18 },
  { name: 'Nov', new: 22 }, { name: 'Dez', new: 15 },
  { name: 'Jan', new: 28 }, { name: 'Fev', new: 35 },
  { name: 'Mar', new: 42 },
];

const SuperDashboard = () => {
  const stats = [
    { label: 'MRR', value: 'R$ 28.200', change: '+13.7%', up: true, icon: DollarSign, color: 'emerald' },
    { label: 'Tenants Ativos', value: '187', change: '+42 este mês', up: true, icon: Building, color: 'purple' },
    { label: 'Usuários Totais', value: '4.832', change: '+12.4%', up: true, icon: Users, color: 'blue' },
    { label: 'Churn Rate', value: '2.1%', change: '-0.3%', up: false, icon: Activity, color: 'yellow' },
  ];

  const recentTenants = [
    { name: 'PowerGym SP', plan: 'Academia', status: 'Ativo', date: '13/03/2026' },
    { name: 'FitMax Rede', plan: 'Rede', status: 'Trial', date: '12/03/2026' },
    { name: 'Carlos Personal', plan: 'Personal', status: 'Ativo', date: '12/03/2026' },
    { name: 'BodyShape RJ', plan: 'Academia', status: 'Ativo', date: '11/03/2026' },
    { name: 'EliteFit Network', plan: 'Rede', status: 'Trial', date: '10/03/2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel SaaS</h1>
          <p className="text-sm text-muted-foreground">Gestão completa da plataforma WeFit</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-purple-500" />
          <span className="text-xs font-medium text-purple-500 bg-purple-500/10 px-2 py-1 rounded-full">Super Admin</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-emerald-500' : 'text-yellow-500'}`}>
              {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {stat.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Receita Recorrente (MRR)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Últimos 7 meses</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString()}`, 'MRR']} />
                <Area type="monotone" dataKey="mrr" stroke="#8B5CF6" strokeWidth={2} fill="url(#mrrGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-500" />
            Novos Tenants
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Cadastros por mês</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenantGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="new" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Novos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Tenants */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Tenants Recentes</h3>
          <Button variant="ghost" size="sm" className="text-xs">Ver todos</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-muted-foreground font-medium text-xs">Nome</th>
                <th className="text-left py-2 text-muted-foreground font-medium text-xs">Plano</th>
                <th className="text-left py-2 text-muted-foreground font-medium text-xs">Status</th>
                <th className="text-left py-2 text-muted-foreground font-medium text-xs">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentTenants.map((t, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3 font-medium">{t.name}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-500">{t.plan}</span>
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      t.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>{t.status}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SuperDashboard;
