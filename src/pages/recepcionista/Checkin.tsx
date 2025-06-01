
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Search, 
  QrCode, 
  User, 
  Calendar, 
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Camera
} from 'lucide-react';

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  cpf: string;
  foto: string;
  plano: string;
  dataVencimento: string;
  status: 'ativo' | 'pendente' | 'vencido' | 'bloqueado';
  ultimoCheckin?: string;
  checkinAtivo: boolean;
}

interface CheckinLog {
  id: number;
  aluno: string;
  tipo: 'entrada' | 'saida';
  horario: string;
  status: string;
}

const RecepcionistaCheckin: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [feedback, setFeedback] = useState<{tipo: 'success' | 'error' | 'info', mensagem: string} | null>(null);

  // Dados simulados de alunos
  const alunos: Aluno[] = [
    {
      id: 1,
      nome: 'Maria Silva Santos',
      matricula: '2024001',
      cpf: '123.456.789-00',
      foto: '/placeholder.svg',
      plano: 'Premium Anual',
      dataVencimento: '15/06/2025',
      status: 'ativo',
      ultimoCheckin: '31/05/2025 09:30',
      checkinAtivo: false
    },
    {
      id: 2,
      nome: 'João Santos Oliveira',
      matricula: '2024002',
      cpf: '987.654.321-00',
      foto: '/placeholder.svg',
      plano: 'Básico Mensal',
      dataVencimento: '02/06/2025',
      status: 'pendente',
      ultimoCheckin: '30/05/2025 18:45',
      checkinAtivo: true
    },
    {
      id: 3,
      nome: 'Ana Costa Lima',
      matricula: '2024003',
      cpf: '456.789.123-00',
      foto: '/placeholder.svg',
      plano: 'Premium Mensal',
      dataVencimento: '25/05/2025',
      status: 'vencido',
      ultimoCheckin: '20/05/2025 07:15',
      checkinAtivo: false
    }
  ];

  // Log de check-ins recentes
  const [logCheckins, setLogCheckins] = useState<CheckinLog[]>([
    {
      id: 1,
      aluno: 'Pedro Ferreira',
      tipo: 'entrada',
      horario: '14:32',
      status: 'ativo'
    },
    {
      id: 2,
      aluno: 'Carla Rodrigues',
      tipo: 'saida',
      horario: '14:28',
      status: 'ativo'
    },
    {
      id: 3,
      aluno: 'Lucas Martins',
      tipo: 'entrada',
      horario: '14:15',
      status: 'ativo'
    }
  ]);

  const buscarAluno = () => {
    if (!busca.trim()) {
      setFeedback({tipo: 'error', mensagem: 'Digite um nome, CPF ou matrícula para buscar'});
      return;
    }

    const alunoEncontrado = alunos.find(aluno => 
      aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
      aluno.cpf.includes(busca) ||
      aluno.matricula.includes(busca)
    );

    if (alunoEncontrado) {
      setAlunoSelecionado(alunoEncontrado);
      setFeedback(null);
    } else {
      setAlunoSelecionado(null);
      setFeedback({tipo: 'error', mensagem: 'Aluno não encontrado. Verifique os dados informados.'});
    }
  };

  const realizarCheckin = () => {
    if (!alunoSelecionado) return;

    if (alunoSelecionado.status === 'vencido' || alunoSelecionado.status === 'bloqueado') {
      setFeedback({tipo: 'error', mensagem: 'Check-in não permitido. Plano vencido ou bloqueado.'});
      return;
    }

    // Simular check-in
    const novoLog: CheckinLog = {
      id: logCheckins.length + 1,
      aluno: alunoSelecionado.nome,
      tipo: 'entrada',
      horario: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}),
      status: alunoSelecionado.status
    };

    setLogCheckins([novoLog, ...logCheckins.slice(0, 4)]);
    setAlunoSelecionado({...alunoSelecionado, checkinAtivo: true});
    setFeedback({tipo: 'success', mensagem: `Check-in de ${alunoSelecionado.nome} realizado com sucesso!`});
  };

  const realizarCheckout = () => {
    if (!alunoSelecionado) return;

    // Simular check-out
    const novoLog: CheckinLog = {
      id: logCheckins.length + 1,
      aluno: alunoSelecionado.nome,
      tipo: 'saida',
      horario: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}),
      status: alunoSelecionado.status
    };

    setLogCheckins([novoLog, ...logCheckins.slice(0, 4)]);
    setAlunoSelecionado({...alunoSelecionado, checkinAtivo: false});
    setFeedback({tipo: 'success', mensagem: `Check-out de ${alunoSelecionado.nome} realizado com sucesso!`});
  };

  const simularEscanearCodigo = () => {
    // Simular escaneamento escolhendo um aluno aleatório
    const alunoAleatorio = alunos[Math.floor(Math.random() * alunos.length)];
    setAlunoSelecionado(alunoAleatorio);
    setBusca(alunoAleatorio.nome);
    setFeedback({tipo: 'info', mensagem: 'Código escaneado com sucesso!'});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800 border-green-200';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'vencido': return 'bg-red-100 text-red-800 border-red-200';
      case 'bloqueado': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'pendente': return 'Pendente';
      case 'vencido': return 'Vencido';
      case 'bloqueado': return 'Bloqueado';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Check-in / Check-out</h1>
          <p className="text-gray-600 mt-2">Controle de entrada e saída dos alunos</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Busca de Aluno */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Buscar Aluno
              </CardTitle>
              <CardDescription>
                Digite o nome, CPF, matrícula ou escaneie o código do aluno
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Nome, CPF ou Matrícula do aluno..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && buscarAluno()}
                  className="flex-1"
                />
                <Button onClick={buscarAluno}>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={simularEscanearCodigo}
                  className="flex-1"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Escanear Código QR
                </Button>
                <Button 
                  variant="outline" 
                  onClick={simularEscanearCodigo}
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Escanear Carteirinha
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dados do Aluno Selecionado */}
          {alunoSelecionado && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Dados do Aluno</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-xl font-semibold">{alunoSelecionado.nome}</h3>
                      <p className="text-gray-600">Matrícula: {alunoSelecionado.matricula}</p>
                      <p className="text-gray-600">CPF: {alunoSelecionado.cpf}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{alunoSelecionado.plano}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Vence: {alunoSelecionado.dataVencimento}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(alunoSelecionado.status)}>
                        {getStatusText(alunoSelecionado.status)}
                      </Badge>
                      
                      {alunoSelecionado.checkinAtivo && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Activity className="h-3 w-3 mr-1" />
                          Na Academia
                        </Badge>
                      )}
                    </div>
                    
                    {alunoSelecionado.ultimoCheckin && (
                      <p className="text-sm text-gray-500">
                        Último check-in: {alunoSelecionado.ultimoCheckin}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={realizarCheckin}
                    disabled={alunoSelecionado.checkinAtivo || alunoSelecionado.status === 'vencido' || alunoSelecionado.status === 'bloqueado'}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Registrar Check-in
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={realizarCheckout}
                    disabled={!alunoSelecionado.checkinAtivo}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Registrar Check-out
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Log de Check-ins Recentes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Últimos Check-ins
              </CardTitle>
              <CardDescription>Registro das últimas movimentações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logCheckins.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {log.tipo === 'entrada' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-blue-600" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{log.aluno}</p>
                      <p className="text-xs text-gray-500">
                        {log.tipo === 'entrada' ? 'Entrada' : 'Saída'} às {log.horario}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getStatusText(log.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecepcionistaCheckin;
