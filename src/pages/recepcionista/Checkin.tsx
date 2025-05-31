
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Activity } from 'lucide-react';

const RecepcionistaCheckin: React.FC = () => {
  return (
    <PlaceholderPage
      title="Check-in / Check-out"
      description="Controle de entrada e saída dos alunos"
      icon={Activity}
    />
  );
};

export default RecepcionistaCheckin;
