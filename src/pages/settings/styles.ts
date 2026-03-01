import styled from 'styled-components';
import { colors } from '../../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
  h2 { font-size: 1.8rem; color: #1e293b; }
  p { color: #64748b; margin-top: 0.5rem; }
`;

export const SettingsWrapper = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

interface TabProps {
  active: boolean;
}

export const TabButton = styled.button<TabProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${({ active }) => (active ? colors.primary_transparent : 'transparent')};
  color: ${({ active }) => (active ? colors.primary : '#64748b')};
  font-weight: ${({ active }) => (active ? '700' : '500')};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  i { font-size: 1.2rem; }

  &:hover {
    background: ${colors.primary_transparent};
    color: ${colors.primary};
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  h3 { margin-bottom: 1.5rem; color: #1e293b; }
  p { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.2rem;

  label { font-size: 0.85rem; font-weight: 600; color: #475569; }
  
  input {
    padding: 0.8rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    outline: none;
    font-size: 1rem;
    &:focus { border-color: ${colors.primary}; }
  }
`;

export const SaveButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: filter 0.2s;

  &:hover { filter: brightness(0.9); }
`;

export const EmptyTab = styled.div`
  background: white;
  padding: 4rem;
  border-radius: 12px;
  text-align: center;
  color: #94a3b8;
  i { font-size: 3rem; margin-bottom: 1rem; }
`;