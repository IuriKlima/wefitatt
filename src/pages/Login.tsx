
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login bem-sucedido
    navigate('/dashboard-generico');
  };

  return (
    <div className="min-h-screen flex">
      {/* Painel Roxo Wefit - Lado Esquerdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Wefit</h1>
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo(a) de volta ao Wefit!</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Gerencie sua academia, treinos e alunos de forma inteligente.
            </p>
          </div>
          
          {/* Elementos gráficos decorativos */}
          <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-12 border border-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Área do Formulário - Lado Direito */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md p-8 bg-white shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Acesse sua Conta</h2>
            <p className="text-gray-600">Digite suas credenciais para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link 
                  to="/recuperar-senha" 
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-lg"
            >
              ENTRAR
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Ainda não tem uma conta?{' '}
              <Link 
                to="/cadastro" 
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
