import React from 'react';
import { Card } from '@/components/ui/card';

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Termos de Uso
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p><strong>Última atualização:</strong> 24 de julho de 2024</p>

            <h2 className="text-2xl font-bold text-gray-800">1. Acordo com os Termos</h2>
            <p>Ao acessar nosso sistema, Wefit, você concorda em estar vinculado por estes Termos de Uso, todas as leis e regulamentos aplicáveis, e concorda que é responsável pelo cumprimento de quaisquer leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.</p>

            <h2 className="text-2xl font-bold text-gray-800">2. Licença de Uso</h2>
            <p>A permissão é concedida para usar o sistema Wefit para fins pessoais e comerciais, conforme o plano de assinatura contratado. Esta é a concessão de uma licença, não uma transferência de título, e sob esta licença você não pode:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Modificar ou copiar os materiais;</li>
              <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no sistema Wefit;</li>
              <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
              <li>Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor.</li>
            </ul>
            <p>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e pode ser rescindida pela Wefit a qualquer momento.</p>

            <h2 className="text-2xl font-bold text-gray-800">3. Isenção de Responsabilidade</h2>
            <p>O sistema Wefit é fornecido 'como está'. A Wefit não oferece garantias, expressas ou implícitas, e por este meio isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um propósito específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>

            <h2 className="text-2xl font-bold text-gray-800">4. Limitações</h2>
            <p>Em nenhum caso a Wefit ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro, ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar o sistema Wefit.</p>

            <h2 className="text-2xl font-bold text-gray-800">5. Modificações nos Termos</h2>
            <p>A Wefit pode revisar estes termos de uso para seu sistema a qualquer momento, sem aviso prévio. Ao usar este sistema, você concorda em estar vinculado à versão então atual destes termos de uso.</p>

            <h2 className="text-2xl font-bold text-gray-800">6. Contato</h2>
            <p>Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:</p>
            <p>Por e-mail: <strong>contato@wefit.com.br</strong></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermosUso;
