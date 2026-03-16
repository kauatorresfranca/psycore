import React, { useEffect, useState } from 'react';
import * as S from './styles';
import api from '../../services/api';

interface Sessao {
  id: number;
  paciente: number;
  paciente_nome: string;
  data: string;
  hora: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
  evolucao: string;
  tipo_consulta?: string;
}

const Agenda: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [pacientes, setPacientes] = useState<{ id: number; nome: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Modais
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEvoModalOpen, setIsEvoModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // Seleção e Formulários
  const [selectedSessao, setSelectedSessao] = useState<Sessao | null>(null);
  const [evolucaoText, setEvolucaoText] = useState('');
  const [newAgendamento, setNewAgendamento] = useState({ 
    paciente: '', 
    data: currentDate, 
    hora: '', 
    tipo_consulta: 'Fisioterapia' 
  });

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [resSessoes, resPacientes] = await Promise.all([
        api.get(`/sessoes/?data=${currentDate}`),
        api.get('/pacientes/')
      ]);
      setSessoes(resSessoes.data);
      setPacientes(resPacientes.data);
    } catch (error) {
      console.error("Erro ao carregar dados da agenda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [currentDate]);

  const handleUpdateStatus = async (novoStatus: 'confirmado' | 'pendente' | 'cancelado') => {
    if (!selectedSessao) return;
    try {
      await api.patch(`/sessoes/${selectedSessao.id}/`, { status: novoStatus });
      setIsActionModalOpen(false);
      carregarDados();
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  const handleSaveEvolucao = async () => {
    if (!selectedSessao) return;
    try {
      await api.patch(`/sessoes/${selectedSessao.id}/`, { 
        evolucao: evolucaoText, 
        status: 'confirmado' 
      });
      setIsEvoModalOpen(false);
      carregarDados();
      alert('Evolução salva com sucesso!');
    } catch (error) {
      alert("Erro ao salvar evolução.");
    }
  };

  const handleCreateAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/sessoes/', { ...newAgendamento, status: 'pendente' });
      setIsAddModalOpen(false);
      setNewAgendamento({ ...newAgendamento, paciente: '', hora: '' });
      carregarDados();
    } catch (error) {
      alert("Erro ao realizar agendamento.");
    }
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Agenda</h2>
          <p>Gerencie seus horários e evoluções clínicas.</p>
        </div>
        <S.AddButton onClick={() => setIsAddModalOpen(true)}>
          <i className="ri-calendar-check-line"></i> Novo Agendamento
        </S.AddButton>
      </S.Header>

      <S.Toolbar>
        <div className="filter-group">
          <i className="ri-calendar-line"></i>
          <input 
            type="date" 
            value={currentDate} 
            onChange={(e) => setCurrentDate(e.target.value)} 
          />
        </div>
      </S.Toolbar>

      <S.ScheduleContainer>
        {loading ? (
          <S.EmptyState><p>Carregando agenda...</p></S.EmptyState>
        ) : sessoes.length > 0 ? (
          <S.Timeline>
            {sessoes.map((item) => (
              <S.AppointmentCard key={item.id} status={item.status}>
                <div className="time-info">
                  <strong>{item.hora.slice(0, 5)}</strong>
                </div>

                <div className="patient-info">
                  <div className="avatar">{item.paciente_nome.substring(0, 2).toUpperCase()}</div>
                  <div>
                    <strong>{item.paciente_nome}</strong>
                    <span>{item.tipo_consulta || 'Sessão de Fisioterapia'}</span>
                  </div>
                </div>

                <div className="status-area">
                  <S.StatusBadge status={item.status}>
                    {item.status.toUpperCase()}
                  </S.StatusBadge>
                </div>

                <div className="actions-area">
                  <S.EvolutionButton 
                    hasEvo={!!item.evolucao}
                    onClick={() => {
                      setSelectedSessao(item);
                      setEvolucaoText(item.evolucao || '');
                      setIsEvoModalOpen(true);
                    }}
                  >
                    <i className={item.evolucao ? "ri-file-list-3-fill" : "ri-quill-pen-line"}></i>
                    {item.evolucao ? 'Ver Evolução' : 'Evoluir'}
                  </S.EvolutionButton>

                  <S.ActionButton onClick={() => {
                    setSelectedSessao(item);
                    setIsActionModalOpen(true);
                  }}>
                    <i className="ri-more-2-fill"></i>
                  </S.ActionButton>
                </div>
              </S.AppointmentCard>
            ))}
          </S.Timeline>
        ) : (
          <S.EmptyState>
            <i className="ri-calendar-event-line"></i>
            <p>Nenhum compromisso para este dia.</p>
            <span>Clique em "Novo Agendamento" para começar.</span>
          </S.EmptyState>
        )}
      </S.ScheduleContainer>

      {/* MODAL NOVO AGENDAMENTO */}
      {isAddModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Novo Agendamento</h3>
              <button onClick={() => setIsAddModalOpen(false)}>&times;</button>
            </header>
            <form onSubmit={handleCreateAgendamento}>
              <S.InputGroup>
                <label>Paciente</label>
                <select 
                  required 
                  value={newAgendamento.paciente} 
                  onChange={e => setNewAgendamento({...newAgendamento, paciente: e.target.value})}
                >
                  <option value="">Selecione o paciente...</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              </S.InputGroup>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <S.InputGroup>
                  <label>Data</label>
                  <input type="date" required value={newAgendamento.data} onChange={e => setNewAgendamento({...newAgendamento, data: e.target.value})} />
                </S.InputGroup>
                <S.InputGroup>
                  <label>Hora</label>
                  <input type="time" required value={newAgendamento.hora} onChange={e => setNewAgendamento({...newAgendamento, hora: e.target.value})} />
                </S.InputGroup>
              </div>

              <S.InputGroup>
                <label>Tipo de Atendimento</label>
                <input 
                  type="text" 
                  value={newAgendamento.tipo_consulta} 
                  onChange={e => setNewAgendamento({...newAgendamento, tipo_consulta: e.target.value})}
                  placeholder="Ex: Fisioterapia Postural"
                />
              </S.InputGroup>

              <S.AddButton type="submit" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                Confirmar Agendamento
              </S.AddButton>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* MODAL EVOLUÇÃO */}
      {isEvoModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Evolução: {selectedSessao?.paciente_nome}</h3>
              <button onClick={() => setIsEvoModalOpen(false)}>&times;</button>
            </header>
            <S.TextArea 
              rows={10} 
              value={evolucaoText} 
              onChange={(e) => setEvolucaoText(e.target.value)} 
              placeholder="Relato clínico da sessão..." 
            />
            <S.AddButton onClick={handleSaveEvolucao} style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
              Salvar no Prontuário
            </S.AddButton>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* MODAL DE AÇÕES (STATUS) */}
      {isActionModalOpen && selectedSessao && (
        <S.ModalOverlay>
          <S.ModalContent style={{ maxWidth: '400px' }}>
            <header>
              <h3>Alterar Status</h3>
              <button onClick={() => setIsActionModalOpen(false)}>&times;</button>
            </header>
            <S.StatusActions>
              <button className="confirm" onClick={() => handleUpdateStatus('confirmado')}>Confirmar Presença</button>
              <button className="pend" onClick={() => handleUpdateStatus('pendente')}>Marcar como Pendente</button>
              <button className="cancel" onClick={() => handleUpdateStatus('cancelado')}>Cancelar Sessão</button>
            </S.StatusActions>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Agenda;