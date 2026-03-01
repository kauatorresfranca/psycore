import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import api from '../../services/api';
import * as S from './styles';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);

  // Estados para dados reais da API
  const [stats, setStats] = useState({
    pacientesTotais: 0,
    consultasHoje: 0,
    evolucoesPendentes: 0,
    faturamento: 0
  });

  // Dados mockados para o gráfico (substituir por retorno da sua API)
  const chartData = [
    { name: 'Seg', atendimentos: 4 },
    { name: 'Ter', atendimentos: 7 },
    { name: 'Qua', atendimentos: 5 },
    { name: 'Qui', atendimentos: 8 },
    { name: 'Sex', atendimentos: 6 },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Exemplo de chamada enviando o range de datas
      const response = await api.get(`/dashboard/stats/?inicio=${dataInicio}&fim=${dataFim}`);
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [dataInicio, dataFim]);

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Olá, Dra. Ticiana!</h2>
          <p>Confira o desempenho da sua clínica no período selecionado.</p>
        </div>

        <S.FilterContainer>
          <div className="input-group">
            <label>De:</label>
            <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Até:</label>
            <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
          </div>
          <button onClick={fetchDashboardData}><i className="ri-refresh-line"></i></button>
        </S.FilterContainer>
      </S.Header>

      <S.StatsGrid>
        <S.Card>
          <h4>Pacientes Totais <i className="ri-group-line"></i></h4>
          <p>{loading ? '...' : stats.pacientesTotais}</p>
          <span><i className="ri-arrow-up-line"></i> 12% este mês</span>
        </S.Card>

        <S.Card>
          <h4>Consultas Hoje <i className="ri-calendar-check-line"></i></h4>
          <p>{loading ? '...' : stats.consultasHoje}</p>
          <span>Próximo às 14:00</span>
        </S.Card>

        <S.Card>
          <h4>Evoluções Pendentes <i className="ri-error-warning-line"></i></h4>
          <p>{loading ? '...' : stats.evolucoesPendentes}</p>
          <span className="warning">Ações necessárias</span>
        </S.Card>

        <S.Card>
          <h4>Faturamento <i className="ri-money-dollar-circle-line"></i></h4>
          <p>{loading ? '...' : `R$ ${stats.faturamento}`}</p>
          <span>Previsão de recebimento</span>
        </S.Card>
      </S.StatsGrid>

      <S.MainContent>
        <S.ChartSection>
          <h3>Volume de Atendimentos</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="atendimentos" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </S.ChartSection>

        <S.RecentPatients>
          <h3>Próximos da Agenda</h3>
          <ul>
            <li>
              <div className="patient-avatar">JP</div>
              <div className="patient-info">
                <strong>João Paulo Silva</strong>
                <span>14:30 - Fisioterapia Postural</span>
              </div>
              <i className="ri-arrow-right-s-line"></i>
            </li>
            <li>
              <div className="patient-avatar">MA</div>
              <div className="patient-info">
                <strong>Maria Alice Costa</strong>
                <span>15:45 - Reabilitação</span>
              </div>
              <i className="ri-arrow-right-s-line"></i>
            </li>
          </ul>
          <button className="view-all">Ver agenda completa</button>
        </S.RecentPatients>
      </S.MainContent>
    </S.Container>
  );
};

export default Dashboard;