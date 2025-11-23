import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login/Login';
import Avaliacoes from './pages/Professor/Avaliacoes/Avaliacoes';
import NovaAvaliacao from './pages/Professor/Avaliacoes/NovaAvaliacao';
import EditarAvaliacao from './pages/Professor/Avaliacoes/EditarAvaliacao';
import Questoes from './pages/Professor/Questoes/Questoes';
import CadastroQuestao from './pages/Professor/Questoes/CadastroQuestao';
import Professores from './pages/Admin/Professores/Professores';

// Componente para redirecionar usuários autenticados da página de login
const LoginRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Carregando...</p>
    </div>;
  }

  if (user) {
    // Redireciona para a página apropriada baseada no perfil
    const redirectPath = user.perfil === 'ADMIN' ? '/admin/professores' : '/professor/avaliacoes';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
          
          {/* Rotas do Professor */}
          <Route 
            path="/professor/avaliacoes" 
            element={
              <ProtectedRoute requiredRole="PROFESSOR">
                <Avaliacoes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/professor/avaliacoes/nova" 
            element={
              <ProtectedRoute requiredRole="PROFESSOR">
                <NovaAvaliacao />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/professor/avaliacoes/editar/:id" 
            element={
              <ProtectedRoute requiredRole="PROFESSOR">
                <EditarAvaliacao />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/professor/questoes" 
            element={
              <ProtectedRoute requiredRole="PROFESSOR">
                <Questoes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/professor/questoes/nova" 
            element={
              <ProtectedRoute requiredRole="PROFESSOR">
                <CadastroQuestao />
              </ProtectedRoute>
            } 
          />
          
          {/* Rotas do Admin */}
          <Route 
            path="/admin/professores" 
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <Professores />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota padrão */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
