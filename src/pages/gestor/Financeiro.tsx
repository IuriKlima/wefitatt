
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { CreditCard } from 'lucide-react';

const GestorFinanceiro: React.FC = () => {
  return (
    <PlaceholderPage
      title="Financeiro da Unidade"
      description="Gestão financeira e controle de pagamentos"
      icon={CreditCard}
    />
  );
};

export default GestorFinanceiro;
