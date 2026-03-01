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
  i { font-size: 1.2rem; }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// --- Seção de Horários ---
export const ScheduleSection = styled.section`
  h3 { margin-bottom: 1.5rem; color: #334155; }
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface StatusProps {
  status: 'confirmado' | 'pendente' | 'cancelado';
}

const statusMap = {
  confirmado: { color: '#10b981', bg: '#ecfdf5' },
  pendente: { color: '#f59e0b', bg: '#fffbeb' },
  cancelado: { color: '#ef4444', bg: '#fef2f2' },
};

export const AppointmentCard = styled.div<StatusProps>`
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  border-left: 5px solid ${({ status }) => statusMap[status].color};
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
  }

  .time {
    min-width: 80px;
    font-weight: 700;
    color: #1e293b;
    font-size: 1.1rem;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    strong { color: #1e293b; }
    span { color: #94a3b8; font-size: 0.85rem; }
  }
`;

export const StatusIndicator = styled.span<StatusProps>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ status }) => statusMap[status].bg};
  color: ${({ status }) => statusMap[status].color};
  margin: 0 1rem;
`;

export const Actions = styled.div`
  button {
    background: none; border: none; color: #cbd5e1; cursor: pointer; font-size: 1.2rem;
    &:hover { color: #64748b; }
  }
`;

// --- Sidebar ---
export const SidebarSection = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const MiniCalendar = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);

  h4 { margin-bottom: 1rem; color: #1e293b; }
  .calendar-placeholder { text-align: center; color: #64748b; }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 1rem;

  div {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover { background: #f1f5f9; }
    &.active { background: ${colors.primary}; color: white; }
  }
`;

export const FiltersCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  
  h4 { margin-bottom: 1rem; }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 0.5rem;

    .dot {
      width: 10px; height: 10px; border-radius: 50%;
      &.confirmado { background: #10b981; }
      &.pendente { background: #f59e0b; }
      &.cancelado { background: #ef4444; }
    }
  }
`;

export const EmptyAgenda = styled.div`
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
  i { font-size: 2.5rem; }
`;