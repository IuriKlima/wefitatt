
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redireciona para o dashboard apropriado baseado no perfil
      const dashboardRoutes = {
        administrador: '/admin/dashboard',
        gestor: '/gestor/dashboard',
        instrutor: '/instrutor/aulas',
        recepcionista: '/recepcionista/checkin',
        aluno: '/aluno/painel'
      };
      
      const route = dashboardRoutes[user.profile];
      if (route) {
        navigate(route);
      }
    }
  }, [user, navigate]);

  if (user) {
    return <Layout><div>Redirecionando...</div></Layout>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wefit-primary to-wefit-accent flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-wefit-primary to-wefit-accent rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <CardTitle className="text-2xl font-bold text-wefit-primary">
            Wefit
          </CardTitle>
          <p className="text-gray-600">Sistema inteligente para academias</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Bem-vindo ao Wefit!</h3>
            <p className="text-gray-600 text-sm mb-6">
              Entre no sistema para acessar suas funcionalidades personalizadas.
            </p>
            
            <Button 
              className="w-full wefit-button-primary"
              onClick={() => window.location.reload()}
            >
              Acessar Sistema
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>Sistema de demonstração</p>
            <p>Todos os perfis de usuário disponíveis</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
