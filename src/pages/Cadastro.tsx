
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Building2, Dumbbell, User } from 'lucide-react';

const Cadastro = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [inviteCode, setInviteCode] = useState('');

  const profiles = [
    {
      id: 'rede',
      title: 'Sou uma Rede de Academias',
      description: 'Gerencie múltiplas unidades e franquias',
      icon: Building2
    },
    {
      id: 'academia',
      title: 'Sou uma Academia (Unidade Única)',
      description: 'Gerencie minha academia independente',
      icon: Dumbbell
    },
    {
      id: 'personal',
      title: 'Sou Personal Trainer',
      description: 'Gerencie meus clientes e treinos',
      icon: User
    }
  ];

  const handleContinue = () => {
    if (selectedProfile || inviteCode.trim()) {
      const params = new URLSearchParams();
      if (selectedProfile) {
        params.set('profile', selectedProfile);
      }
      if (inviteCode.trim()) {
        params.set('inviteCode', inviteCode);
      }
      navigate(`/cadastro-passo-2?${params.toString()}`);
    }
  };

  const isFormValid = selectedProfile || inviteCode.trim();

  return (
    <div className="min-h-screen flex">
      {/* Painel Roxo Wefit - Lado Esquerdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Wefit</h1>
            <h2 className="text-2xl font-semibold mb-4">Junte-se à revolução Wefit!</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Crie sua conta e comece a transformar a gestão fitness.
            </p>
          </div>
          
          {/* Elementos gráficos decorativos */}
          <div className="absolute top-16 right-16 w-24 h-24 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-24 left-16 w-20 h-20 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 border border-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Área do Formulário - Lado Direito */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-2xl p-8 bg-white shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Vamos começar!</h2>
            <p className="text-gray-600 text-lg">Como você usará o Wefit?</p>
          </div>

          <div className="space-y-8">
            {/* Seleção de Perfil */}
            <div className="grid gap-4">
              {profiles.map((profile) => {
                const Icon = profile.icon;
                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      setSelectedProfile(profile.id);
                      setInviteCode(''); // Limpar código de convite quando selecionar perfil
                    }}
                    className={`p-6 border-2 rounded-lg text-left transition-all duration-200 ${
                      selectedProfile === profile.id
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    } ${inviteCode.trim() ? 'opacity-50' : ''}`}
                    disabled={!!inviteCode.trim()}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        selectedProfile === profile.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{profile.title}</h3>
                        <p className="text-gray-600 mt-1">{profile.description}</p>
                      </div>
                      {selectedProfile === profile.id && (
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Separador */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OU</span>
              </div>
            </div>

            {/* Código de Convite */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Já tem um código de convite?
                </h3>
                <p className="text-gray-600">Digite seu código para acessar uma conta existente</p>
              </div>
              
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Insira seu código de convite"
                  value={inviteCode}
                  onChange={(e) => {
                    setInviteCode(e.target.value);
                    if (e.target.value.trim()) {
                      setSelectedProfile(''); // Limpar seleção de perfil quando digitar código
                    }
                  }}
                  className={`flex-1 ${selectedProfile ? 'opacity-50' : ''}`}
                  disabled={!!selectedProfile}
                />
              </div>
            </div>

            {/* Botão Continuar */}
            <Button 
              onClick={handleContinue}
              disabled={!isFormValid}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-semibold py-3 text-lg"
            >
              Continuar Cadastro
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já possui uma conta?{' '}
              <Link 
                to="/login" 
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Faça Login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
