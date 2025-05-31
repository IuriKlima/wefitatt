
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Users } from 'lucide-react';

const AdminUsuarios: React.FC = () => {
  return (
    <PlaceholderPage
      title="Gerenciar Usuários"
      description="Administração de todos os usuários do sistema"
      icon={Users}
    />
  );
};

export default AdminUsuarios;
