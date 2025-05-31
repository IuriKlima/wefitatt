
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { GraduationCap } from 'lucide-react';

const GestorAlunos: React.FC = () => {
  return (
    <PlaceholderPage
      title="Alunos da Unidade"
      description="Gestão dos alunos matriculados na unidade"
      icon={GraduationCap}
    />
  );
};

export default GestorAlunos;
