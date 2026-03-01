import React, { useState } from 'react';
import * as S from './styles';

interface Compromisso {
  id: number;
  paciente: string;
  horario: string;
  tipo: 'Avaliação' | 'Sessão' | 'Retorno';
  status: 'confirmado' | 'pendente' | 'cancelado';
}

const Agenda: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-BR'));
  
  // Mock de dados para visualização
  const compromissos: Compromisso[] = [
    { id: 1, paciente: 'Ana Souza', horario: '08:00', tipo: 'Sessão', status: 'confirmado' },
    { id: 2, paciente: 'Carlos Melo', horario: '09:30', tipo: 'Avaliação', status: 'pendente' },
    { id: 3, paciente: 'Beatriz Silva', horario: '11:00', tipo: 'Sessão', status: 'confirmado' },
    { id: 4, paciente: 'Marcos Oliveira', horario: '14:00', tipo: 'Retorno', status: 'cancelado' },
  ];

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Sua Agenda</h2>
          <p>Gerencie seus horários e atendimentos para <strong>{selectedDate}</strong>.</p>
        </div>
        <S.AddButton>
          <i className="ri-calendar-check-line"></i> Novo Agendamento
        </S.AddButton>
      </S.Header>

      <S.ContentWrapper>
        {/* Lado Esquerdo: Lista de Horários */}
        <S.ScheduleSection>
          <h3>Horários de Hoje</h3>
          <S.Timeline>
            {compromissos.map((item) => (
              <S.AppointmentCard key={item.id} status={item.status}>
                <div className="time">
                  <span>{item.horario}</span>
                </div>
                <div className="info">
                  <strong>{item.paciente}</strong>
                  <span>{item.tipo}</span>
                </div>
                <S.StatusIndicator status={item.status}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </S.StatusIndicator>
                <S.Actions>
                  <button><i className="ri-more-2-fill"></i></button>
                </S.Actions>
              </S.AppointmentCard>
            ))}
            
            {compromissos.length === 0 && (
              <S.EmptyAgenda>
                <i className="ri-calendar-event-line"></i>
                <p>Nenhum compromisso para este dia.</p>
              </S.EmptyAgenda>
            )}
          </S.Timeline>
        </S.ScheduleSection>

        {/* Lado Direito: Mini Calendário / Filtros */}
        <S.SidebarSection>
          <S.MiniCalendar>
            <h4>Calendário</h4>
            <div className="calendar-placeholder">
              {/* Aqui futuramente entrará uma lib de calendário como react-calendar */}
              <p>Fevereiro 2026</p>
              <S.DaysGrid>
                {Array.from({ length: 28 }, (_, i) => (
                  <div key={i} className={i + 1 === 28 ? 'active' : ''}>{i + 1}</div>
                ))}
              </S.DaysGrid>
            </div>
          </S.MiniCalendar>

          <S.FiltersCard>
            <h4>Legenda</h4>
            <div className="legend-item">
              <span className="dot confirmado"></span> Confirmado
            </div>
            <div className="legend-item">
              <span className="dot pendente"></span> Pendente
            </div>
            <div className="legend-item">
              <span className="dot cancelado"></span> Cancelado
            </div>
          </S.FiltersCard>
        </S.SidebarSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Agenda;