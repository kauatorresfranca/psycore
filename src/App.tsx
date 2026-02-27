import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import { lazy, Suspense } from 'react';
import Layout from './layout';

// Carregamento dinâmico (Lazy Loading)
const Dashboard = lazy(() => import('./pages/dashboard'));
const Patients = lazy(() => import('./pages/Patients')); // Exemplo de outra página

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
            {/* Adicione novas rotas aqui: <Route path="agenda" element={<Agenda />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;