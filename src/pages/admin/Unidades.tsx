
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Building2 } from 'lucide-react';

const AdminUnidades: React.FC = () => {
  return (
    <PlaceholderPage
      title="Gerenciar Unidades"
      description="Administração de todas as unidades da rede"
      icon={Building2}
    />
  );
};

export default AdminUnidades;
