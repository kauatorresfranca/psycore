import styled from 'styled-components';
import { colors } from '../../../styles';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
`;

export const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;

  header {
    text-align: center;
    margin-bottom: 2rem;
    h1 { color: ${colors.primary}; font-size: 1.8rem; font-weight: 800; }
    p { color: #64748b; margin-top: 0.5rem; }
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label { font-size: 0.85rem; font-weight: 700; color: #475569; }
  input { 
    padding: 1rem; border-radius: 12px; border: 1px solid #e2e8f0; background: #f8fafc;
    transition: 0.2s;
    &:focus { border-color: ${colors.primary}; background: white; outline: none; box-shadow: 0 0 0 4px ${colors.primary}10; }
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  background-color: ${colors.primary};
  color: white; border: none; padding: 1rem; border-radius: 12px;
  font-weight: 700; font-size: 1rem; cursor: pointer;
  transition: all 0.2s;
  
  &:hover { filter: brightness(0.9); transform: translateY(-1px); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;