import React, {useEffect } from 'react';
import * as S from './styles'
import api from '../../services/api';

const Dashboard: React.FC = () => {

  const cardsData = [
    { title: 'Pacientes Totais', value: 24, sub_value: '12 ativos', icon: 'ri-group-line' },
    { title: 'Consultas Hoje', value: 6, sub_value: '3 agendadas', icon: 'ri-calendar-2-line' },
    { title: 'Evoluções Pendentes', value: 2, sub_value: '0 concluídas', icon: 'ri-file-list-line' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/pacientes/');
        console.log('Dados do dashboard:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <S.Header>
        <h2>Olá, Dra. Ticiana!</h2>
        <p>Confira como está o dia de hoje na sua clínica.</p>
      </S.Header>

      <S.StatsGrid>
        {cardsData.map((card, index) => (
          <S.Card key={index}>
            <h4>{card.title} <i className={card.icon}></i></h4>
            <p>{card.value}</p>
            <span>{card.sub_value}</span>
          </S.Card>
        ))}
      </S.StatsGrid>
    </>
  );
};

export default Dashboard;