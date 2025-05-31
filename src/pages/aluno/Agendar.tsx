
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Calendar } from 'lucide-react';

const AlunoAgendar: React.FC = () => {
  return (
    <PlaceholderPage
      title="Agendar Aulas"
      description="Agendamento de aulas e atividades"
      icon={Calendar}
    />
  );
};

export default AlunoAgendar;
