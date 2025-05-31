
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { LayoutDashboard } from 'lucide-react';

const AlunoPainel: React.FC = () => {
  return (
    <PlaceholderPage
      title="Meu Painel"
      description="Visão geral das suas atividades na academia"
      icon={LayoutDashboard}
    />
  );
};

export default AlunoPainel;
