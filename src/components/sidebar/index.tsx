import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as S from './styles';

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: 'ri-dashboard-line' },
    { label: 'Pacientes', path: '/pacientes', icon: 'ri-user-line' },
    { label: 'Agenda', path: '/agenda', icon: 'ri-calendar-line' },
    { label: 'Evoluções', path: '/evolucoes', icon: 'ri-file-list-line' },
    { label: 'Configurações', path: '/configuracoes', icon: 'ri-settings-3-line' },
  ];

  const handleLogout = () => {
    // Adicione aqui sua lógica de logout (ex: limpar token, redirecionar)
    console.log("Saindo...");
  };

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

      <S.UserSectionContainer>
        {showLogout && (
          <S.LogoutModal onClick={handleLogout}>
            <i className="ri-logout-box-line"></i> Sair da conta
          </S.LogoutModal>
        )}
        
        <S.UserTrigger onClick={() => setShowLogout(!showLogout)}>
          <img src="/src/assets/images/logout.png" alt="Perfil" />
          <S.UserInfo>
            <h4>Psicólogo(a)</h4>
            <p>CRP 00/00000</p>
          </S.UserInfo>
          <i className={showLogout ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
        </S.UserTrigger>
      </S.UserSectionContainer>
    </S.Sidebar>
  );
};

export default Sidebar;