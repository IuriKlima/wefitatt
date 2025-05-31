
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Calendar } from 'lucide-react';

const InstrutorAulas: React.FC = () => {
  return (
    <PlaceholderPage
      title="Minhas Aulas"
      description="Agenda e gestão das suas aulas"
      icon={Calendar}
    />
  );
};

export default InstrutorAulas;
