WeFit – Plataforma SaaS de Gestão para Academias

WeFit é uma solução SaaS desenvolvida para otimizar a gestão de academias, estúdios de treinamento e redes fitness. O sistema foi projetado com foco em escalabilidade, usabilidade e automação de processos operacionais, integrando funcionalidades administrativas, financeiras, comerciais e de atendimento em uma única plataforma.

A aplicação é composta por um front-end em React com estilização em TailwindCSS, e um back-end em Node.js com TypeScript, utilizando banco de dados relacional (PostgreSQL ou MySQL) e arquitetura multi-tenant. O projeto possui suporte a autenticação multiusuário com diferentes níveis de acesso (Proprietário, Gestor, Instrutor, Recepcionista, Vendedor, Marketing e Aluno), garantindo controle granular de permissões.

Entre os principais módulos, destacam-se:

Gestão Financeira: controle de planos, inadimplência, relatórios e dashboards em tempo real.

Agendamento e Presença: sistema de marcação de aulas com limite de vagas e check-in integrado.

Fichas de Treino e Avaliações: criação e histórico de treinos, evolução física com gráficos comparativos.

CRM e Funil de Vendas: cadastro de leads, pipeline de propostas, automação de follow-ups.

Marketing Integrado: criação de landing pages, campanhas automatizadas e segmentação por perfil.

Integração com WhatsApp: atendimento automatizado via chatbot (TalkMate) com variações de mensagem para evitar bloqueio, integração direta com o sistema via API.


A plataforma também conta com um painel do aluno, onde é possível acompanhar treinos, pagamentos, agendamentos e progresso, tudo com interface mobile-first e responsiva.

Este repositório representa a base do sistema e está em desenvolvimento contínuo. Ele segue boas práticas de estruturação de código, componentização, versionamento e integração futura com gateways de pagamento como o Wefit Pay.


---

Tecnologias utilizadas:

Front-end: React, TailwindCSS

Back-end: Node.js, TypeScript

Banco de dados: PostgreSQL ou MySQL

Autenticação: JWT ou OAuth (configurável)

Integrações: WhatsApp API, serviços de e-mail, gateway de pagamento



---

Licença: MIT
Desenvolvedor: @IuriKlima
