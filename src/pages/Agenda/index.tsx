import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import * as S from './styles';

interface Sessao {
  id: number;
  paciente: number;
  paciente_nome: string;
  data: string;
  hora: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
  evolucao: string;
}

const Agenda: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [pacientes, setPacientes] = useState<{id: number, nome: string}[]>([]);
  
  const [showEvoModal, setShowEvoModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedSessao, setSelectedSessao] = useState<Sessao | null>(null);
  const [loading, setLoading] = useState(false);

  const [evolucaoText, setEvolucaoText] = useState('');
  const [newAgendamento, setNewAgendamento] = useState({ paciente: '', data: currentDate, hora: '' });

  const carregarDados = async () => {
    try {
      const [resSessoes, resPacientes] = await Promise.all([
        api.get(`/sessoes/?data=${currentDate}`),
        api.get('/pacientes/')
      ]);
      setSessoes(resSessoes.data);
      setPacientes(resPacientes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  useEffect(() => { carregarDados(); }, [currentDate]);

  const handleUpdateStatus = async (novoStatus: 'confirmado' | 'pendente' | 'cancelado') => {
    if (!selectedSessao) return;
    try {
      await api.patch(`/sessoes/${selectedSessao.id}/`, { status: novoStatus });
      setShowActionModal(false);
      carregarDados();
    } catch (error) { alert("Erro ao atualizar status"); }
  };

  const handleSaveEvolucao = async () => {
    if (!selectedSessao) return;
    setLoading(true);
    try {
      await api.patch(`/sessoes/${selectedSessao.id}/`, { evolucao: evolucaoText, status: 'confirmado' });
      setShowEvoModal(false);
      carregarDados();
    } catch (error) { alert("Erro ao salvar evolução"); } finally { setLoading(false); }
  };

  const handleCreateAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/sessoes/', { ...newAgendamento, status: 'pendente' });
      setShowAddModal(false);
      carregarDados();
    } catch (error) { alert("Erro ao agendar"); } finally { setLoading(false); }
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Sua Agenda</h2>
          <p>Organize seus horários e atendimentos do dia.</p>
        </div>
        <S.AddButton onClick={() => setShowAddModal(true)}>
          <i className="ri-calendar-check-line"></i> Novo Agendamento
        </S.AddButton>
      </S.Header>

      <S.Toolbar>
        <div className="filter-group">
          <label>Data selecionada</label>
          <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
        </div>
      </S.Toolbar>

      <S.ScheduleSection>
        {sessoes.length > 0 ? (
          <S.Timeline>
            {sessoes.map((item) => (
              <S.AppointmentCard key={item.id} status={item.status}>
                <div className="time"><span>{item.hora.slice(0, 5)}</span></div>
                <div className="info">
                  <strong>{item.paciente_nome}</strong>
                  <span>Sessão de Fisioterapia</span>
                </div>
                
                <S.EvolutionButton 
                  hasEvo={!!item.evolucao} 
                  onClick={() => { setSelectedSessao(item); setEvolucaoText(item.evolucao || ''); setShowEvoModal(true); }}
                >
                  <i className={item.evolucao ? "ri-checkbox-circle-fill" : "ri-edit-2-line"}></i>
                </S.EvolutionButton>

                <S.Badge status={item.status}>{item.status.toUpperCase()}</S.Badge>

                <S.Actions>
                  <button onClick={() => { setSelectedSessao(item); setShowActionModal(true); }}>
                    <i className="ri-more-2-fill"></i>
                  </button>
                </S.Actions>
              </S.AppointmentCard>
            ))}
          </S.Timeline>
        ) : (
          <S.EmptyState>
            <i className="ri-calendar-event-line"></i>
            <p>Nenhum compromisso para este dia.</p>
          </S.EmptyState>
        )}
      </S.ScheduleSection>

      {/* MODAL DE AÇÕES */}
      {showActionModal && selectedSessao && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Detalhes da Sessão</h3>
              <button onClick={() => setShowActionModal(false)}>&times;</button>
            </header>
            <S.DetailInfo>
              <p><strong>Paciente:</strong> {selectedSessao.paciente_nome}</p>
              <p><strong>Horário:</strong> {selectedSessao.hora.slice(0, 5)}</p>
            </S.DetailInfo>
            <hr style={{ margin: '1.5rem 0', opacity: 0.1 }} />
            <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#64748b' }}>ALTERAR STATUS</h4>
            <S.StatusActions>
              <button className="confirm" onClick={() => handleUpdateStatus('confirmado')}>Confirmado</button>
              <button className="pend" onClick={() => handleUpdateStatus('pendente')}>Pendente</button>
              <button className="cancel" onClick={() => handleUpdateStatus('cancelado')}>Cancelar Sessão</button>
            </S.StatusActions>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* MODAL EVOLUÇÃO */}
      {showEvoModal && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Evolução: {selectedSessao?.paciente_nome}</h3>
              <button onClick={() => setShowEvoModal(false)}>&times;</button>
            </header>
            <textarea rows={8} value={evolucaoText} onChange={(e) => setEvolucaoText(e.target.value)} placeholder="Relato clínico..." />
            <S.AddButton onClick={handleSaveEvolucao} disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
              {loading ? 'Salvando...' : 'Salvar no Prontuário'}
            </S.AddButton>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      {/* MODAL NOVO AGENDAMENTO */}
      {showAddModal && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Novo Agendamento</h3>
              <button onClick={() => setShowAddModal(false)}>&times;</button>
            </header>
            <form onSubmit={handleCreateAgendamento}>
              <S.InputGroup>
                <label>Paciente</label>
                <select required value={newAgendamento.paciente} onChange={e => setNewAgendamento({...newAgendamento, paciente: e.target.value})}>
                  <option value="">Selecione...</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              </S.InputGroup>
              <S.InputGroup><label>Data</label><input type="date" required value={newAgendamento.data} onChange={e => setNewAgendamento({...newAgendamento, data: e.target.value})} /></S.InputGroup>
              <S.InputGroup><label>Hora</label><input type="time" required value={newAgendamento.hora} onChange={e => setNewAgendamento({...newAgendamento, hora: e.target.value})} /></S.InputGroup>
              <S.AddButton type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                {loading ? 'Agendando...' : 'Confirmar Agendamento'}
              </S.AddButton>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Agenda;