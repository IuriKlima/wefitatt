import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building, Network, Check, Edit, Star } from 'lucide-react';

const plans = [
  {
    id: 'personal',
    name: 'Personal',
    icon: Users,
    price: 49,
    billing: 'mês',
    roleCreated: 'instrutor',
    activeTenants: 43,
    features: ['Até 50 alunos', 'App do aluno', 'Treinos personalizados', 'Agendamento', 'Pagamentos online'],
    limits: { maxStudents: 50, maxInstructors: 1, units: 0 }
  },
  {
    id: 'academia',
    name: 'Academia',
    icon: Building,
    price: 99,
    billing: 'mês',
    roleCreated: 'gestor',
    activeTenants: 112,
    popular: true,
    features: ['Membros ilimitados', 'Controle de acesso', 'Grade de aulas', 'Financeiro completo', 'Gestão de equipe', 'Relatórios', 'Recepcionista'],
    limits: { maxStudents: -1, maxInstructors: 10, units: 1 }
  },
  {
    id: 'rede',
    name: 'Rede',
    icon: Network,
    price: 299,
    billing: 'mês',
    roleCreated: 'administrador',
    activeTenants: 32,
    features: ['Multi-unidades', 'Painel global', 'Analytics comparativo', 'RBAC avançado', 'Suporte 24/7', 'API dedicada', 'White-label'],
    limits: { maxStudents: -1, maxInstructors: -1, units: -1 }
  }
];

const Plans = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Planos do Sistema</h1>
          <p className="text-sm text-muted-foreground">Configure os planos de assinatura da plataforma WeFit</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-500 text-white">Criar Novo Plano</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`p-6 relative ${plan.popular ? 'border-purple-500/40 shadow-lg shadow-purple-500/5' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 right-6">
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <Star className="h-3 w-3" /> MAIS POPULAR
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <plan.icon className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold">{plan.name}</h3>
                <span className="text-xs text-muted-foreground">Role: {plan.roleCreated}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold">R${plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.billing}</span></div>
            </div>

            <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-muted/50">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{plan.activeTenants} tenants ativos</span>
            </div>

            <div className="space-y-2 mb-6">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-muted/30 text-xs mb-4">
              <div className="font-medium text-muted-foreground uppercase tracking-wider mb-1">Limites</div>
              <div className="flex justify-between">
                <span>Alunos</span>
                <span className="font-medium">{plan.limits.maxStudents === -1 ? 'Ilimitado' : plan.limits.maxStudents}</span>
              </div>
              <div className="flex justify-between">
                <span>Instrutores</span>
                <span className="font-medium">{plan.limits.maxInstructors === -1 ? 'Ilimitado' : plan.limits.maxInstructors}</span>
              </div>
              <div className="flex justify-between">
                <span>Unidades</span>
                <span className="font-medium">{plan.limits.units === -1 ? 'Ilimitado' : plan.limits.units === 0 ? 'N/A' : plan.limits.units}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar Plano
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Plans;
