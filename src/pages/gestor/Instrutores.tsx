
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { UserCheck } from 'lucide-react';

const GestorInstrutores: React.FC = () => {
  return (
    <PlaceholderPage
      title="Instrutores da Unidade"
      description="Gestão da equipe de instrutores"
      icon={UserCheck}
    />
  );
};

export default GestorInstrutores;
