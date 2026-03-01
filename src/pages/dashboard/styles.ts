import styled from 'styled-components';
import { colors } from '../../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  h2 { font-size: 1.8rem; color: #1e293b; }
  p { color: #64748b; margin-top: 0.5rem; }
`;

export const FilterContainer = styled.div`
  display: flex;
  background: white;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  gap: 1.5rem;
  align-items: center;

  .input-group {
    display: flex;
    flex-direction: column;
    label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
    input { border: none; color: #475569; font-weight: 600; outline: none; }
  }

  button {
    background: ${colors.primary_transparent};
    color: ${colors.primary};
    border: none; padding: 8px; border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
    &:hover { filter: brightness(0.9); }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;

  h4 {
    display: flex; align-items: center; justify-content: space-between;
    color: #64748b; font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;
    i { color: ${colors.primary}; background: ${colors.primary_transparent}; 
        padding: 8px; border-radius: 10px; font-size: 1.1rem; }
  }

  p { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem; }

  span { font-size: 0.8rem; color: #10b981; font-weight: 600;
    &.warning { color: #f59e0b; }
  }
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

export const ChartSection = styled.section`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  h3 { margin-bottom: 2rem; color: #1e293b; }
`;

export const RecentPatients = styled.section`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  h3 { margin-bottom: 1.5rem; color: #1e293b; }

  ul {
    list-style: none;
    flex: 1;
    li {
      display: flex; align-items: center; gap: 1rem; padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
      
      .patient-avatar { width: 40px; height: 40px; border-radius: 10px; 
        background: #eef2ff; color: #4f46e5; display: flex; align-items: center; 
        justify-content: center; font-weight: bold; font-size: 0.8rem; }

      .patient-info { flex: 1; display: flex; flex-direction: column;
        strong { font-size: 0.9rem; color: #1e293b; }
        span { font-size: 0.8rem; color: #64748b; }
      }
      i { color: #cbd5e1; }
    }
  }

  .view-all {
    margin-top: 1rem; width: 100%; padding: 10px; border: 1px solid #e2e8f0;
    border-radius: 8px; background: none; color: #64748b; font-weight: 600;
    cursor: pointer; transition: 0.2s;
    &:hover { background: #f8fafc; color: ${colors.primary}; }
  }
`;