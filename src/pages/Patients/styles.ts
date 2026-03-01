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
  h2 { font-size: 1.8rem; color: #1e293b; font-weight: 800; }
  p { color: #64748b; margin-top: 0.3rem; }
`;

export const Toolbar = styled.div`
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  
  .search-group {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    i { color: #94a3b8; font-size: 1.2rem; }
    input { border: none; width: 100%; outline: none; font-size: 0.95rem; color: #1e293b;
      &::placeholder { color: #cbd5e1; }
    }
  }
`;

export const AddButton = styled.button`
  background-color: ${colors.primary};
  color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px;
  font-weight: 600; display: flex; align-items: center; gap: 0.6rem; cursor: pointer;
  transition: all 0.2s; &:hover { filter: brightness(0.9); transform: translateY(-1px); }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-separate: separate;
  border-spacing: 0 0.8rem;
  table-layout: fixed; /* Força o alinhamento fixo das colunas */

  thead th {
    padding: 0 1.5rem; /* Padding horizontal idêntico ao do td */
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: left; /* Garante que o título acompanhe o dado */
  }

  /* Definindo larguras para as colunas não "dançarem" */
  thead th:nth-child(1) { width: 35%; } /* Nome */
  thead th:nth-child(2) { width: 20%; } /* Contato */
  thead th:nth-child(3) { width: 15%; } /* Status */
  thead th:nth-child(4) { width: 15%; } /* Cadastro */
  thead th:nth-child(5) { width: 15%; text-align: right; } /* Ações */

  tbody tr {
    background: white;
    transition: all 0.2s;
    
    td {
      padding: 1.2rem 1.5rem; /* Padding vertical e horizontal consistentes */
      vertical-align: middle;
      color: #475569;
      font-size: 0.95rem;
      border-top: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;

      &:first-child { 
        border-left: 1px solid #f1f5f9; 
        border-radius: 16px 0 0 16px; 
      }
      &:last-child { 
        border-right: 1px solid #f1f5f9; 
        border-radius: 0 16px 16px 0; 
      }
    }

    &:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); 
    }
  }

  .patient-cell {
    display: flex; align-items: center; gap: 1rem;
    .avatar { width: 38px; height: 38px; border-radius: 10px; background: #eef2ff; color: ${colors.primary};
      display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; }
    strong { color: #1e293b; display: block; }
    span { font-size: 0.8rem; color: #94a3b8; }
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800;
  background: ${({ status }) => 
    status === 'ativo' ? '#ecfdf5' : status === 'inativo' ? '#fef2f2' : '#eff6ff'};
  color: ${({ status }) => 
    status === 'ativo' ? '#10b981' : status === 'inativo' ? '#ef4444' : '#3b82f6'};
`;

export const ActionButton = styled.button`
  background: none; border: none; color: #cbd5e1; cursor: pointer; font-size: 1.1rem;
  padding: 5px; margin-left: 0.5rem; transition: 0.2s;
  &:hover { color: ${colors.primary}; }
`;

export const EmptyState = styled.div`
  text-align: center; padding: 5rem; background: #f8fafc; border-radius: 20px; border: 2px dashed #e2e8f0;
  i { font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem; display: block; }
  p { color: #1e293b; font-weight: 700; font-size: 1.1rem; }
  span { color: #94a3b8; font-size: 0.9rem; }
`;

// Reuse Modal Styles (Consistente com Agenda)
export const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(6px);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;

export const ModalContent = styled.div`
  background: white; padding: 2.5rem; border-radius: 20px; width: 100%; max-width: 550px;
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;
    h3 { font-size: 1.3rem; color: #1e293b; }
    button { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; } }
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.4rem;
  label { font-size: 0.85rem; font-weight: 700; color: #475569; }
  input, select { padding: 0.8rem; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8fafc;
    &:focus { border-color: ${colors.primary}; background: white; outline: none; } }
`;