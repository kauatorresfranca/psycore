import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import { lazy, Suspense } from 'react';
import Layout from './layout';
import Evolucoes from './pages/evolucoes';
import Settings from './pages/settings';
import Agenda from './pages/Agenda';

// Carregamento dinâmico (Lazy Loading)
const Dashboard = lazy(() => import('./pages/dashboard'));
const Patients = lazy(() => import('./pages/patients')); // Exemplo de outra página

function App() {
  return (
    <BrowserRouter>
      {/* O Suspense mostra algo enquanto os arquivos das rotas são baixados */}
      <Suspense fallback={<div>Carregando sistema...</div>}>
        <Routes>
          {/* O Layout contém a Sidebar e o Header fixos */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="pacientes" element={<Patients />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="evolucoes" element={<Evolucoes />} />
            <Route path="configuracoes" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;