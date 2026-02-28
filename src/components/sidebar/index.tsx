import { NavLink } from 'react-router-dom';
import * as S from './styles';

const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', path: '/', icon: 'ri-dashboard-line' },
    { label: 'Pacientes', path: '/pacientes',icon: 'ri-user-line' },
    { label: 'Agenda', path: '/agenda',icon: 'ri-calendar-line' },
    { label: 'Evoluções', path: '/evolucoes',icon: 'ri-file-list-line' },
    { label: 'Configurações', path: '/configuracoes',icon: 'ri-settings-3-line' },
  ];

  return (
    <S.Sidebar>
      <S.Logo>
        <span><i className="ri-brain-line"></i></span> Psycore
      </S.Logo>

      <S.NavMenu>
        {menuItems.map((item) => (
          <S.NavItem
            key={item.path}
            as={NavLink}
            to={item.path}
            className={({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')}
          >
            <i className={item.icon}></i> {item.label}
          </S.NavItem>
        ))}
      </S.NavMenu>

      <S.NavItem style={{ marginTop: 'auto', color: '#ef4444', cursor: 'pointer' }}>
        Sair
      </S.NavItem>
    </S.Sidebar>
  );
};

export default Sidebar;