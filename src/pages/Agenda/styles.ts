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
  padding: 1.2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
    input { border: none; font-weight: 600; color: #1e293b; outline: none; font-size: 1rem; }
  }
`;

export const AddButton = styled.button`
  background-color: ${colors.primary};
  color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px;
  font-weight: 600; display: flex; align-items: center; gap: 0.6rem; cursor: pointer;
  transition: all 0.2s; &:hover { filter: brightness(0.9); transform: translateY(-1px); }
`;

export const ScheduleSection = styled.section` flex: 1; `;
export const Timeline = styled.div` display: flex; flex-direction: column; gap: 1rem; `;

const statusMap = {
  confirmado: { color: '#10b981', bg: '#ecfdf5' },
  pendente: { color: '#f59e0b', bg: '#fffbeb' },
  cancelado: { color: '#ef4444', bg: '#fef2f2' },
};

export const AppointmentCard = styled.div<{ status: 'confirmado' | 'pendente' | 'cancelado' }>`
  background: white; padding: 1.2rem 1.5rem; border-radius: 16px;
  display: flex; align-items: center; border: 1px solid #f1f5f9;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  border-left: 6px solid ${({ status }) => statusMap[status].color};
  transition: transform 0.2s; &:hover { transform: scale(1.01); }

  .time { min-width: 90px; font-weight: 800; color: #1e293b; font-size: 1.1rem; }
  .info { flex: 1; strong { font-size: 1.05rem; color: #1e293b; display: block; }
    span { color: #94a3b8; font-size: 0.85rem; } }
`;

export const EvolutionButton = styled.button<{ hasEvo: boolean }>`
  background-color: ${({ hasEvo }) => hasEvo ? '#f1f5f9' : colors.primary_transparent};
  color: ${({ hasEvo }) => hasEvo ? '#94a3b8' : colors.primary};
  border: none; width: 42px; height: 42px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; margin-right: 1.5rem;
  font-size: 1.2rem;
`;

export const Badge = styled.span<{ status: 'confirmado' | 'pendente' | 'cancelado' }>`
  padding: 6px 14px; border-radius: 10px; font-size: 0.7rem; font-weight: 800;
  background: ${({ status }) => statusMap[status].bg};
  color: ${({ status }) => statusMap[status].color};
  letter-spacing: 0.5px;
`;

export const Actions = styled.div`
  button { background: none; border: none; color: #cbd5e1; cursor: pointer; font-size: 1.4rem; padding-left: 1rem;
    &:hover { color: #64748b; } }
`;

export const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(6px);
  display: flex; justify-content: center; align-items: center; z-index: 9999;
`;

export const ModalContent = styled.div`
  background: white; padding: 2.5rem; border-radius: 20px; width: 100%; max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;
    h3 { font-size: 1.3rem; color: #1e293b; }
    button { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; } }
  textarea { width: 100%; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; outline: none; resize: none;
    &:focus { border-color: ${colors.primary}; } }
`;

export const StatusActions = styled.div`
  display: flex; flex-direction: column; gap: 0.8rem;
  button { padding: 1rem; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s;
    &.confirm { background: #ecfdf5; color: #10b981; &:hover { background: #d1fae5; } }
    &.pend { background: #fffbeb; color: #f59e0b; &:hover { background: #fef3c7; } }
    &.cancel { background: #fef2f2; color: #ef4444; &:hover { background: #fee2e2; } } }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.5rem;
  label { font-size: 0.85rem; font-weight: 700; color: #475569; }
  input, select { padding: 0.8rem; border-radius: 10px; border: 1px solid #e2e8f0; background: #f8fafc; outline: none;
    &:focus { border-color: ${colors.primary}; background: white; } }
`;

export const EmptyState = styled.div`
  text-align: center; padding: 5rem 2rem; background: #f8fafc; border-radius: 20px; border: 2px dashed #e2e8f0;
  i { font-size: 3.5rem; color: #cbd5e1; margin-bottom: 1rem; display: block; }
  p { color: #64748b; font-weight: 600; }
`;

export const DetailInfo = styled.div`
  p { margin-bottom: 0.6rem; color: #475569; strong { color: #1e293b; } }
`;