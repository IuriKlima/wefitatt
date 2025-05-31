
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Users } from 'lucide-react';

const InstrutorAlunos: React.FC = () => {
  return (
    <PlaceholderPage
      title="Meus Alunos"
      description="Acompanhamento e treinos dos seus alunos"
      icon={Users}
    />
  );
};

export default InstrutorAlunos;
