
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { UserPlus } from 'lucide-react';

const RecepcionistaCadastro: React.FC = () => {
  return (
    <PlaceholderPage
      title="Cadastro Rápido"
      description="Cadastro rápido de novos alunos"
      icon={UserPlus}
    />
  );
};

export default RecepcionistaCadastro;
