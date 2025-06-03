
import React from 'react';
import { Card } from '@/components/ui/card';

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Termos de Uso
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl mb-8 text-center text-purple-600">
              Esta página está em desenvolvimento. Em breve disponibilizaremos nossos termos de uso completos.
            </p>
            
            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                Transparência e Clareza
              </h3>
              <p className="text-purple-700 mb-4">
                Na Wefit, acreditamos em relações transparentes. 
                Nossos termos serão claros e justos para todos os usuários.
              </p>
              <p className="text-purple-600">
                Para esclarecimentos, entre em contato conosco através do email: 
                <strong> contato@wefit.com.br</strong>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermosUso;
