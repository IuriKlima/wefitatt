import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, CreditCard, ShieldCheck, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock plans data based on our plans page
const PLANS = {
  'personal': { id: 'personal', name: 'Personal Trainer', price: 97, desc: 'Para autônomos e estúdios pequenos' },
  'academia': { id: 'academia', name: 'Academia Pro', price: 297, desc: 'Gestão completa para sua unidade' },
  'rede': { id: 'rede', name: 'Rede Elite', price: 897, desc: 'Controle centralizado para multi-unidades' }
};

const Checkout = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const plan = PLANS[planId as keyof typeof PLANS] || PLANS['academia'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call to our new backend route: /api/v1/checkout/subscribe
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Pagamento Aprovado!",
        description: `Bem-vindo ao WeFit ${plan.name}`,
      });
      // Redirect to onboarding or login
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090f] text-foreground flex flex-col md:flex-row relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-[#09090f] to-indigo-900/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Side: Order Summary */}
      <div className="w-full md:w-[40%] bg-[#0c0c14] border-r border-white/5 p-8 md:p-12 relative z-10 hidden md:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-bold font-sans">W</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">WeFit</span>
          </div>

          <p className="text-gray-400 font-medium mb-2 uppercase tracking-wide text-xs">Resumo do Pedido</p>
          <h2 className="text-4xl font-bold text-white mb-6">Plano {plan.name}</h2>
          
          <div className="space-y-4 mb-8 text-gray-400">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Check className="h-3 w-3" />
              </div>
              <span>{plan.desc}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Check className="h-3 w-3" />
              </div>
              <span>Acesso imediato à plataforma</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Check className="h-3 w-3" />
              </div>
              <span>Suporte especializado 24/7</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">R$ {plan.price},00/mês</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-lg font-bold text-white">Total a pagar hoje</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-purple-400">R$ {plan.price},00</span>
                <p className="text-xs text-gray-500">cobrado mensalmente</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mt-12">
          <ShieldCheck className="h-8 w-8 text-emerald-500/50" />
          <p>Pagamento 100% seguro processado automaticamente. Cancele quando quiser.</p>
        </div>
      </div>

      {/* Right Side: Checkout Form */}
      <div className="w-full md:w-[60%] p-8 md:p-16 max-w-3xl mx-auto overflow-y-auto relative z-10 flex flex-col justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-2">Finalizar Assinatura</h1>
        <p className="text-gray-400 mb-10">Preencha seus dados para criar sua conta e iniciar o serviço.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Seus Dados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400">Nome completo</Label>
                <Input 
                  required
                  placeholder="Ex: João da Silva"
                  className="bg-white/5 border-white/10 text-white focus:ring-purple-500 h-12"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400">E-mail de acesso</Label>
                <Input 
                  required type="email"
                  placeholder="joao@gmail.com"
                  className="bg-white/5 border-white/10 text-white focus:ring-purple-500 h-12"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-400">CPF / CNPJ</Label>
                <Input 
                  required
                  placeholder="000.000.000-00"
                  className="bg-white/5 border-white/10 text-white focus:ring-purple-500 h-12"
                  value={formData.document} onChange={e => setFormData({...formData, document: e.target.value})}
                />
              </div>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Método de Pagamento */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Método de Pagamento</h3>
            
            <RadioGroup 
              value={paymentMethod}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onValueChange={setPaymentMethod}
            >
              <div 
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className={`h-5 w-5 ${paymentMethod === 'credit_card' ? 'text-purple-400' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-semibold text-white">Cartão de Crédito</p>
                    <p className="text-xs text-gray-400">Aprovação imediata</p>
                  </div>
                </div>
                <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
              </div>

              <div 
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className={`h-5 w-5 ${paymentMethod === 'pix' ? 'text-emerald-400' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-semibold text-white">PIX</p>
                    <p className="text-xs text-gray-400">-5% de desconto</p>
                  </div>
                </div>
                <RadioGroupItem value="pix" id="pix" className="sr-only" />
              </div>
            </RadioGroup>

            {paymentMethod === 'credit_card' && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 animate-in fade-in slide-in-from-top-4">
                <div className="space-y-2">
                  <Label className="text-gray-400">Número do Cartão</Label>
                  <Input 
                    required placeholder="0000 0000 0000 0000"
                    className="bg-black/20 border-white/10 font-mono text-white h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Nome impresso no cartão</Label>
                  <Input 
                    required placeholder="JOAO DA SILVA"
                    className="bg-black/20 border-white/10 text-white uppercase h-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400">Validade</Label>
                    <Input required placeholder="MM/AA" className="bg-black/20 border-white/10 text-white h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400">CVV</Label>
                    <Input required type="password" placeholder="123" maxLength={4} className="bg-black/20 border-white/10 text-white h-12" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-4">
                <div className="bg-white p-4 rounded-xl inline-block mb-4">
                  <QrCode className="h-32 w-32 text-black" />
                </div>
                <p className="text-emerald-400 font-semibold mb-2">Total com desconto: R$ {Math.floor(plan.price * 0.95)},00</p>
                <p className="text-gray-400 text-sm">Escaneie o QR Code com o aplicativo do seu banco para pagar. A liberação é imediata após a confirmação.</p>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-purple-500/25"
            disabled={loading}
          >
            {loading ? "Processando Pagamento..." : "Assinar Plataforma"}
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Ao assinar, você concorda com nossos Termos de Uso e Política de Privacidade.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
