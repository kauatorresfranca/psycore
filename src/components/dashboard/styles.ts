import styled from 'styled-components';

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
  gap: 10px;

  span {
    color: #3b82f6;
  }
`;

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

interface NavItemProps {
  active?: boolean;
}

export const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? '#eff6ff' : 'transparent'};
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #3b82f6;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.8rem;
    color: #1e293b;
  }
  
  p {
    color: #64748b;
    margin-top: 0.5rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;