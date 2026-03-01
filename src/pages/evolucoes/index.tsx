import React, { useState } from 'react';
import * as S from './styles';

interface Evolucao {
  id: number;
  paciente: string;
  data: string;
  profissional: string;
  texto: string;
  categoria: 'Sessão Comum' | 'Avaliação' | 'Alta';
}

const Evolucoes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock de dados
  const evolucoes: Evolucao[] = [
    {
      id: 1,
      paciente: 'Ana Souza',
      data: '28/02/2026',
      profissional: 'Dra. Ticiana',
      categoria: 'Sessão Comum',
      texto: 'Paciente apresentou melhora significativa na mobilidade articular. Relatou diminuição da dor na escala analógica de 8 para 4.'
    },
    {
      id: 2,
      paciente: 'Carlos Melo',
      data: '27/02/2026',
      profissional: 'Dra. Ticiana',
      categoria: 'Avaliação',
      texto: 'Primeira consulta realizada. Realizado testes de força e flexibilidade. Plano de tratamento focado em reabilitação lombar.'
    }
  ];

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
        <input type="text" placeholder="Buscar evolução por nome do paciente..." />
      </S.SearchWrapper>

      <S.EvolutionList>
        {evolucoes.length > 0 ? (
          evolucoes.map((item) => (
            <S.EvolutionCard key={item.id}>
              <div className="card-header">
                <div className="patient-info">
                  <i className="ri-user-heart-line"></i>
                  <strong>{item.paciente}</strong>
                </div>
                <S.Badge>{item.categoria}</S.Badge>
              </div>
              
              <S.EvolutionText>
                {item.texto}
              </S.EvolutionText>

              <div className="card-footer">
                <span><i className="ri-calendar-line"></i> {item.data}</span>
                <span><i className="ri-user-settings-line"></i> {item.profissional}</span>
                <button className="edit-btn">Editar Registro</button>
              </div>
            </S.EvolutionCard>
          ))
        ) : (
          <S.EmptyState>
            <i className="ri-file-history-line"></i>
            <p>Nenhuma evolução registrada.</p>
            <span>As evoluções aparecerão aqui após serem salvas no prontuário.</span>
          </S.EmptyState>
        )}
      </S.EvolutionList>

      {isModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <h3>Nova Evolução Clínica</h3>
              <button onClick={() => setIsModalOpen(false)}>&times;</button>
            </header>
            <form onSubmit={(e) => e.preventDefault()}>
               <S.InputGroup>
                <label>Paciente</label>
                <select>
                  <option>Selecione um paciente...</option>
                  <option>Ana Souza</option>
                  <option>Carlos Melo</option>
                </select>
               </S.InputGroup>

               <S.InputGroup>
                <label>Descrição da Evolução</label>
                <textarea rows={6} placeholder="Descreva os avanços, observações e condutas da sessão..." />
               </S.InputGroup>

               <S.AddButton style={{width: '100%', justifyContent: 'center'}}>
                 Salvar no Prontuário
               </S.AddButton>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Evolucoes;