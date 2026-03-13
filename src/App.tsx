
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/contexts/ThemeContext';
import PublicLayout from '@/components/PublicLayout';
import Layout from '@/components/Layout';
import { UserProvider } from '@/contexts/UserContext';

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

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import SystemDashboard from '@/pages/admin/SystemDashboard';
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
import GestorPlanos from '@/pages/gestor/Planos';
import GestorConfiguracoes from '@/pages/gestor/Configuracoes';
import GestorLandingPageBuilder from '@/pages/gestor/LandingPageBuilder';

// Instrutor pages
import InstrutorDashboard from '@/pages/instrutor/Dashboard';
import InstrutorAulas from '@/pages/instrutor/Aulas';
import InstrutorAlunos from '@/pages/instrutor/Alunos';
import InstrutorPlanosTreino from '@/pages/instrutor/PlanosTreino';
import InstrutorExercicios from '@/pages/instrutor/Exercicios';
import InstrutorAvaliacoes from '@/pages/instrutor/Avaliacoes';

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

// Protected Route Component
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <Layout><AdminDashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/system" element={
                <ProtectedRoute>
                  <Layout><SystemDashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/usuarios" element={
                <ProtectedRoute>
                  <Layout><AdminUsuarios /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/unidades" element={
                <ProtectedRoute>
                  <Layout><AdminUnidades /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute>
                  <Layout><AdminAnalytics /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/relatorios" element={
                <ProtectedRoute>
                  <Layout><AdminRelatorios /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/configuracoes" element={
                <ProtectedRoute>
                  <Layout><AdminConfiguracoes /></Layout>
                </ProtectedRoute>
              } />

              {/* Gestor Routes */}
              <Route path="/gestor" element={<Navigate to="/gestor/dashboard" replace />} />
              <Route path="/gestor/dashboard" element={
                <ProtectedRoute>
                  <Layout><GestorDashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/alunos" element={
                <ProtectedRoute>
                  <Layout><GestorAlunos /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/instrutores" element={
                <ProtectedRoute>
                  <Layout><GestorInstrutores /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/financeiro" element={
                <ProtectedRoute>
                  <Layout><GestorFinanceiro /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/grade-aulas" element={
                <ProtectedRoute>
                  <Layout><GestorGradeAulas /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/eventos" element={
                <ProtectedRoute>
                  <Layout><GestorEventos /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/estoque" element={
                <ProtectedRoute>
                  <Layout><GestorEstoque /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/manutencao" element={
                <ProtectedRoute>
                  <Layout><GestorManutencao /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/comunicacao" element={
                <ProtectedRoute>
                  <Layout><GestorComunicacao /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/feedback" element={
                <ProtectedRoute>
                  <Layout><GestorFeedback /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/metas" element={
                <ProtectedRoute>
                  <Layout><GestorMetas /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/planos" element={
                <ProtectedRoute>
                  <Layout><GestorPlanos /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/landing-page" element={
                <ProtectedRoute>
                  <Layout><GestorLandingPageBuilder /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/gestor/configuracoes" element={
                <ProtectedRoute>
                  <Layout><GestorConfiguracoes /></Layout>
                </ProtectedRoute>
              } />

              {/* Instrutor Routes */}
              <Route path="/instrutor/dashboard" element={
                <ProtectedRoute>
                  <Layout><InstrutorDashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/instrutor/aulas" element={
                <ProtectedRoute>
                  <Layout><InstrutorAulas /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/instrutor/alunos" element={
                <ProtectedRoute>
                  <Layout><InstrutorAlunos /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/instrutor/planos-treino" element={
                <ProtectedRoute>
                  <Layout><InstrutorPlanosTreino /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/instrutor/exercicios" element={
                <ProtectedRoute>
                  <Layout><InstrutorExercicios /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/instrutor/avaliacoes" element={
                <ProtectedRoute>
                  <Layout><InstrutorAvaliacoes /></Layout>
                </ProtectedRoute>
              } />

              {/* Recepcionista Routes */}
              <Route path="/recepcionista/dashboard" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaDashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/checkin" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaCheckin /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/cadastro" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaCadastro /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/agendamentos" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaAgendamentos /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/pos" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaPOS /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/lista-espera" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaListaEspera /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/ocorrencias" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaOcorrencias /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/alertas" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaAlertas /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/recepcionista/faq" element={
                <ProtectedRoute>
                  <Layout><RecepcionistaFAQ /></Layout>
                </ProtectedRoute>
              } />

              {/* Aluno Routes */}
              <Route path="/aluno/painel" element={
                <ProtectedRoute>
                  <Layout><AlunoPainel /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/aluno/treinos" element={
                <ProtectedRoute>
                  <Layout><AlunoTreinos /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/aluno/agendar" element={
                <ProtectedRoute>
                  <Layout><AlunoAgendar /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/aluno/progresso" element={
                <ProtectedRoute>
                  <Layout><AlunoProgresso /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/aluno/gamificacao" element={
                <ProtectedRoute>
                  <Layout><AlunoGamificacao /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/aluno/conta" element={
                <ProtectedRoute>
                  <Layout><AlunoConta /></Layout>
                </ProtectedRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
