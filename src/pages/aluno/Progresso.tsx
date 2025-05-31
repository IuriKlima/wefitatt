
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { TrendingUp } from 'lucide-react';

const AlunoProgresso: React.FC = () => {
  return (
    <PlaceholderPage
      title="Meu Progresso"
      description="Acompanhe sua evolução e conquistas"
      icon={TrendingUp}
    />
  );
};

export default AlunoProgresso;
