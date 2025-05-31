
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Dumbbell } from 'lucide-react';

const AlunoTreinos: React.FC = () => {
  return (
    <PlaceholderPage
      title="Meus Treinos"
      description="Seus treinos e exercícios personalizados"
      icon={Dumbbell}
    />
  );
};

export default AlunoTreinos;
