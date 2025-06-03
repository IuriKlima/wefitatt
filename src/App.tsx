
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Layout from "@/components/Layout";

// Auth Pages
import Login from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import CadastroPasso2 from "@/pages/CadastroPasso2";
import RecuperarSenha from "@/pages/RecuperarSenha";
import RedefinirSenha from "@/pages/RedefinirSenha";
import DashboardGenerico from "@/pages/DashboardGenerico";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUnidades from "@/pages/admin/Unidades";
import AdminUsuarios from "@/pages/admin/Usuarios";
import AdminConfiguracoes from "@/pages/admin/Configuracoes";
import AdminRelatorios from "@/pages/admin/Relatorios";
import AdminAnalytics from "@/pages/admin/Analytics";

// Gestor Pages
import GestorDashboard from "@/pages/gestor/Dashboard";
import GestorAlunos from "@/pages/gestor/Alunos";
import GestorGradeAulas from "@/pages/gestor/GradeAulas";
import GestorInstrutores from "@/pages/gestor/Instrutores";
import GestorFinanceiro from "@/pages/gestor/Financeiro";
import GestorMetas from "@/pages/gestor/Metas";
import GestorEstoque from "@/pages/gestor/Estoque";
import GestorManutencao from "@/pages/gestor/Manutencao";
import GestorEventos from "@/pages/gestor/Eventos";
import GestorFeedback from "@/pages/gestor/Feedback";
import GestorComunicacao from "@/pages/gestor/Comunicacao";

// Instrutor Pages
import InstrutorDashboard from "@/pages/instrutor/Dashboard";
import InstrutorAulas from "@/pages/instrutor/Aulas";
import InstrutorAlunos from "@/pages/instrutor/Alunos";
import InstrutorExercicios from "@/pages/instrutor/Exercicios";
import InstrutorAvaliacoes from "@/pages/instrutor/Avaliacoes";
import InstrutorChat from "@/pages/instrutor/Chat";
import InstrutorPlanosTreino from "@/pages/instrutor/PlanosTreino";

// Recepcionista Pages
import RecepcionistaDashboard from "@/pages/recepcionista/Dashboard";
import RecepcionistaCheckin from "@/pages/recepcionista/Checkin";
import RecepcionistaCadastro from "@/pages/recepcionista/Cadastro";
import RecepcionistaAgendamentos from "@/pages/recepcionista/Agendamentos";
import RecepcionistaPOS from "@/pages/recepcionista/POS";
import RecepcionistaAlertas from "@/pages/recepcionista/Alertas";
import RecepcionistaListaEspera from "@/pages/recepcionista/ListaEspera";
import RecepcionistaOcorrencias from "@/pages/recepcionista/Ocorrencias";
import RecepcionistaFAQ from "@/pages/recepcionista/FAQ";

// Aluno Pages
import AlunoPainel from "@/pages/aluno/Painel";
import AlunoAgendar from "@/pages/aluno/Agendar";
import AlunoTreinos from "@/pages/aluno/Treinos";
import AlunoProgresso from "@/pages/aluno/Progresso";
import AlunoConta from "@/pages/aluno/Conta";
import AlunoGamificacao from "@/pages/aluno/Gamificacao";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-passo-2" element={<CadastroPasso2 />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route path="/dashboard-generico" element={<DashboardGenerico />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin/analytics" element={<Layout><AdminAnalytics /></Layout>} />
            <Route path="/admin/unidades" element={<Layout><AdminUnidades /></Layout>} />
            <Route path="/admin/usuarios" element={<Layout><AdminUsuarios /></Layout>} />
            <Route path="/admin/configuracoes" element={<Layout><AdminConfiguracoes /></Layout>} />
            <Route path="/admin/relatorios" element={<Layout><AdminRelatorios /></Layout>} />

            {/* Gestor Routes */}
            <Route path="/gestor/dashboard" element={<Layout><GestorDashboard /></Layout>} />
            <Route path="/gestor/alunos" element={<Layout><GestorAlunos /></Layout>} />
            <Route path="/gestor/grade-aulas" element={<Layout><GestorGradeAulas /></Layout>} />
            <Route path="/gestor/instrutores" element={<Layout><GestorInstrutores /></Layout>} />
            <Route path="/gestor/financeiro" element={<Layout><GestorFinanceiro /></Layout>} />
            <Route path="/gestor/metas" element={<Layout><GestorMetas /></Layout>} />
            <Route path="/gestor/estoque" element={<Layout><GestorEstoque /></Layout>} />
            <Route path="/gestor/manutencao" element={<Layout><GestorManutencao /></Layout>} />
            <Route path="/gestor/eventos" element={<Layout><GestorEventos /></Layout>} />
            <Route path="/gestor/feedback" element={<Layout><GestorFeedback /></Layout>} />
            <Route path="/gestor/comunicacao" element={<Layout><GestorComunicacao /></Layout>} />

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
            <Route path="/recepcionista/alertas" element={<Layout><RecepcionistaAlertas /></Layout>} />
            <Route path="/recepcionista/lista-espera" element={<Layout><RecepcionistaListaEspera /></Layout>} />
            <Route path="/recepcionista/ocorrencias" element={<Layout><RecepcionistaOcorrencias /></Layout>} />
            <Route path="/recepcionista/faq" element={<Layout><RecepcionistaFAQ /></Layout>} />

            {/* Aluno Routes */}
            <Route path="/aluno/painel" element={<Layout><AlunoPainel /></Layout>} />
            <Route path="/aluno/agendar" element={<Layout><AlunoAgendar /></Layout>} />
            <Route path="/aluno/treinos" element={<Layout><AlunoTreinos /></Layout>} />
            <Route path="/aluno/progresso" element={<Layout><AlunoProgresso /></Layout>} />
            <Route path="/aluno/gamificacao" element={<Layout><AlunoGamificacao /></Layout>} />
            <Route path="/aluno/conta" element={<Layout><AlunoConta /></Layout>} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
