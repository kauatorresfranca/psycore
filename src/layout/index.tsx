import Sidebar from '../components/sidebar'
import * as S from './styles';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <S.Container>
      <Sidebar />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.Container>
  );
};

export default Layout;