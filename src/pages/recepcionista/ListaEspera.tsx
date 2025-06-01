
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  X,
  UserCheck,
  Bell,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface AlunoListaEspera {
  id: number;
  nome: string;
  matricula: string;
  telefone: string;
  posicao: number;
  dataInscricao: string;
}

interface AulaComListaEspera {
  id: number;
  nome: string;
  instrutor: string;
  data: string;
  horario: string;
  vagasTotal: number;
  vagasOcupadas: number;
  listaEspera: AlunoListaEspera[];
}

const RecepcionistaListaEspera: React.FC = () => {
  const [feedback, setFeedback] = useState<{tipo: 'success' | 'error' | 'info', mensagem: string} | null>(null);

  const [aulas, setAulas] = useState<AulaComListaEspera[]>([
    {
      id: 1,
      nome: 'Spinning',
      instrutor: 'Carlos Fitness',
      data: '2025-06-02',
      horario: '18:00',
      vagasTotal: 15,
      vagasOcupadas: 15,
      listaEspera: [
        {
          id: 1,
          nome: 'Maria Fernanda Silva',
          matricula: '2024010',
          telefone: '(11) 99999-1111',
          posicao: 1,
          dataInscricao: '2025-06-01 14:30'
        },
        {
          id: 2,
          nome: 'João Pedro Santos',
          matricula: '2024011',
          telefone: '(11) 99999-2222',
          posicao: 2,
          dataInscricao: '2025-06-01 15:45'
        },
        {
          id: 3,
          nome: 'Ana Carolina Lima',
          matricula: '2024012',
          telefone: '(11) 99999-3333',
          posicao: 3,
          dataInscricao: '2025-06-01 16:20'
        }
      ]
    },
    {
      id: 2,
      nome: 'HIIT',
      instrutor: 'Pedro Strong',
      data: '2025-06-02',
      horario: '19:00',
      vagasTotal: 20,
      vagasOcupadas: 20,
      listaEspera: [
        {
          id: 4,
          nome: 'Lucas Rodrigues',
          matricula: '2024013',
          telefone: '(11) 99999-4444',
          posicao: 1,
          dataInscricao: '2025-06-01 17:15'
        },
        {
          id: 5,
          nome: 'Carla Oliveira',
          matricula: '2024014',
          telefone: '(11) 99999-5555',
          posicao: 2,
          dataInscricao: '2025-06-01 18:00'
        }
      ]
    },
    {
      id: 3,
      nome: 'Pilates',
      instrutor: 'Ana Wellness',
      data: '2025-06-03',
      horario: '08:00',
      vagasTotal: 12,
      vagasOcupadas: 12,
      listaEspera: [
        {
          id: 6,
          nome: 'Patricia Costa',
          matricula: '2024015',
          telefone: '(11) 99999-6666',
          posicao: 1,
          dataInscricao: '2025-06-01 19:30'
        }
      ]
    }
  ]);

  const confirmarVaga = (aulaId: number, alunoId: number) => {
    setAulas(aulas.map(aula => {
      if (aula.id === aulaId) {
        const aluno = aula.listaEspera.find(a => a.id === alunoId);
        const novaListaEspera = aula.listaEspera
          .filter(a => a.id !== alunoId)
          .map((a, index) => ({ ...a, posicao: index + 1 }));
        
        if (aluno) {
          setFeedback({
            tipo: 'success',
            mensagem: `${aluno.nome} foi confirmado(a) na aula de ${aula.nome}. Lembre-se de notificar o aluno!`
          });
        }
        
        return {
          ...aula,
          listaEspera: novaListaEspera
        };
      }
      return aula;
    }));
  };

  const removerDaLista = (aulaId: number, alunoId: number) => {
    setAulas(aulas.map(aula => {
      if (aula.id === aulaId) {
        const aluno = aula.listaEspera.find(a => a.id === alunoId);
        const novaListaEspera = aula.listaEspera
          .filter(a => a.id !== alunoId)
          .map((a, index) => ({ ...a, posicao: index + 1 }));
        
        if (aluno) {
          setFeedback({
            tipo: 'info',
            mensagem: `${aluno.nome} foi removido(a) da lista de espera.`
          });
        }
        
        return {
          ...aula,
          listaEspera: novaListaEspera
        };
      }
      return aula;
    }));
  };

  const moverNaLista = (aulaId: number, alunoId: number, direcao: 'up' | 'down') => {
    setAulas(aulas.map(aula => {
      if (aula.id === aulaId) {
        const lista = [...aula.listaEspera];
        const index = lista.findIndex(a => a.id === alunoId);
        
        if (direcao === 'up' && index > 0) {
          [lista[index], lista[index - 1]] = [lista[index - 1], lista[index]];
        } else if (direcao === 'down' && index < lista.length - 1) {
          [lista[index], lista[index + 1]] = [lista[index + 1], lista[index]];
        }
        
        // Reordena as posições
        lista.forEach((aluno, i) => {
          aluno.posicao = i + 1;
        });
        
        return {
          ...aula,
          listaEspera: lista
        };
      }
      return aula;
    }));
  };

  const notificarAluno = (telefone: string, nome: string, aula: string) => {
    const mensagem = `Olá ${nome}! Uma vaga foi liberada na aula de ${aula}. Confirme sua presença.`;
    const whatsappUrl = `https://wa.me/55${telefone.replace(/\D/g, '')}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  const totalAlunosEspera = aulas.reduce((total, aula) => total + aula.listaEspera.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listas de Espera</h1>
          <p className="text-gray-600 mt-2">Gerenciamento de listas de espera das aulas</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-500">Total de alunos aguardando</p>
          <p className="text-2xl font-bold text-orange-600">{totalAlunosEspera}</p>
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

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas com Lista</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{aulas.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Aguardando</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalAlunosEspera}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Ação</CardTitle>
            <Bell className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 font-medium">
              {totalAlunosEspera > 0 ? 'Notificar primeiros da lista' : 'Nenhuma ação pendente'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listas de Espera por Aula */}
      <div className="space-y-6">
        {aulas.map((aula) => (
          <Card key={aula.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {aula.nome}
                  </CardTitle>
                  <CardDescription>
                    {aula.instrutor} • {new Date(aula.data).toLocaleDateString('pt-BR')} às {aula.horario}
                  </CardDescription>
                </div>
                
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">
                    {aula.vagasOcupadas}/{aula.vagasTotal} vagas
                  </Badge>
                  <p className="text-sm text-gray-600">
                    {aula.listaEspera.length} na lista de espera
                  </p>
                </div>
              </div>
            </CardHeader>
            
            {aula.listaEspera.length > 0 ? (
              <CardContent>
                <div className="space-y-3">
                  {aula.listaEspera.map((aluno) => (
                    <div key={aluno.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                            {aluno.posicao}
                          </div>
                          
                          <div>
                            <h4 className="font-semibold">{aluno.nome}</h4>
                            <p className="text-sm text-gray-600">
                              Mat: {aluno.matricula} • Tel: {aluno.telefone}
                            </p>
                            <p className="text-xs text-gray-500">
                              Na lista desde: {new Date(aluno.dataInscricao).toLocaleString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {/* Mover na lista */}
                          <div className="flex flex-col gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => moverNaLista(aula.id, aluno.id, 'up')}
                              disabled={aluno.posicao === 1}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => moverNaLista(aula.id, aluno.id, 'down')}
                              disabled={aluno.posicao === aula.listaEspera.length}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {/* Notificar */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => notificarAluno(aluno.telefone, aluno.nome, aula.nome)}
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Notificar
                          </Button>
                          
                          {/* Confirmar Vaga */}
                          <Button
                            size="sm"
                            onClick={() => confirmarVaga(aula.id, aluno.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirmar Vaga
                          </Button>
                          
                          {/* Remover */}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removerDaLista(aula.id, aluno.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Ações da Lista */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (aula.listaEspera.length > 0) {
                          const primeiro = aula.listaEspera[0];
                          notificarAluno(primeiro.telefone, primeiro.nome, aula.nome);
                        }
                      }}
                      disabled={aula.listaEspera.length === 0}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notificar Próximo da Lista
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        aula.listaEspera.forEach(aluno => {
                          notificarAluno(aluno.telefone, aluno.nome, aula.nome);
                        });
                        setFeedback({
                          tipo: 'info',
                          mensagem: `Todos os ${aula.listaEspera.length} alunos da lista foram notificados via WhatsApp.`
                        });
                      }}
                      disabled={aula.listaEspera.length === 0}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notificar Toda a Lista
                    </Button>
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum aluno na lista de espera</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Dicas de Gerenciamento */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas de Gerenciamento</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>• <strong>Notifique rapidamente:</strong> Assim que uma vaga for liberada, notifique o próximo da lista</li>
            <li>• <strong>Confirme presença:</strong> Sempre confirme se o aluno comparecerá antes de liberar a vaga</li>
            <li>• <strong>Mantenha ordem:</strong> Respeite a ordem cronológica, mas permita ajustes quando necessário</li>
            <li>• <strong>Comunique por WhatsApp:</strong> É o canal mais eficaz para confirmações rápidas</li>
            <li>• <strong>Gerencie expectativas:</strong> Informe posição na lista e probabilidade de vaga</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecepcionistaListaEspera;
