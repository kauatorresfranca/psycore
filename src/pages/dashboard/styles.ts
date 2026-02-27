import styled from 'styled-components';

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