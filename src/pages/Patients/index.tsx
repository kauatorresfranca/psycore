import React, { useEffect, useState } from 'react';
import * as S from './styles';
import api from '../../services/api';

interface Paciente {
  id: number;
  nome: string;
  email: string;
  numero_telefone: string;
  status: 'ativo' | 'inativo' | 'alta';
  data_nascimento: string;
  data_cadastro: string;
}

const Patients: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busca, setBusca] = useState('');

  // Estados do Formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [status, setStatus] = useState<'ativo' | 'inativo' | 'alta'>('ativo');

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/pacientes/');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const novoPaciente = { nome, email, numero_telefone: telefone, data_nascimento: nascimento, status };

    try {
      await api.post('/pacientes/', novoPaciente);
      setIsModalOpen(false);
      resetForm();
      fetchPacientes();
      alert('Paciente cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar. Verifique os dados.');
    }
  };

  const resetForm = () => {
    setNome(''); setEmail(''); setTelefone(''); setNascimento(''); setStatus('ativo');
  };

  useEffect(() => { fetchPacientes(); }, []);

  const pacientesFiltrados = pacientes.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase()) || 
    p.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Pacientes</h2>
          <p>Gerencie o cadastro e histórico de seus pacientes.</p>
        </div>
        <S.AddButton onClick={() => setIsModalOpen(true)}>
          <i className="ri-user-add-line"></i> Novo Paciente
        </S.AddButton>
      </S.Header>

      <S.Toolbar>
        <div className="search-group">
          <i className="ri-search-line"></i>
          <input 
            type="text" 
            placeholder="Buscar por nome ou e-mail..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </S.Toolbar>

      <S.TableContainer>
        {loading ? (
          <S.EmptyState><p>Carregando prontuários...</p></S.EmptyState>
        ) : pacientesFiltrados.length > 0 ? (
          <S.Table>
            <thead>
              <tr>
                <th>Nome do Paciente</th>
                <th>Contato</th>
                <th>Status</th>
                <th>Cadastro</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.map((paciente) => (
                <tr key={paciente.id}>
                  <td>
                    <div className="patient-cell">
                      <div className="avatar">{paciente.nome.substring(0, 2).toUpperCase()}</div>
                      <div>
                        <strong>{paciente.nome}</strong>
                        <span>{paciente.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{paciente.numero_telefone}</td>
                  <td>
                    <S.StatusBadge status={paciente.status}>
                      {paciente.status.toUpperCase()}
                    </S.StatusBadge>
                  </td>
                  <td>{new Date(paciente.data_cadastro).toLocaleDateString('pt-BR')}</td>
                  <td style={{ textAlign: 'right' }}>
                    <S.ActionButton><i className="ri-external-link-line"></i></S.ActionButton>
                    <S.ActionButton><i className="ri-edit-line"></i></S.ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        ) : (
          <S.EmptyState>
            <i className="ri-user-search-line"></i>
            <p>Nenhum paciente encontrado.</p>
            <span>Tente ajustar sua busca ou cadastre um novo paciente.</span>
          </S.EmptyState>
        )}
      </S.TableContainer>

      {isModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Cadastrar Novo Paciente</h3>
              <button onClick={() => setIsModalOpen(false)}>&times;</button>
            </header>
            <form onSubmit={handleSubmit}>
              <S.InputGroup>
                <label>Nome Completo</label>
                <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: João Silva" />
              </S.InputGroup>
              <S.InputGroup>
                <label>E-mail</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="joao@email.com" />
              </S.InputGroup>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <S.InputGroup>
                  <label>Telefone</label>
                  <input type="text" required value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(82) 99999-9999" />
                </S.InputGroup>
                <S.InputGroup>
                  <label>Nascimento</label>
                  <input type="date" required value={nascimento} onChange={e => setNascimento(e.target.value)} />
                </S.InputGroup>
              </div>
              <S.InputGroup>
                <label>Status Inicial</label>
                <select value={status} onChange={e => setStatus(e.target.value as any)}>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="alta">Alta</option>
                </select>
              </S.InputGroup>
              <S.AddButton type="submit" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                Finalizar Cadastro
              </S.AddButton>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Patients;