import styled from 'styled-components';
import { colors } from '../../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 { font-size: 1.8rem; color: #1e293b; }
  p { color: #64748b; margin-top: 0.5rem; }
`;

export const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  max-width: 500px;

  i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 2.8rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    outline: none;
    background: white;
    
    &:focus { border-color: ${colors.primary}; }
  }
`;

export const EvolutionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EvolutionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f1f5f9;

    .patient-info {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      
      i { font-size: 1.4rem; color: ${colors.primary}; }
      strong { font-size: 1.1rem; color: #1e293b; }
    }
  }

  .card-footer {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: #64748b;

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .edit-btn {
      margin-left: auto;
      background: none;
      border: none;
      color: ${colors.primary};
      font-weight: 600;
      cursor: pointer;
      &:hover { text-decoration: underline; }
    }
  }

  &:hover {
    transform: translateY(-3px);
  }
`;

export const EvolutionText = styled.p`
  color: #475569;
  line-height: 1.6;
  font-size: 0.95rem;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #cbd5e1;
`;

export const Badge = styled.span`
  background: ${colors.primary_transparent};
  color: ${colors.primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const AddButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

// Reuse Modal Styles
export const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;

export const ModalContent = styled.div`
  background: white; padding: 2.5rem; border-radius: 16px; width: 100%; max-width: 600px;
  header {
    display: flex; justify-content: space-between; margin-bottom: 2rem;
    button { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
  }
  form { display: flex; flex-direction: column; gap: 1.2rem; }
`;

export const InputGroup = styled.div`
  display: flex; flex-direction: column; gap: 0.5rem;
  label { font-size: 0.85rem; font-weight: 600; color: #475569; }
  select, textarea {
    padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px; outline: none;
    &:focus { border-color: ${colors.primary}; }
  }
  textarea { resize: vertical; }
`;

export const EmptyState = styled.div`
  text-align: center; padding: 5rem; color: #94a3b8;
  i { font-size: 3rem; margin-bottom: 1rem; display: block; }
  p { color: #1e293b; font-weight: 700; }
`;