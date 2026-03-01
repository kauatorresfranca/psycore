import styled from 'styled-components';
import { colors } from '../../../styles';

// --- Layout Principal ---
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-1px);
  }

  i { 
    font-size: 1.2rem; 
  }
`;

// --- Tabela de Pacientes ---
export const TableContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 2px 4px 10px rgba(0,0,0,0.05);
  overflow-x: auto;
  min-height: 200px;
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  
  /* Esse é o segredo: permite espaçamento entre as linhas */
  border-separate: separate; 
  border-spacing: 0 1rem; // 0 na horizontal, 1rem na vertical

  thead {
    th {
      padding: 0 1rem 0.5rem 1rem; // Ajuste para não alinhar errado com o espaçamento
      color: #64748b;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  tbody {
    tr {
      background-color: ${colors.background}; // Garante que cada linha tenha fundo próprio
      transition: all 0.2s;
      
      /* Adiciona a sombra e bordas arredondadas para parecer um card */
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);

      td {
        padding: 1.2rem 1rem;
        color: #334155;
        vertical-align: middle;
        
        /* Arredonda as pontas da linha (card) */
        &:first-child {
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }
        &:last-child {
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        strong {
          display: block;
          color: #1e293b;
          font-size: 1rem;
        }

        span {
          font-size: 0.85rem;
          color: #94a3b8;
        }
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        filter: brightness(0.98);
      }
    }
  }
`;


// --- Badges e Ações ---
interface StatusProps {
  status: 'ativo' | 'inativo' | 'alta';
}

const statusColors = {
  ativo: { bg: '#dcfce7', text: '#15803d' },
  inativo: { bg: '#fee2e2', text: '#b91c1c' },
  alta: { bg: '#e0f2fe', text: '#0369a1' },
};

export const StatusBadge = styled.span<StatusProps>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${({ status }) => statusColors[status].bg};
  color: ${({ status }) => statusColors[status].text} !important;
  display: inline-block;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.primary};
  font-size: 1.2rem;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.primary_transparent};
    color: ${colors.primary};
  }
`;

// --- Estados Vazios e Loading ---
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
  color: #64748b;

  i {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #cbd5e1;
  }

  p {
    font-weight: 700;
    font-size: 1.2rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  span { 
    font-size: 0.95rem;
    max-width: 300px;
  }
`;

// --- Modal ---
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h3 { 
      font-size: 1.5rem;
      color: #1e293b; 
    }

    button { 
      background: #f1f5f9;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #64748b;
      transition: all 0.2s;

      &:hover {
        background: #e2e8f0;
        color: #1e293b;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
  }

  input, select {
    padding: 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 1rem;
    color: #1e293b;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: ${colors.primary};
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  select {
    cursor: pointer;
    background: white;
  }
`;