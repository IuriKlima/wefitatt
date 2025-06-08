import React from 'react';
import { Card } from '@/components/ui/card';

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Política de Privacidade
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p><strong>Última atualização:</strong> 24 de julho de 2024</p>

            <h2 className="text-2xl font-bold text-gray-800">1. Introdução</h2>
            <p>A Wefit ("nós", "nosso") opera o sistema de gestão para academias Wefit (o "Serviço"). Esta página informa sobre nossas políticas em relação à coleta, uso e divulgação de dados pessoais quando você usa nosso Serviço e as escolhas que você associou a esses dados.</p>

            <h2 className="text-2xl font-bold text-gray-800">2. Coleta e Uso de Informações</h2>
            <p>Coletamos vários tipos de informações para diversos fins, para fornecer e melhorar nosso Serviço para você.</p>
            
            <h3 className="text-xl font-bold text-gray-700">Tipos de Dados Coletados</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Dados Pessoais:</strong> Ao usar nosso Serviço, podemos solicitar que você nos forneça algumas informações de identificação pessoal que podem ser usadas para contatá-lo ou identificá-lo ("Dados Pessoais"). Essas informações podem incluir, mas não estão limitadas a: endereço de e-mail, nome e sobrenome, número de telefone, dados de uso.</li>
              <li><strong>Dados de Uso:</strong> Podemos também coletar informações sobre como o Serviço é acessado e usado ("Dados de Uso"). Estes Dados de Uso podem incluir informações como o endereço de Protocolo de Internet do seu computador (por exemplo, endereço IP), tipo de navegador, versão do navegador, as páginas do nosso Serviço que você visita, a hora e a data da sua visita, o tempo gasto nessas páginas, identificadores únicos de dispositivos e outros dados de diagnóstico.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800">3. Uso dos Dados</h2>
            <p>A Wefit usa os dados coletados para diversos fins:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Para fornecer e manter nosso Serviço;</li>
              <li>Para notificá-lo sobre alterações no nosso Serviço;</li>
              <li>Para permitir que você participe de recursos interativos do nosso Serviço quando você optar por fazê-lo;</li>
              <li>Para fornecer suporte ao cliente;</li>
              <li>Para coletar análises ou informações valiosas para que possamos melhorar nosso Serviço;</li>
              <li>Para monitorar o uso do nosso Serviço;</li>
              <li>Para detectar, prevenir e resolver problemas técnicos.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800">4. Seus Direitos de Proteção de Dados (LGPD)</h2>
            <p>A Wefit se compromete a garantir a proteção dos seus dados e o cumprimento da Lei Geral de Proteção de Dados (LGPD) do Brasil. Você tem o direito de acessar, corrigir, portar, eliminar seus dados, além de confirmar que tratamos seus dados.</p>

            <h2 className="text-2xl font-bold text-gray-800">5. Segurança dos Dados</h2>
            <p>A segurança dos seus dados é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.</p>

            <h2 className="text-2xl font-bold text-gray-800">6. Contato</h2>
            <p>Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:</p>
            <p>Por e-mail: <strong>contato@wefit.com.br</strong></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
