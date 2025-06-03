
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 bg-white shadow-lg text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Enviado!</h1>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-gray-600">
              Se seu e-mail estiver em nosso sistema, você receberá as instruções para recuperação de senha em breve.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Email enviado para:</strong> {email}
              </p>
            </div>
          </div>

          <Button asChild className="w-full">
            <Link to="/login">
              Voltar para o Login
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md p-8 bg-white shadow-lg">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 mb-4">
            <h1 className="text-2xl font-bold text-purple-600">Wefit</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recuperar sua Senha</h2>
          <p className="text-gray-600">
            Por favor, insira o endereço de e-mail associado à sua conta Wefit. 
            Enviaremos um link para você criar uma nova senha.
          </p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
          >
            Enviar Link de Recuperação
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

export default RecuperarSenha;
