
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';

const RedefinirSenha = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push('Pelo menos 8 caracteres');
    if (!/[A-Z]/.test(password)) errors.push('Pelo menos uma letra maiúscula');
    if (!/[a-z]/.test(password)) errors.push('Pelo menos uma letra minúscula');
    if (!/\d/.test(password)) errors.push('Pelo menos um número');
    return errors;
  };

  const getPasswordStrength = (password: string) => {
    const errors = validatePassword(password);
    if (errors.length === 0) return { level: 'forte', color: 'bg-green-500' };
    if (errors.length <= 2) return { level: 'média', color: 'bg-yellow-500' };
    return { level: 'fraca', color: 'bg-red-500' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors(passwordErrors);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(['As senhas não coincidem']);
      return;
    }

    setErrors([]);
    setPasswordSaved(true);
    
    // Redirecionar para login após 2 segundos
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  if (passwordSaved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 bg-white shadow-lg text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Senha Alterada!</h1>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-gray-600">
              Senha alterada com sucesso! Você já pode fazer login com sua nova senha.
            </p>
            <p className="text-sm text-gray-500">
              Redirecionando para o login...
            </p>
          </div>

          <Button asChild className="w-full">
            <Link to="/login">
              Ir para Login
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md p-8 bg-white shadow-lg">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 mb-4">
            <h1 className="text-2xl font-bold text-purple-600">Wefit</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Crie sua Nova Senha</h2>
          <p className="text-gray-600">
            Escolha uma senha forte e segura.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Nova Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua nova senha"
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
            
            {/* Indicador de força da senha */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.level === 'forte' ? '100%' : passwordStrength.level === 'média' ? '66%' : '33%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 capitalize">
                    Força: {passwordStrength.level}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirmar Nova Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua nova senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mensagens de erro */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-medium mb-2">Requisitos da senha:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
          >
            Salvar Nova Senha
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RedefinirSenha;
