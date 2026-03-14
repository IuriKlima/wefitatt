import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Building, Search, Filter, MoreHorizontal,
  CheckCircle, XCircle, Clock, Users, CreditCard
} from 'lucide-react';

const mockTenants = [
  { id: '1', name: 'PowerGym São Paulo', plan: 'Academia', status: 'active', users: 45, mrr: 99, created: '2026-01-15', email: 'admin@powergym.com' },
  { id: '2', name: 'FitMax Rede', plan: 'Rede', status: 'active', users: 180, mrr: 299, created: '2025-11-20', email: 'contato@fitmax.com' },
  { id: '3', name: 'Carlos Personal', plan: 'Personal', status: 'active', users: 28, mrr: 49, created: '2026-02-10', email: 'carlos@personal.com' },
  { id: '4', name: 'BodyShape Rio', plan: 'Academia', status: 'trial', users: 12, mrr: 0, created: '2026-03-10', email: 'rj@bodyshape.com' },
  { id: '5', name: 'EliteFit Network', plan: 'Rede', status: 'trial', users: 5, mrr: 0, created: '2026-03-12', email: 'admin@elitefit.com' },
  { id: '6', name: 'Gym Plus Curitiba', plan: 'Academia', status: 'inactive', users: 0, mrr: 0, created: '2025-08-05', email: 'info@gymplus.com' },
  { id: '7', name: 'Marina Personal', plan: 'Personal', status: 'active', users: 15, mrr: 49, created: '2026-01-28', email: 'marina@trainer.com' },
  { id: '8', name: 'CrossZone SP', plan: 'Academia', status: 'active', users: 78, mrr: 99, created: '2025-12-01', email: 'admin@crosszone.com' },
];

const Tenants = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = mockTenants.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.status === filter;
    return matchSearch && matchFilter;
  });

  const statusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'trial': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return null;
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'trial': return 'Trial';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const counts = {
    all: mockTenants.length,
    active: mockTenants.filter(t => t.status === 'active').length,
    trial: mockTenants.filter(t => t.status === 'trial').length,
    inactive: mockTenants.filter(t => t.status === 'inactive').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gerenciar Tenants</h1>
        <p className="text-sm text-muted-foreground">Todas as contas cadastradas na plataforma WeFit</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: counts.all, color: 'text-foreground' },
          { label: 'Ativos', value: counts.active, color: 'text-emerald-500' },
          { label: 'Trial', value: counts.trial, color: 'text-yellow-500' },
          { label: 'Inativos', value: counts.inactive, color: 'text-red-400' },
        ].map((s, i) => (
          <Card key={i} className="p-4 text-center cursor-pointer hover:border-purple-500/30 transition-colors"
                onClick={() => setFilter(i === 0 ? 'all' : ['all', 'active', 'trial', 'inactive'][i])}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'active', 'trial', 'inactive'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(f)}
              className="text-xs"
            >
              {f === 'all' ? 'Todos' : statusLabel(f)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-muted-foreground font-medium text-xs">Tenant</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-xs">Plano</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-xs">Status</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-xs">Usuários</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-xs">MRR</th>
                <th className="text-left p-4 text-muted-foreground font-medium text-xs">Criado</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Building className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-500">{t.plan}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      {statusIcon(t.status)}
                      <span className="text-xs">{statusLabel(t.status)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {t.users}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3 text-muted-foreground" />
                      {t.mrr > 0 ? `R$${t.mrr}` : '—'}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(t.created).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Tenants;
