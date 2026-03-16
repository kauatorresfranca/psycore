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
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    i { color: ${colors.primary}; font-size: 1.2rem; }
    input { border: none; outline: none; font-size: 0.95rem; color: #1e293b; font-weight: 600; cursor: pointer; }
  }
`;

export const AddButton = styled.button`
  background-color: ${colors.primary};
  color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px;
  font-weight: 600; display: flex; align-items: center; gap: 0.6rem; cursor: pointer;
  transition: all 0.2s; &:hover { filter: brightness(0.9); transform: translateY(-1px); }
`;

export const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const statusMap = {
  confirmado: { color: '#10b981', bg: '#ecfdf5' },
  pendente: { color: '#f59e0b', bg: '#fffbeb' },
  cancelado: { color: '#ef4444', bg: '#fef2f2' },
};

export const AppointmentCard = styled.div<{ status: 'confirmado' | 'pendente' | 'cancelado' }>`
  background: white;
  padding: 1.2rem 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  border: 1px solid #f1f5f9;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
  }

  .time-info {
    min-width: 80px;
    strong { font-size: 1.1rem; color: #1e293b; font-weight: 800; }
  }

  .patient-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar { 
      width: 40px; height: 40px; border-radius: 10px; background: #eef2ff; color: ${colors.primary};
      display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; 
    }
    strong { color: #1e293b; display: block; font-size: 1rem; }
    span { font-size: 0.8rem; color: #94a3b8; }
  }

  .status-area {
    margin: 0 1.5rem;
  }

  .actions-area {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const EvolutionButton = styled.button<{ hasEvo: boolean }>`
  background: ${({ hasEvo }) => hasEvo ? '#f8fafc' : `${colors.primary}10`};
  color: ${({ hasEvo }) => hasEvo ? '#64748b' : colors.primary};
  border: 1px solid ${({ hasEvo }) => hasEvo ? '#e2e8f0' : 'transparent'};
  padding: 0.6rem 1rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ hasEvo }) => hasEvo ? '#f1f5f9' : colors.primary};
    color: ${({ hasEvo }) => hasEvo ? '#1e293b' : 'white'};
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800;
  background: ${({ status }) => statusMap[status as keyof typeof statusMap].bg};
  color: ${({ status }) => statusMap[status as keyof typeof statusMap].color};
`;

export const ActionButton = styled.button`
  background: none; border: none; color: #cbd5e1; cursor: pointer; font-size: 1.2rem;
  padding: 5px; transition: 0.2s;
  &:hover { color: #1e293b; }
`;

export const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(6px);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;

export const ModalContent = styled.div`
  background: white; padding: 2.5rem; border-radius: 20px; width: 100%; max-width: 550px;
  header { 
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;
    h3 { font-size: 1.3rem; color: #1e293b; }
    button { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; } 
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.4rem;
  label { font-size: 0.85rem; font-weight: 700; color: #475569; }
  input, select { 
    padding: 0.8rem; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8fafc;
    &:focus { border-color: ${colors.primary}; background: white; outline: none; } 
  }
`;

export const TextArea = styled.textarea`
  width: 100%; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem;
  background: #f8fafc; outline: none; font-family: inherit; font-size: 0.95rem;
  &:focus { border-color: ${colors.primary}; background: white; }
`;

export const StatusActions = styled.div`
  display: flex; flex-direction: column; gap: 0.8rem;
  button { 
    padding: 1rem; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s;
    &.confirm { background: #ecfdf5; color: #10b981; &:hover { background: #d1fae5; } }
    &.pend { background: #fffbeb; color: #f59e0b; &:hover { background: #fef3c7; } }
    &.cancel { background: #fef2f2; color: #ef4444; &:hover { background: #fee2e2; } } 
  }
`;

export const EmptyState = styled.div`
  text-align: center; padding: 5rem; background: #f8fafc; border-radius: 20px; border: 2px dashed #e2e8f0;
  i { font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem; display: block; }
  p { color: #1e293b; font-weight: 700; font-size: 1.1rem; }
  span { color: #94a3b8; font-size: 0.9rem; }
`;