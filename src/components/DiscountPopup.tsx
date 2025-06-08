import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

interface DiscountPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiscountPopup: React.FC<DiscountPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-8 bg-gradient-to-br from-purple-50 to-indigo-100">
        <DialogHeader className="items-center text-center">
          <div className="p-3 bg-white rounded-full shadow-md mb-4">
            <Gift className="h-10 w-10 text-purple-600" />
          </div>
          <DialogTitle className="text-3xl font-extrabold text-gray-900">
            Uma Oferta Imperdível!
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600 mt-2">
            Sua jornada para uma gestão de academia mais inteligente começa com <strong>50% de DESCONTO</strong> no seu primeiro mês.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="text-md text-gray-700">
            Escolha qualquer um dos nossos planos e acelere seus resultados agora mesmo.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg py-6">
            <Link to="/planos">Ver Planos</Link>
          </Button>
          <Button onClick={onClose} variant="ghost" className="w-full text-gray-600">
            Agora não
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountPopup; 