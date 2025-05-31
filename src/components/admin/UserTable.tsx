
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Edit } from 'lucide-react';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: 'Administrador' | 'Gestor' | 'Instrutor' | 'Recepcionista';
  unidade?: string;
  dataCadastro: string;
  status: 'Ativo' | 'Inativo';
}

interface UserTableProps {
  usuarios: Usuario[];
  onEditUser: (usuario: Usuario) => void;
}

const UserTable: React.FC<UserTableProps> = ({ usuarios, onEditUser }) => {
  return (
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
        {usuarios.map((usuario) => (
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
                <Button variant="ghost" size="sm" onClick={() => onEditUser(usuario)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Switch defaultChecked={usuario.status === 'Ativo'} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
