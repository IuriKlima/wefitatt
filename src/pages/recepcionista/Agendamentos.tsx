
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CalendarCheck, 
  Search, 
  User, 
  Clock, 
  Users, 
  Filter,
  CheckCircle,
  UserPlus,
  Calendar
} from 'lucide-react';

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  plano: string;
  status: string;
}

interface Aula {
  id: number;
  nome: string;
  instrutor: string;
  horario: string;
  data: string;
  vagas: number;
  ocupadas: number;
  tipo: string;
  duracao: number;
}

interface Agendamento {
  id: number;
  aluno: string;
  aula: string;
  data: string;
  horario: string;
  status: 'confirmado' | 'lista_espera' | 'cancelado';
}

const RecepcionistaAgendamentos: React.FC = () => {
  const [etapa, setEtapa] = useState<'selecionar_aluno' | 'selecionar_aula' | 'confirmar'>('selecionar_aluno');
  const [buscaAluno, setBuscaAluno] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [aulaSelecionada, setAulaSelecionada] = useState<Aula | null>(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroInstrutor, setFiltroInstrutor] = useState('todos');
  const [feedback, setFeedback] = useState<{tipo: 'success' | 'error' | 'info', mensagem: string} | null>(null);

  // Dados simulados
  const alunos: Aluno[] = [
    { id: 1, nome: 'Maria Silva Santos', matricula: '2024001', plano: 'Premium', status: 'ativo' },
    { id: 2, nome: 'João Santos Oliveira', matricula: '2024002', plano: 'Básico', status: 'ativo' },
    { id: 3, nome: 'Ana Costa Lima', matricula: '2024003', plano: 'Premium', status: 'pendente' },
    { id: 4, nome: 'Pedro Ferreira', matricula: '2024004', plano: 'Básico', status: 'ativo' },
    { id: 5, nome: 'Carla Rodrigues', matricula: '2024005', plano: 'Premium', status: 'ativo' }
  ];

  const aulas: Aula[] = [
    {
      id: 1,
      nome: 'Spinning',
      instrutor: 'Carlos Fitness',
      horario: '07:00',
      data: '2025-06-02',
      vagas: 15,
      ocupadas: 12,
      tipo: 'cardio',
      duracao: 45
    },
    {
      id: 2,
      nome: 'Pilates',
      instrutor: 'Ana Wellness',
      horario: '08:00',
      data: '2025-06-02',
      vagas: 12,
      ocupadas: 8,
      tipo: 'pilates',
      duracao: 60
    },
    {
      id: 3,
      nome: 'Yoga',
      instrutor: 'Marina Zen',
      horario: '09:00',
      data: '2025-06-02',
      vagas: 10,
      ocupadas: 6,
      tipo: 'relaxamento',
      duracao: 75
    },
    {
      id: 4,
      nome: 'HIIT',
      instrutor: 'Pedro Strong',
      horario: '18:00',
      data: '2025-06-02',
      vagas: 20,
      ocupadas: 18,
      tipo: 'funcional',
      duracao: 45
    },
    {
      id: 5,
      nome: 'Zumba',
      instrutor: 'Lucia Dance',
      horario: '19:00',
      data: '2025-06-02',
      vagas: 25,
      ocupadas: 25,
      tipo: 'danca',
      duracao: 50
    },
    {
      id: 6,
      nome: 'Spinning',
      instrutor: 'Carlos Fitness',
      horario: '18:00',
      data: '2025-06-03',
      vagas: 15,
      ocupadas: 10,
      tipo: 'cardio',
      duracao: 45
    }
  ];

  const buscarAluno = () => {
    const alunoEncontrado = alunos.find(aluno => 
      aluno.nome.toLowerCase().includes(buscaAluno.toLowerCase()) ||
      aluno.matricula.includes(buscaAluno)
    );

    if (alunoEncontrado) {
      setAlunoSelecionado(alunoEncontrado);
      setEtapa('selecionar_aula');
      setFeedback(null);
    } else {
      setFeedback({tipo: 'error', mensagem: 'Aluno não encontrado. Verifique o nome ou matrícula.'});
    }
  };

  const selecionarAula = (aula: Aula) => {
    setAulaSelecionada(aula);
    setEtapa('confirmar');
  };

  const confirmarAgendamento = (tipo: 'inscricao' | 'lista_espera') => {
    if (!alunoSelecionado || !aulaSelecionada) return;

    const novoAgendamento: Agendamento = {
      id: Date.now(),
      aluno: alunoSelecionado.nome,
      aula: aulaSelecionada.nome,
      data: aulaSelecionada.data,
      horario: aulaSelecionada.horario,
      status: tipo === 'inscricao' ? 'confirmado' : 'lista_espera'
    };

    if (tipo === 'inscricao') {
      setFeedback({
        tipo: 'success',
        mensagem: `${alunoSelecionado.nome} foi inscrito(a) na aula de ${aulaSelecionada.nome} às ${aulaSelecionada.horario}!`
      });
    } else {
      setFeedback({
        tipo: 'info',
        mensagem: `${alunoSelecionado.nome} foi adicionado(a) à lista de espera da aula de ${aulaSelecionada.nome}.`
      });
    }

    // Reset
    setTimeout(() => {
      setEtapa('selecionar_aluno');
      setBuscaAluno('');
      setAlunoSelecionado(null);
      setAulaSelecionada(null);
      setFeedback(null);
    }, 3000);
  };

  const voltarEtapa = () => {
    if (etapa === 'confirmar') {
      setEtapa('selecionar_aula');
      setAulaSelecionada(null);
    } else if (etapa === 'selecionar_aula') {
      setEtapa('selecionar_aluno');
      setAlunoSelecionado(null);
    }
  };

  const aulasFiltradasFiltradas = aulas.filter(aula => {
    const matchTipo = filtroTipo === 'todos' || aula.tipo === filtroTipo;
    const matchInstrutor = filtroInstrutor === 'todos' || aula.instrutor === filtroInstrutor;
    return matchTipo && matchInstrutor;
  });

  const instrutores = [...new Set(aulas.map(aula => aula.instrutor))];
  const tipos = [...new Set(aulas.map(aula => aula.tipo))];

  const getStatusAula = (aula: Aula) => {
    if (aula.ocupadas >= aula.vagas) return { text: 'Lotada', color: 'bg-red-100 text-red-800' };
    if (aula.ocupadas >= aula.vagas * 0.8) return { text: 'Quase Lotada', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Vagas Disponíveis', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamento de Aulas</h1>
          <p className="text-gray-600 mt-2">Inscreva alunos nas aulas disponíveis</p>
        </div>
        
        {/* Indicador de Etapas */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            etapa === 'selecionar_aluno' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            etapa === 'selecionar_aula' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            etapa === 'confirmar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <Alert className={
          feedback.tipo === 'success' ? 'border-green-500 bg-green-50' :
          feedback.tipo === 'error' ? 'border-red-500 bg-red-50' :
          'border-blue-500 bg-blue-50'
        }>
          <AlertDescription className={
            feedback.tipo === 'success' ? 'text-green-700' :
            feedback.tipo === 'error' ? 'text-red-700' :
            'text-blue-700'
          }>
            {feedback.mensagem}
          </AlertDescription>
        </Alert>
      )}

      {/* Etapa 1: Selecionar Aluno */}
      {etapa === 'selecionar_aluno' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Passo 1: Selecionar Aluno
            </CardTitle>
            <CardDescription>Busque o aluno que deseja inscrever na aula</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Digite o nome ou matrícula do aluno..."
                value={buscaAluno}
                onChange={(e) => setBuscaAluno(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && buscarAluno()}
                className="flex-1"
              />
              <Button onClick={buscarAluno}>
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>

            {/* Lista de alunos recentes/sugestões */}
            <div>
              <h4 className="font-medium mb-2">Alunos Recentes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {alunos.slice(0, 4).map((aluno) => (
                  <div 
                    key={aluno.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setAlunoSelecionado(aluno);
                      setBuscaAluno(aluno.nome);
                      setEtapa('selecionar_aula');
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{aluno.nome}</p>
                        <p className="text-sm text-gray-600">Mat: {aluno.matricula}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {aluno.plano}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Etapa 2: Selecionar Aula */}
      {etapa === 'selecionar_aula' && alunoSelecionado && (
        <div className="space-y-6">
          {/* Aluno Selecionado */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Aluno Selecionado</h3>
                  <p className="text-lg">{alunoSelecionado.nome}</p>
                  <p className="text-sm text-gray-600">
                    {alunoSelecionado.matricula} • {alunoSelecionado.plano}
                  </p>
                </div>
                <Button variant="outline" onClick={voltarEtapa}>
                  Trocar Aluno
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Aula</label>
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      {tipos.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Instrutor</label>
                  <Select value={filtroInstrutor} onValueChange={setFiltroInstrutor}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      {instrutores.map((instrutor) => (
                        <SelectItem key={instrutor} value={instrutor}>
                          {instrutor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grade de Aulas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Passo 2: Selecionar Aula
              </CardTitle>
              <CardDescription>Escolha a aula para inscrever o aluno</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aulasFiltradasFiltradas.map((aula) => {
                  const status = getStatusAula(aula);
                  return (
                    <div 
                      key={aula.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => selecionarAula(aula)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{aula.nome}</h3>
                          <p className="text-gray-600">{aula.instrutor}</p>
                        </div>
                        <Badge className={status.color}>
                          {status.text}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{aula.horario} - {aula.duracao}min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{new Date(aula.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{aula.ocupadas}/{aula.vagas} alunos</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(aula.ocupadas / aula.vagas) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Etapa 3: Confirmar */}
      {etapa === 'confirmar' && alunoSelecionado && aulaSelecionada && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Passo 3: Confirmar Agendamento
            </CardTitle>
            <CardDescription>Revise os dados e confirme a inscrição</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Resumo do Agendamento</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Aluno</p>
                  <p className="font-medium">{alunoSelecionado.nome}</p>
                </div>
                <div>
                  <p className="text-gray-600">Matrícula</p>
                  <p className="font-medium">{alunoSelecionado.matricula}</p>
                </div>
                <div>
                  <p className="text-gray-600">Aula</p>
                  <p className="font-medium">{aulaSelecionada.nome}</p>
                </div>
                <div>
                  <p className="text-gray-600">Instrutor</p>
                  <p className="font-medium">{aulaSelecionada.instrutor}</p>
                </div>
                <div>
                  <p className="text-gray-600">Data</p>
                  <p className="font-medium">{new Date(aulaSelecionada.data).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Horário</p>
                  <p className="font-medium">{aulaSelecionada.horario}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={voltarEtapa} className="flex-1">
                Voltar
              </Button>
              
              {aulaSelecionada.ocupadas < aulaSelecionada.vagas ? (
                <Button onClick={() => confirmarAgendamento('inscricao')} className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Inscrever na Aula
                </Button>
              ) : (
                <Button onClick={() => confirmarAgendamento('lista_espera')} variant="outline" className="flex-1">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar à Lista de Espera
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecepcionistaAgendamentos;
