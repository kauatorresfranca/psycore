import styled from 'styled-components';
import { colors } from '../../../styles';

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
  box-shadow: 2px 4px 4px rgba(0,0,0,0.05);

  h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  i {
    font-size: 1.2rem;
    font-weight: 400;
    background-color: ${colors.primary_transparent};
    color: ${colors.primary};
    border-radius: 50%;
    padding: 12px;
  }
    
  p {
    font-size: 2rem;
    font-weight: bold;
    color: ${colors.primary};
  }

  span { 
    color: ${colors.text};
  }
`;