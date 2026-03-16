import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import api from '../../services/api';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';

interface AgendaItem {
  id: number;
  paciente: string;
  horario: string;
  tipoConsulta: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [dataInicio, setDataInicio] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]
  );
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);

  const [stats, setStats] = useState({
    pacientesTotais: 0,
    consultasHoje: 0,
    evolucoesPendentes: 0,
    faturamento: 0
  });

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
      const response = await api.get(`/dashboard/stats/?inicio=${dataInicio}&fim=${dataFim}`);
      setStats({
        pacientesTotais: response.data.pacientes,
        consultasHoje: response.data.consultasHoje,
        evolucoesPendentes: response.data.evolucoesPendentes,
        faturamento: response.data.faturamento
      });
      setAgenda(response.data.agenda || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Busca o nome salvo no momento do login
    const savedUser = localStorage.getItem('@Clinica:user');
    if (savedUser) setUserName(savedUser);
    
    fetchDashboardData();
  }, [dataInicio, dataFim]);

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0]?.toUpperCase() || '?';
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Olá, Dra. {userName}!</h2>
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
          <button onClick={fetchDashboardData}>
            <i className="ri-refresh-line"></i>
          </button>
        </S.FilterContainer>
      </S.Header>

      <S.StatsGrid>
        <S.Card>
          <h4>Pacientes Totais <i className="ri-group-line"></i></h4>
          <p>{loading ? '...' : stats.pacientesTotais}</p>
          <span><i className="ri-arrow-up-line"></i> Geral no sistema</span>
        </S.Card>

        <S.Card>
          <h4>Consultas Hoje <i className="ri-calendar-check-line"></i></h4>
          <p>{loading ? '...' : stats.consultasHoje}</p>
          <span>Agenda do dia</span>
        </S.Card>

        <S.Card>
          <h4>Evoluções Pendentes <i className="ri-error-warning-line"></i></h4>
          <p>{loading ? '...' : stats.evolucoesPendentes}</p>
          <span className={stats.evolucoesPendentes > 0 ? 'warning' : ''}>Ações necessárias</span>
        </S.Card>

        <S.Card>
          <h4>Faturamento <i className="ri-money-dollar-circle-line"></i></h4>
          <p>{loading ? '...' : `R$ ${Number(stats.faturamento).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</p>
          <span>No período selecionado</span>
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
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}} 
                />
                <Bar dataKey="atendimentos" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </S.ChartSection>

        <S.RecentPatients>
          <h3>Próximos da Agenda</h3>
          <ul>
            {agenda.length === 0 && !loading ? (
              <p style={{ padding: '20px', color: '#64748b' }}>Nenhum paciente agendado.</p>
            ) : (
              agenda.map((sessao) => (
                <li key={sessao.id}>
                  <div className="patient-avatar">{getInitials(sessao.paciente)}</div>
                  <div className="patient-info">
                    <strong>{sessao.paciente}</strong>
                    <span>{sessao.horario} - {sessao.tipoConsulta}</span>
                  </div>
                  <i className="ri-arrow-right-s-line"></i>
                </li>
              ))
            )}
          </ul>
          <button className="view-all" onClick={() => navigate('/agenda')}>
            Ver agenda completa
          </button>
        </S.RecentPatients>
      </S.MainContent>
    </S.Container>
  );
};

export default Dashboard;