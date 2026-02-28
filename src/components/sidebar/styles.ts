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
  background-color: 'transparent';
  color: ${colors.primary};
  font-size: 0.95rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  i {
    font-size: 20px;
    font-weight: 200;
    color: ${colors.primary};
  }

  &.active {
    background-color: #bfddfa62;
  }
  
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
`;