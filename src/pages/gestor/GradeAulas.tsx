
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Calendar } from 'lucide-react';

const GestorGradeAulas: React.FC = () => {
  return (
    <PlaceholderPage
      title="Grade de Aulas"
      description="Programação e gestão das aulas da unidade"
      icon={Calendar}
    />
  );
};

export default GestorGradeAulas;
