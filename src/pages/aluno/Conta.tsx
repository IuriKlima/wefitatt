
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Wallet } from 'lucide-react';

const AlunoConta: React.FC = () => {
  return (
    <PlaceholderPage
      title="Minha Conta"
      description="Pagamentos, planos e informações da conta"
      icon={Wallet}
    />
  );
};

export default AlunoConta;
