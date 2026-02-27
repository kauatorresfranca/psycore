import React from 'react';
import * as S from './styles'

const Dashboard: React.FC = () => {
  return (
    <>
      <S.Header>
        <h2>Olá, Dra. Ana!</h2>
        <p>Confira como está o dia de hoje na sua clínica.</p>
      </S.Header>

      <S.StatsGrid>
        <S.Card>
          <h4>Pacientes Ativos</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>24</p>
        </S.Card>
        
        <S.Card>
          <h4>Consultas Hoje</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>6</p>
        </S.Card>
        
        <S.Card>
          <h4>Evoluções Pendentes</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>2</p>
        </S.Card>
      </S.StatsGrid>
    </>
  );
};

export default Dashboard;