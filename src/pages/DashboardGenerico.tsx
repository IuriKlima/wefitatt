
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LayoutDashboard, LogOut } from 'lucide-react';

const DashboardGenerico = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-purple-600">Wefit</h1>
            </div>
            <Button variant="outline" asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sair
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Card className="p-12 bg-white shadow-lg max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <LayoutDashboard className="h-10 w-10 text-purple-600" />
              </div>
              
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Bem-vindo ao Wefit!
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Login realizado com sucesso!
                </p>
                <p className="text-gray-500">
                  Esta é uma página de dashboard genérica temporária. Os dashboards específicos 
                  por tipo de usuário (Admin, Gestor, Instrutor, etc.) serão implementados 
                  nos próximos prompts conforme a definição dos fluxos de cadastro.
                </p>
              </div>

              <div className="pt-6">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/login">
                    Voltar para o Login
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardGenerico;
