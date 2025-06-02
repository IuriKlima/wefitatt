
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, DollarSign, TrendingUp, MapPin, Phone, Mail, Plus, Eye, Edit, BarChart3 } from 'lucide-react';

const AdminUnidades: React.FC = () => {
  const unidades = [
    {
      id: 1,
      nome: 'Wefit Centro',
      endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP',
      telefone: '(11) 3456-7890',
      email: 'centro@wefit.com.br',
      gestor: 'Carlos Silva',
      alunos: 680,
      receita: 168000,
      crescimento: 12.5,
      status: 'ativa',
      inauguracao: '2022-03-15'
    },
    {
      id: 2,
      nome: 'Wefit Paulista',
      endereco: 'Rua Augusta, 2690 - Jardins, São Paulo - SP',
      telefone: '(11) 3456-7891',
      email: 'paulista@wefit.com.br',
      gestor: 'Ana Costa',
      alunos: 620,
      receita: 155000,
      crescimento: 8.2,
      status: 'ativa',
      inauguracao: '2021-11-20'
    },
    {
      id: 3,
      nome: 'Wefit Ipanema',
      endereco: 'Rua Visconde de Pirajá, 550 - Ipanema, Rio de Janeiro - RJ',
      telefone: '(21) 3456-7892',
      email: 'ipanema@wefit.com.br',
      gestor: 'Pedro Santos',
      alunos: 580,
      receita: 145000,
      crescimento: 15.1,
      status: 'ativa',
      inauguracao: '2023-01-10'
    },
    {
      id: 4,
      nome: 'Wefit Vila Madalena',
      endereco: 'Rua Harmonia, 765 - Vila Madalena, São Paulo - SP',
      telefone: '(11) 3456-7893',
      email: 'vilamadalena@wefit.com.br',
      gestor: 'Juliana Oliveira',
      alunos: 420,
      receita: 105000,
      crescimento: -2.1,
      status: 'manutencao',
      inauguracao: '2022-08-05'
    },
    {
      id: 5,
      nome: 'Wefit Moema',
      endereco: 'Av. Ibirapuera, 3103 - Moema, São Paulo - SP',
      telefone: '(11) 3456-7894',
      email: 'moema@wefit.com.br',
      gestor: 'Roberto Lima',
      alunos: 380,
      receita: 95000,
      crescimento: 5.8,
      status: 'ativa',
      inauguracao: '2023-05-12'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativa': return <Badge variant="default" className="bg-green-500">Ativa</Badge>;
      case 'manutencao': return <Badge variant="secondary" className="bg-yellow-500">Manutenção</Badge>;
      case 'inativa': return <Badge variant="destructive">Inativa</Badge>;
      default: return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Unidades Wefit</h1>
          <p className="text-gray-600 mt-2">Administre todas as unidades da rede Wefit</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Unidade
        </Button>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Unidades</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unidades.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unidades.reduce((sum, u) => sum + u.alunos, 0).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {unidades.reduce((sum, u) => sum + u.receita, 0).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{(unidades.reduce((sum, u) => sum + u.crescimento, 0) / unidades.length).toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Unidades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {unidades.map((unidade) => (
          <Card key={unidade.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{unidade.nome}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {unidade.endereco}
                  </CardDescription>
                </div>
                {getStatusBadge(unidade.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Informações de Contato */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {unidade.telefone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    {unidade.email}
                  </div>
                </div>

                {/* Gestor */}
                <div className="text-sm">
                  <span className="font-medium">Gestor:</span> {unidade.gestor}
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{unidade.alunos}</div>
                    <div className="text-xs text-gray-600">Alunos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">R$ {unidade.receita.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Receita</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${unidade.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {unidade.crescimento >= 0 ? '+' : ''}{unidade.crescimento}%
                    </div>
                    <div className="text-xs text-gray-600">Crescimento</div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Dashboard
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </div>

                {/* Data de Inauguração */}
                <div className="text-xs text-gray-500 text-center">
                  Inaugurada em {new Date(unidade.inauguracao).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUnidades;
