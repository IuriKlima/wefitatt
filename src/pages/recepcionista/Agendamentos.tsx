
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { CalendarCheck } from 'lucide-react';

const RecepcionistaAgendamentos: React.FC = () => {
  return (
    <PlaceholderPage
      title="Agendamentos"
      description="Gestão de agendamentos para alunos"
      icon={CalendarCheck}
    />
  );
};

export default RecepcionistaAgendamentos;
