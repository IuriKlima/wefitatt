import React from 'react';

const PoliticaPrivacidade = () => {
  return (
    <div className="pt-20">
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-14">
            <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tight">
              Política de Privacidade
            </h1>
            
            <div className="space-y-8 text-gray-400 leading-relaxed">
              <p className="text-sm"><strong className="text-gray-300">Última atualização:</strong> 24 de julho de 2024</p>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">1. Introdução</h2>
                <p className="text-sm">A Wefit ("nós", "nosso") opera o sistema de gestão para academias Wefit (o "Serviço"). Esta página informa sobre nossas políticas em relação à coleta, uso e divulgação de dados pessoais quando você usa nosso Serviço.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">2. Coleta e Uso de Informações</h2>
                <p className="text-sm mb-3">Coletamos vários tipos de informações para fornecer e melhorar nosso Serviço:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span><strong className="text-gray-300">Dados Pessoais:</strong> e-mail, nome, telefone, dados de uso.</span></li>
                  <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span><span><strong className="text-gray-300">Dados de Uso:</strong> IP, navegador, páginas visitadas, tempo de visita.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">3. Uso dos Dados</h2>
                <ul className="space-y-1.5 text-sm">
                  {['Fornecer e manter nosso Serviço', 'Notificar sobre alterações', 'Fornecer suporte ao cliente', 'Coletar análises para melhorias', 'Monitorar o uso', 'Detectar e resolver problemas técnicos'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">4. Seus Direitos (LGPD)</h2>
                <p className="text-sm">A Wefit garante o cumprimento da LGPD. Você tem o direito de acessar, corrigir, portar e eliminar seus dados.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-3">5. Segurança</h2>
                <p className="text-sm">Utilizamos meios comercialmente aceitáveis para proteger seus dados pessoais, embora nenhum método de transmissão seja 100% seguro.</p>
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

export default PoliticaPrivacidade;
