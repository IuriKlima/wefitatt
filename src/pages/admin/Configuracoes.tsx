
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Settings } from 'lucide-react';

const AdminConfiguracoes: React.FC = () => {
  return (
    <PlaceholderPage
      title="Configurações do Sistema"
      description="Configurações globais e parâmetros do sistema"
      icon={Settings}
    />
  );
};

export default AdminConfiguracoes;
