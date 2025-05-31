
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { BarChart3 } from 'lucide-react';

const AdminRelatorios: React.FC = () => {
  return (
    <PlaceholderPage
      title="Relatórios Globais"
      description="Relatórios e análises de todas as unidades"
      icon={BarChart3}
    />
  );
};

export default AdminRelatorios;
