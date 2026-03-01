import styled from 'styled-components';
import { colors } from '../../../styles';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f8fafc;
  color: #334155;
  font-family: 'Inter', sans-serif;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  position: relative;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: ${colors.primary};
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

interface NavItemProps {
  isActive?: boolean;
}

export const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  i {
    font-size: 20px;
    color: #64748b;
  }

  &.active {
    background-color: #bfddfa62;
    color: ${colors.primary};

    i {
      color: ${colors.primary};
    }
  }

  &:hover:not(.active) {
    background-color: #f1f5f9;
  }
`;

// --- NOVOS ESTILOS PARA O MODAL DE LOGOUT ---

export const UserSectionContainer = styled.div`
  margin-top: auto;
  position: relative;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

export const LogoutModal = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ef4444; /* Vermelho para destaque de sair */
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #fef2f2;
  }

  i {
    font-size: 18px;
  }
`;

export const UserTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background-color: #f8fafc;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  i {
    margin-left: auto;
    color: #94a3b8;
  }
`;

export const UserInfo = styled.div`
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }
  p {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
    text-transform: uppercase;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
`;