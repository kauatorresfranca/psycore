import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as S from './styles';

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [userName, setUserName] = useState('Profissional');
  const navigate = useNavigate();

  useEffect(() => {
    // Busca o nome do usuário salvo no login
    const savedUser = localStorage.getItem('@Clinica:user');
    if (savedUser && savedUser !== "undefined") {
      setUserName(savedUser);
    }
  }, []);

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: 'ri-dashboard-line' },
    { label: 'Pacientes', path: '/pacientes', icon: 'ri-user-line' },
    { label: 'Agenda', path: '/agenda', icon: 'ri-calendar-line' },
    { label: 'Evoluções', path: '/evolucoes', icon: 'ri-file-list-line' },
    { label: 'Configurações', path: '/configuracoes', icon: 'ri-settings-3-line' },
  ];

  const handleLogout = () => {
    // Limpa os dados do navegador
    localStorage.removeItem('@Clinica:token');
    localStorage.removeItem('@Clinica:user');
    
    // Redireciona para o login
    navigate('/login');
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
            <i className="ri-logout-box-line"></i> Sair
          </S.LogoutModal>
        )}
        
        <S.UserTrigger onClick={() => setShowLogout(!showLogout)}>
          {/* Avatar genérico usando as iniciais ou imagem padrão */}
          <div className="avatar-placeholder">
            {userName[0]?.toUpperCase()}
          </div>
          <S.UserInfo>
            <h4>{userName}</h4>
            <p>Psicólogo(a)</p>
          </S.UserInfo>
          <i className={showLogout ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
        </S.UserTrigger>
      </S.UserSectionContainer>
    </S.Sidebar>
  );
};

export default Sidebar;