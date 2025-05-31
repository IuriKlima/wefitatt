
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Users, RefreshCw } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'Administrador' | 'Gestor' | 'Instrutor' | 'Recepcionista';
  unidade?: string;
  dataCadastro: string;
  status: 'Ativo' | 'Inativo';
}

const AdminUsuarios: React.FC = () => {
  const [usuarios] = useState<Usuario[]>([
    { id: 1, nome: 'João Silva', email: 'joao.silva@wefit.com', perfil: 'Administrador', dataCadastro: '15/01/2024', status: 'Ativo' },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@wefit.com', perfil: 'Gestor', unidade: 'Wefit Centro', dataCadastro: '20/02/2024', status: 'Ativo' },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro.oliveira@wefit.com', perfil: 'Gestor', unidade: 'Wefit Paulista', dataCadastro: '10/03/2024', status: 'Ativo' },
    { id: 4, nome: 'Ana Costa', email: 'ana.costa@wefit.com', perfil: 'Instrutor', unidade: 'Wefit Centro', dataCadastro: '05/04/2024', status: 'Ativo' },
    { id: 5, nome: 'Carlos Ferreira', email: 'carlos.ferreira@wefit.com', perfil: 'Recepcionista', unidade: 'Wefit Ipanema', dataCadastro: '12/04/2024', status: 'Inativo' },
  ]);

  const [filtroPerfil, setFiltroPerfil] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [filtroUnidade, setFiltroUnidade] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const form = useForm({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      perfil: '',
      unidade: '',
    },
  });

  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchPerfil = !filtroPerfil || usuario.perfil === filtroPerfil;
    const matchStatus = !filtroStatus || usuario.status === filtroStatus;
    const matchUnidade = !filtroUnidade || usuario.unidade === filtroUnidade;
    const matchBusca = !busca || 
      usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busca.toLowerCase());
    return matchPerfil && matchStatus && matchUnidade && matchBusca;
  });

  const handleSalvarUsuario = (data: any) => {
    console.log('Salvando usuário:', data);
    setModalAberto(false);
    setModoEdicao(false);
    setUsuarioEditando(null);
    form.reset();
  };

  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setModoEdicao(true);
    form.setValue('nome', usuario.nome);
    form.setValue('email', usuario.email);
    form.setValue('perfil', usuario.perfil);
    form.setValue('unidade', usuario.unidade || '');
    setModalAberto(true);
  };

  const handleNovoUsuario = () => {
    setModoEdicao(false);
    setUsuarioEditando(null);
    form.reset();
    setModalAberto(true);
  };

  const gerarSenhaForte = () => {
    const senhaGerada = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase();
    form.setValue('senha', senhaGerada);
    form.setValue('confirmarSenha', senhaGerada);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
        <p className="text-gray-600 mt-2">Administração de todos os usuários do sistema</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Usuários do Sistema</CardTitle>
              <CardDescription>Gerencie administradores, gestores e funcionários</CardDescription>
            </div>
            
            <Button onClick={handleNovoUsuario}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Novo Usuário
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtroPerfil} onValueChange={setFiltroPerfil}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Gestor">Gestor</SelectItem>
                <SelectItem value="Instrutor">Instrutor</SelectItem>
                <SelectItem value="Recepcionista">Recepcionista</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroUnidade} onValueChange={setFiltroUnidade}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
                <SelectItem value="Wefit Centro">Wefit Centro</SelectItem>
                <SelectItem value="Wefit Paulista">Wefit Paulista</SelectItem>
                <SelectItem value="Wefit Ipanema">Wefit Ipanema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome Completo</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil/Nível</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Data Cadastro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{usuario.perfil}</Badge>
                  </TableCell>
                  <TableCell>{usuario.unidade || '-'}</TableCell>
                  <TableCell>{usuario.dataCadastro}</TableCell>
                  <TableCell>
                    <Badge variant={usuario.status === 'Ativo' ? 'default' : 'secondary'}>
                      {usuario.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditarUsuario(usuario)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Switch defaultChecked={usuario.status === 'Ativo'} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Adicionar/Editar Usuário */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {modoEdicao ? `Editar Usuário: ${usuarioEditando?.nome}` : 'Adicionar Novo Usuário do Sistema'}
            </DialogTitle>
            <DialogDescription>
              {modoEdicao ? 'Edite as informações do usuário' : 'Preencha as informações do novo usuário'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSalvarUsuario)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="joao.silva@wefit.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {!modoEdicao && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Senha
                          <Button type="button" variant="ghost" size="sm" onClick={gerarSenhaForte}>
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Gerar
                          </Button>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Senha forte" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmarSenha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <FormControl>
                          <Input placeholder="Confirme a senha" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {modoEdicao && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Para redefinir a senha deste usuário, um link será enviado para o email cadastrado.
                  </p>
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    Enviar Link de Redefinição
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="perfil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perfil/Nível de Acesso</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o perfil" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Administrador">Administrador</SelectItem>
                          <SelectItem value="Gestor">Gestor</SelectItem>
                          <SelectItem value="Instrutor">Instrutor</SelectItem>
                          <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade Associada</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={form.watch('perfil') === 'Administrador'}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a unidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Wefit Centro">Wefit Centro</SelectItem>
                          <SelectItem value="Wefit Paulista">Wefit Paulista</SelectItem>
                          <SelectItem value="Wefit Ipanema">Wefit Ipanema</SelectItem>
                          <SelectItem value="Wefit Bela Vista">Wefit Bela Vista</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {modoEdicao ? 'Atualizar Usuário' : 'Salvar Usuário'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsuarios;
