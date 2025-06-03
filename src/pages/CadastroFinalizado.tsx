
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CadastroFinalizado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, inviteCode, formData, userName, businessName } = location.state || {};

  const handleAccessDashboard = () => {
    // Sempre redirecionar para o dashboard do admin
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Painel Roxo Wefit - Lado Esquerdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Wefit</h1>
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo(a) à família Wefit!</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Sua jornada de transformação fitness começa agora!
            </p>
          </div>
          
          {/* Elementos gráficos decorativos */}
          <div className="absolute top-16 right-16 w-24 h-24 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-24 left-16 w-20 h-20 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 border border-white/10 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Área do Conteúdo - Lado Direito */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-2xl p-8 bg-white shadow-lg text-center">
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cadastro Concluído com Sucesso!
            </h1>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">
                Parabéns, {userName || 'usuário'}!
              </h2>
              <p className="text-purple-700">
                {businessName ? (
                  <>Sua conta para <span className="font-semibold">{businessName}</span> no Wefit foi criada e está pronta para ser explorada.</>
                ) : (
                  'Sua conta no Wefit foi criada e está pronta para ser explorada.'
                )}
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Próximos Passos:
              </h3>
              <ul className="text-blue-700 text-left space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Acesse seu Painel de Administração</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Configure suas preferências iniciais</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Explore todas as funcionalidades disponíveis</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">
                <strong>Informação:</strong> Você também receberá um e-mail de boas-vindas com dicas e 
                recursos para aproveitar ao máximo o Wefit (simulado).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleAccessDashboard}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-lg flex items-center justify-center gap-2"
            >
              Acessar meu Painel Wefit Agora!
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <p className="text-sm text-gray-500">
              Você pode fazer login a qualquer momento usando o email e senha cadastrados.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CadastroFinalizado;
