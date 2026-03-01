import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import * as S from './styles';

interface Sessao {
  id: number;
  paciente: number;
  paciente_nome: string;
  data: string;
  hora: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
  evolucao: string;
}

interface Paciente {
  id: number;
  nome: string;
}

const Evolucoes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState('');

  // Estados para o formulário no Modal
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const [selectedSessaoId, setSelectedSessaoId] = useState('');
  const [textoEvolucao, setTextoEvolucao] = useState('');
  const [loading, setLoading] = useState(false);

  const carregarDados = async () => {
    try {
      const [resSessoes, resPacientes] = await Promise.all([
        api.get('/sessoes/'),
        api.get('/pacientes/')
      ]);
      setSessoes(resSessoes.data);
      setPacientes(resPacientes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Filtra as sessões para o Modal de acordo com o paciente escolhido
  const sessoesDoPaciente = sessoes.filter(s => s.paciente.toString() === selectedPaciente);

  // Lógica de busca na lista principal
  const sessoesFiltradas = sessoes.filter(s => 
    s.paciente_nome.toLowerCase().includes(busca.toLowerCase()) ||
    (s.evolucao && s.evolucao.toLowerCase().includes(busca.toLowerCase()))
  );

  const handleSalvarEvolucao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSessaoId || !textoEvolucao) return alert("Selecione a sessão e escreva a evolução");

    setLoading(true);
    try {
      // Usamos PATCH para atualizar a sessão que já existe, adicionando o texto
      await api.patch(`/sessoes/${selectedSessaoId}/`, {
        evolucao: textoEvolucao,
        status: 'confirmado'
      });
      
      setIsModalOpen(false);
      resetForm();
      carregarDados();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao atualizar evolução.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedPaciente('');
    setSelectedSessaoId('');
    setTextoEvolucao('');
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Evoluções Clínicas</h2>
          <p>Acompanhe e registre o progresso dos seus pacientes.</p>
        </div>
        <S.AddButton onClick={() => setIsModalOpen(true)}>
          <i className="ri-add-box-line"></i> Nova Evolução
        </S.AddButton>
      </S.Header>

      <S.SearchWrapper>
        <i className="ri-search-line"></i>
        <input 
          type="text" 
          placeholder="Buscar por nome do paciente ou conteúdo..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </S.SearchWrapper>

      <S.EvolutionList>
        {sessoesFiltradas.length > 0 ? (
          sessoesFiltradas.map((item) => (
            <S.EvolutionCard key={item.id}>
              <div className="card-header">
                <div className="patient-info">
                  <i className="ri-user-heart-line"></i>
                  <strong>{item.paciente_nome}</strong>
                </div>
                <S.Badge color={item.status === 'confirmado' ? '#4caf50' : '#ff9800'}>
                  {item.status.toUpperCase()}
                </S.Badge>
              </div>
              
              <S.EvolutionText>
                {item.evolucao || <span style={{color: '#999', fontStyle: 'italic'}}>Aguardando registro de evolução...</span>}
              </S.EvolutionText>

              <div className="card-footer">
                <span><i className="ri-calendar-line"></i> {new Date(item.data).toLocaleDateString('pt-BR')}</span>
                <span><i className="ri-time-line"></i> {item.hora.slice(0, 5)}</span>
                <button className="edit-btn" onClick={() => {
                   setSelectedPaciente(item.paciente.toString());
                   setSelectedSessaoId(item.id.toString());
                   setTextoEvolucao(item.evolucao);
                   setIsModalOpen(true);
                }}>Editar Registro</button>
              </div>
            </S.EvolutionCard>
          ))
        ) : (
          <S.EmptyState>
            <i className="ri-file-history-line"></i>
            <p>Nenhum registro encontrado.</p>
          </S.EmptyState>
        )}
      </S.EvolutionList>

      {isModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Registrar Evolução</h3>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }}>&times;</button>
            </header>
            <form onSubmit={handleSalvarEvolucao}>
               <S.InputGroup>
                <label>1. Selecione o Paciente</label>
                <select 
                  value={selectedPaciente} 
                  onChange={(e) => { setSelectedPaciente(e.target.value); setSelectedSessaoId(''); }}
                  required
                >
                  <option value="">Selecione...</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
               </S.InputGroup>

               <S.InputGroup>
                <label>2. Selecione a Sessão Correspondente</label>
                <select 
                  value={selectedSessaoId} 
                  onChange={(e) => setSelectedSessaoId(e.target.value)}
                  disabled={!selectedPaciente}
                  required
                >
                  <option value="">Selecione a data...</option>
                  {sessoesDoPaciente.map(s => (
                    <option key={s.id} value={s.id}>
                      {new Date(s.data).toLocaleDateString('pt-BR')} às {s.hora.slice(0, 5)} {s.evolucao ? '(Já possui relato)' : '(Em aberto)'}
                    </option>
                  ))}
                </select>
               </S.InputGroup>

               <S.InputGroup>
                <label>3. Relato da Evolução</label>
                <textarea 
                  rows={6} 
                  placeholder="O que foi trabalhado hoje?" 
                  value={textoEvolucao}
                  onChange={(e) => setTextoEvolucao(e.target.value)}
                  required
                />
               </S.InputGroup>

               <S.AddButton 
                 type="submit" 
                 disabled={loading || !selectedSessaoId}
                 style={{width: '100%', justifyContent: 'center'}}
               >
                 {loading ? 'Salvando...' : 'Salvar no Prontuário'}
               </S.AddButton>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Evolucoes;