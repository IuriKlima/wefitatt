import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle, Zap } from 'lucide-react';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#09090f]">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Link Enviado!</h1>
          <p className="text-gray-400 mb-4 text-sm">Se seu e-mail estiver em nosso sistema, você receberá as instruções para recuperação de senha.</p>
          <div className="glass-card p-4 mb-8">
            <p className="text-sm text-gray-300"><strong>Email:</strong> {email}</p>
          </div>
          <Button asChild className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-xl h-12">
            <Link to="/login">Voltar para o Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#09090f]">
      <div className="w-full max-w-[420px] animate-fade-in">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">WeFit</span>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Recuperar Senha</h2>
          <p className="text-gray-500 text-sm">Insira o email da sua conta para receber um link de recuperação.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</Label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 h-4 w-4 group-focus-within:text-purple-400 transition-colors" />
              <Input
                id="email" type="email" placeholder="seu@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                className="pl-11 h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/40"
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20">
            Enviar Link de Recuperação
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;
