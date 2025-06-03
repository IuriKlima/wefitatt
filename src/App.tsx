
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/contexts/UserContext';
import PublicLayout from '@/components/PublicLayout';
import Layout from '@/components/Layout';

// Public pages
import Homepage from '@/pages/Homepage';
import Planos from '@/pages/Planos';
import Sobre from '@/pages/Sobre';
import Contato from '@/pages/Contato';
import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade';
import TermosUso from '@/pages/TermosUso';

// Auth pages
import Login from '@/pages/Login';
import Cadastro from '@/pages/Cadastro';
import CadastroPasso2 from '@/pages/CadastroPasso2';
import CadastroFluxo from '@/pages/CadastroFluxo';
import CadastroFinalizado from '@/pages/CadastroFinalizado';
import RecuperarSenha from '@/pages/RecuperarSenha';
import RedefinirSenha from '@/pages/RedefinirSenha';
import DashboardGenerico from '@/pages/DashboardGenerico';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsuarios from '@/pages/admin/Usuarios';
import AdminUnidades from '@/pages/admin/Unidades';
import AdminAnalytics from '@/pages/admin/Analytics';
import AdminRelatorios from '@/pages/admin/Relatorios';
import AdminConfiguracoes from '@/pages/admin/Configuracoes';

// Gestor pages
import GestorDashboard from '@/pages/gestor/Dashboard';
import GestorAlunos from '@/pages/gestor/Alunos';
import GestorInstrutores from '@/pages/gestor/Instrutores';
import GestorFinanceiro from '@/pages/gestor/Financeiro';
import GestorGradeAulas from '@/pages/gestor/GradeAulas';
import GestorEventos from '@/pages/gestor/Eventos';
import GestorEstoque from '@/pages/gestor/Estoque';
import GestorManutencao from '@/pages/gestor/Manutencao';
import GestorComunicacao from '@/pages/gestor/Comunicacao';
import GestorFeedback from '@/pages/gestor/Feedback';
import GestorMetas from '@/pages/gestor/Metas';

// Instrutor pages
import InstrutorDashboard from '@/pages/instrutor/Dashboard';
import InstrutorAulas from '@/pages/instrutor/Aulas';
import InstrutorAlunos from '@/pages/instrutor/Alunos';
import InstrutorPlanosTreino from '@/pages/instrutor/PlanosTreino';
import InstrutorExercicios from '@/pages/instrutor/Exercicios';
import InstrutorAvaliacoes from '@/pages/instrutor/Avaliacoes';
import InstrutorChat from '@/pages/instrutor/Chat';

// Recepcionista pages
import RecepcionistaDashboard from '@/pages/recepcionista/Dashboard';
import RecepcionistaCheckin from '@/pages/recepcionista/Checkin';
import RecepcionistaCadastro from '@/pages/recepcionista/Cadastro';
import RecepcionistaAgendamentos from '@/pages/recepcionista/Agendamentos';
import RecepcionistaPOS from '@/pages/recepcionista/POS';
import RecepcionistaListaEspera from '@/pages/recepcionista/ListaEspera';
import RecepcionistaOcorrencias from '@/pages/recepcionista/Ocorrencias';
import RecepcionistaAlertas from '@/pages/recepcionista/Alertas';
import RecepcionistaFAQ from '@/pages/recepcionista/FAQ';

// Aluno pages
import AlunoPainel from '@/pages/aluno/Painel';
import AlunoTreinos from '@/pages/aluno/Treinos';
import AlunoAgendar from '@/pages/aluno/Agendar';
import AlunoProgresso from '@/pages/aluno/Progresso';
import AlunoGamificacao from '@/pages/aluno/Gamificacao';
import AlunoConta from '@/pages/aluno/Conta';

// Not Found page
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes with Public Layout */}
          <Route path="/" element={
            <PublicLayout>
              <Homepage />
            </PublicLayout>
          } />
          <Route path="/planos" element={
            <PublicLayout>
              <Planos />
            </PublicLayout>
          } />
          <Route path="/sobre" element={
            <PublicLayout>
              <Sobre />
            </PublicLayout>
          } />
          <Route path="/contato" element={
            <PublicLayout>
              <Contato />
            </PublicLayout>
          } />
          <Route path="/politica-privacidade" element={
            <PublicLayout>
              <PoliticaPrivacidade />
            </PublicLayout>
          } />
          <Route path="/termos-uso" element={
            <PublicLayout>
              <TermosUso />
            </PublicLayout>
          } />

          {/* Auth Routes (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-passo-2" element={<CadastroPasso2 />} />
          <Route path="/cadastro-fluxo" element={<CadastroFluxo />} />
          <Route path="/cadastro-finalizado" element={<CadastroFinalizado />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/dashboard-generico" element={<DashboardGenerico />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/admin/usuarios" element={<Layout><AdminUsuarios /></Layout>} />
          <Route path="/admin/unidades" element={<Layout><AdminUnidades /></Layout>} />
          <Route path="/admin/analytics" element={<Layout><AdminAnalytics /></Layout>} />
          <Route path="/admin/relatorios" element={<Layout><AdminRelatorios /></Layout>} />
          <Route path="/admin/configuracoes" element={<Layout><AdminConfiguracoes /></Layout>} />

          {/* Gestor Routes */}
          <Route path="/gestor/dashboard" element={<Layout><GestorDashboard /></Layout>} />
          <Route path="/gestor/alunos" element={<Layout><GestorAlunos /></Layout>} />
          <Route path="/gestor/instrutores" element={<Layout><GestorInstrutores /></Layout>} />
          <Route path="/gestor/financeiro" element={<Layout><GestorFinanceiro /></Layout>} />
          <Route path="/gestor/grade-aulas" element={<Layout><GestorGradeAulas /></Layout>} />
          <Route path="/gestor/eventos" element={<Layout><GestorEventos /></Layout>} />
          <Route path="/gestor/estoque" element={<Layout><GestorEstoque /></Layout>} />
          <Route path="/gestor/manutencao" element={<Layout><GestorManutencao /></Layout>} />
          <Route path="/gestor/comunicacao" element={<Layout><GestorComunicacao /></Layout>} />
          <Route path="/gestor/feedback" element={<Layout><GestorFeedback /></Layout>} />
          <Route path="/gestor/metas" element={<Layout><GestorMetas /></Layout>} />

          {/* Instrutor Routes */}
          <Route path="/instrutor/dashboard" element={<Layout><InstrutorDashboard /></Layout>} />
          <Route path="/instrutor/aulas" element={<Layout><InstrutorAulas /></Layout>} />
          <Route path="/instrutor/alunos" element={<Layout><InstrutorAlunos /></Layout>} />
          <Route path="/instrutor/planos-treino" element={<Layout><InstrutorPlanosTreino /></Layout>} />
          <Route path="/instrutor/exercicios" element={<Layout><InstrutorExercicios /></Layout>} />
          <Route path="/instrutor/avaliacoes" element={<Layout><InstrutorAvaliacoes /></Layout>} />
          <Route path="/instrutor/chat" element={<Layout><InstrutorChat /></Layout>} />

          {/* Recepcionista Routes */}
          <Route path="/recepcionista/dashboard" element={<Layout><RecepcionistaDashboard /></Layout>} />
          <Route path="/recepcionista/checkin" element={<Layout><RecepcionistaCheckin /></Layout>} />
          <Route path="/recepcionista/cadastro" element={<Layout><RecepcionistaCadastro /></Layout>} />
          <Route path="/recepcionista/agendamentos" element={<Layout><RecepcionistaAgendamentos /></Layout>} />
          <Route path="/recepcionista/pos" element={<Layout><RecepcionistaPOS /></Layout>} />
          <Route path="/recepcionista/lista-espera" element={<Layout><RecepcionistaListaEspera /></Layout>} />
          <Route path="/recepcionista/ocorrencias" element={<Layout><RecepcionistaOcorrencias /></Layout>} />
          <Route path="/recepcionista/alertas" element={<Layout><RecepcionistaAlertas /></Layout>} />
          <Route path="/recepcionista/faq" element={<Layout><RecepcionistaFAQ /></Layout>} />

          {/* Aluno Routes */}
          <Route path="/aluno/painel" element={<Layout><AlunoPainel /></Layout>} />
          <Route path="/aluno/treinos" element={<Layout><AlunoTreinos /></Layout>} />
          <Route path="/aluno/agendar" element={<Layout><AlunoAgendar /></Layout>} />
          <Route path="/aluno/progresso" element={<Layout><AlunoProgresso /></Layout>} />
          <Route path="/aluno/gamificacao" element={<Layout><AlunoGamificacao /></Layout>} />
          <Route path="/aluno/conta" element={<Layout><AlunoConta /></Layout>} />

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </UserProvider>
  );
}

export default App;
