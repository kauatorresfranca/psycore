import Sidebar from '../components/sidebar'
import * as S from './styles';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <S.Container>
      <Sidebar />
      <S.MainContent>
        {/* O Outlet é onde o conteúdo de cada rota será renderizado */}
        <Outlet />
      </S.MainContent>
    </S.Container>
  );
};

export default Layout;