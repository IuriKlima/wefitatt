
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { LayoutDashboard } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <PlaceholderPage
      title="Dashboard do Administrador"
      description="Visão geral de todas as unidades e métricas do sistema"
      icon={LayoutDashboard}
    />
  );
};

export default AdminDashboard;
