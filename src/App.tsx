import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { lazy, Suspense } from 'react';
import Layout from './layout';
import Evolucoes from './pages/evolucoes';
import Settings from './pages/settings';
import Agenda from './pages/Agenda';
import Login from './pages/login';
import ProtectedRoute from './components/ProtectedRoute';

// Carregamento dinâmico
const Dashboard = lazy(() => import('./pages/dashboard'));
const Patients = lazy(() => import('./pages/Patients'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando sistema...</div>}>
        <Routes>
          {/* Rota Pública */}
          <Route path="login" element={<Login />} />

          {/* Grupo de Rotas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="pacientes" element={<Patients />} />
              <Route path="agenda" element={<Agenda />} />
              <Route path="evolucoes" element={<Evolucoes />} />
              <Route path="configuracoes" element={<Settings />} />
              <Route path="*" element={<div>Página não encontrada</div>} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;