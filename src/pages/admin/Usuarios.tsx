
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import UserTable from '@/components/admin/UserTable';
import UserFilters from '@/components/admin/UserFilters';
import UserForm from '@/components/admin/UserForm';

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
          <UserFilters
            busca={busca}
            filtroPerfil={filtroPerfil}
            filtroStatus={filtroStatus}
            filtroUnidade={filtroUnidade}
            onBuscaChange={setBusca}
            onPerfilChange={setFiltroPerfil}
            onStatusChange={setFiltroStatus}
            onUnidadeChange={setFiltroUnidade}
          />

          <UserTable
            usuarios={usuariosFiltrados}
            onEditUser={handleEditarUsuario}
          />
        </CardContent>
      </Card>

      <UserForm
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        isEditing={modoEdicao}
        editingUser={usuarioEditando}
        form={form}
        onSubmit={handleSalvarUsuario}
        onGeneratePassword={gerarSenhaForte}
      />
    </div>
  );
};

export default AdminUsuarios;
