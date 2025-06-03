
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const CadastroPasso2 = () => {
  const [searchParams] = useSearchParams();
  const profile = searchParams.get('profile');
  const inviteCode = searchParams.get('inviteCode');

  const getProfileName = (profileId: string) => {
    const profiles = {
      'rede': 'Rede de Academias',
      'academia': 'Academia (Unidade Única)',
      'personal': 'Personal Trainer'
    };
    return profiles[profileId as keyof typeof profiles] || profileId;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl p-8 bg-white shadow-lg text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cadastro Iniciado!</h1>
        </div>

        <div className="space-y-6 mb-8">
          {profile && (
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">
                Perfil Selecionado:
              </h2>
              <p className="text-lg text-purple-700 font-medium">
                {getProfileName(profile)}
              </p>
            </div>
          )}

          {inviteCode && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                Código de Convite Verificado:
              </h2>
              <p className="text-lg text-blue-700 font-mono font-medium">
                {inviteCode}
              </p>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 text-lg">
              Próximos passos do cadastro serão implementados em prompts futuros.
            </p>
            <p className="text-gray-500 mt-2">
              Esta é uma página placeholder para demonstrar o fluxo de navegação.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/cadastro" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button asChild>
            <Link to="/login">
              Ir para Login
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CadastroPasso2;
