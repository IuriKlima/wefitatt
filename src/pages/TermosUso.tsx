import React from 'react';

const TermosUso = () => {
  return (
    <div className="pt-20">
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-14">
            <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tight">
              Termos de Uso
            </h1>
            
            <div className="space-y-8 text-gray-400 leading-relaxed">
              <p className="text-sm"><strong className="text-gray-300">Última atualização:</strong> 24 de julho de 2024</p>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Acordo com os Termos</h2>
                <p className="text-sm">Ao acessar nosso sistema, Wefit, você concorda em estar vinculado por estes Termos de Uso, todas as leis e regulamentos aplicáveis.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Licença de Uso</h2>
                <p className="text-sm mb-3">A permissão é concedida para usar o sistema conforme o plano contratado. Sob esta licença você não pode:</p>
                <ul className="space-y-1.5 text-sm">
                  {['Modificar ou copiar os materiais', 'Fazer engenharia reversa do software', 'Remover direitos autorais', 'Transferir ou espelhar os materiais'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Isenção de Responsabilidade</h2>
                <p className="text-sm">O sistema é fornecido "como está". A Wefit não oferece garantias expressas ou implícitas.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Limitações</h2>
                <p className="text-sm">A Wefit não será responsável por quaisquer danos decorrentes do uso ou incapacidade de usar o sistema.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Modificações</h2>
                <p className="text-sm">A Wefit pode revisar estes termos a qualquer momento. Ao continuar usando o sistema, você concorda com a versão vigente.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">6. Contato</h2>
                <p className="text-sm">Por e-mail: <strong className="text-purple-400">contato@wefit.com.br</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermosUso;
