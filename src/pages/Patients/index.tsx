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
    
    const novoPaciente = {
      nome,
      email,
      numero_telefone: telefone,
      data_nascimento: nascimento,
      status
    };

    try {
      await api.post('/pacientes/', novoPaciente);
      setIsModalOpen(false);
      resetForm();
      fetchPacientes(); // Atualiza a lista automaticamente
      alert('Paciente cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      alert('Erro ao cadastrar. Verifique se o e-mail já existe.');
    }
  };

  const resetForm = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setNascimento('');
    setStatus('ativo');
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
    <>
      <S.Header>
        <div>
          <h2>Gerenciamento de Pacientes</h2>
          <p>Visualize e gerencie todos os pacientes cadastrados na clínica.</p>
        </div>
        <S.AddButton onClick={() => setIsModalOpen(true)}>
          <i className="ri-user-add-line"></i> Novo Paciente
        </S.AddButton>
      </S.Header>

      <S.TableContainer>
        {loading ? (
          <S.EmptyState>Carregando pacientes...</S.EmptyState>
        ) : pacientes.length > 0 ? (
          <S.Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contato</th>
                <th>Status</th>
                <th>Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr id='patient' key={paciente.id}>
                  <td>
                    <strong>{paciente.nome}</strong>
                    <span>{paciente.email}</span>
                  </td>
                  <td>{paciente.numero_telefone}</td>
                  <td>
                    <S.StatusBadge status={paciente.status}>
                      {paciente.status === 'alta' ? 'Alta' : paciente.status}
                    </S.StatusBadge>
                  </td>
                  <td>{new Date(paciente.data_cadastro).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <S.ActionButton><i className="ri-edit-line"></i></S.ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        ) : (
          <S.EmptyState>
            <i className="ri-user-search-line"></i>
            <p>Nenhum paciente cadastrado ainda.</p>
            <span>Seus pacientes aparecerão aqui assim que você realizar o primeiro cadastro.</span>
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
                <input 
                  type="text" 
                  required 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  placeholder="Ex: João Silva"
                />
              </S.InputGroup>

              <S.InputGroup>
                <label>E-mail</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="joao@email.com"
                />
              </S.InputGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <S.InputGroup>
                  <label>Telefone</label>
                  <input 
                    type="text" 
                    required 
                    value={telefone} 
                    onChange={e => setTelefone(e.target.value)} 
                    placeholder="(82) 99999-9999"
                  />
                </S.InputGroup>

                <S.InputGroup>
                  <label>Nascimento</label>
                  <input 
                    type="date" 
                    required 
                    value={nascimento} 
                    onChange={e => setNascimento(e.target.value)} 
                  />
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
                Salvar Paciente
              </S.AddButton>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default Patients;