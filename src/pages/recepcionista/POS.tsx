
import React from 'react';
import PlaceholderPage from '@/components/PlaceholderPage';
import { ShoppingCart } from 'lucide-react';

const RecepcionistaPOS: React.FC = () => {
  return (
    <PlaceholderPage
      title="Ponto de Venda (POS)"
      description="Sistema de vendas e pagamentos"
      icon={ShoppingCart}
    />
  );
};

export default RecepcionistaPOS;
