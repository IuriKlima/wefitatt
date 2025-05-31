
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { LayoutDashboard } from 'lucide-react';

const GestorDashboard: React.FC = () => {
  return (
    <PlaceholderPage
      title="Dashboard da Unidade"
      description="Visão geral da unidade e métricas operacionais"
      icon={LayoutDashboard}
    />
  );
};

export default GestorDashboard;
