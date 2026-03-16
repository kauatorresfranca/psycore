import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('@Clinica:token');

  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, permite visualizar as rotas filhas
  return <Outlet />;
};

export default ProtectedRoute;