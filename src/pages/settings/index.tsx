import React, { useState } from 'react';
import * as S from './styles';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <S.Container>
      <S.Header>
        <h2>Configurações</h2>
        <p>Gerencie as preferências da sua conta e da clínica.</p>
      </S.Header>

      <S.SettingsWrapper>
        {/* Menu Lateral de Configurações */}
        <S.Sidebar>
          <S.TabButton 
            active={activeTab === 'perfil'} 
            onClick={() => setActiveTab('perfil')}
          >
            <i className="ri-user-settings-line"></i> Meu Perfil
          </S.TabButton>
          
          <S.TabButton 
            active={activeTab === 'clinica'} 
            onClick={() => setActiveTab('clinica')}
          >
            <i className="ri-hospital-line"></i> Dados da Clínica
          </S.TabButton>

          <S.TabButton 
            active={activeTab === 'notificacoes'} 
            onClick={() => setActiveTab('notificacoes')}
          >
            <i className="ri-notification-3-line"></i> Notificações
          </S.TabButton>

          <S.TabButton 
            active={activeTab === 'seguranca'} 
            onClick={() => setActiveTab('seguranca')}
          >
            <i className="ri-lock-password-line"></i> Segurança
          </S.TabButton>
        </S.Sidebar>

        {/* Área de Conteúdo */}
        <S.MainContent>
          {activeTab === 'perfil' && (
            <S.SectionCard>
              <h3>Informações Pessoais</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <S.InputRow>
                  <S.InputGroup>
                    <label>Nome Completo</label>
                    <input type="text" defaultValue="Dra. Ticiana" />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label>Registro Profissional (CRM/CREFITO)</label>
                    <input type="text" defaultValue="12345-AL" />
                  </S.InputGroup>
                </S.InputRow>

                <S.InputGroup>
                  <label>E-mail de Acesso</label>
                  <input type="email" defaultValue="ticiana@clinica.com" />
                </S.InputGroup>

                <S.SaveButton>Atualizar Perfil</S.SaveButton>
              </form>
            </S.SectionCard>
          )}

          {activeTab === 'seguranca' && (
            <S.SectionCard>
              <h3>Alterar Senha</h3>
              <p>Recomendamos o uso de uma senha forte para proteger seus dados.</p>
              <form>
                <S.InputGroup>
                  <label>Senha Atual</label>
                  <input type="password" />
                </S.InputGroup>
                <S.InputGroup>
                  <label>Nova Senha</label>
                  <input type="password" />
                </S.InputGroup>
                <S.SaveButton>Salvar Nova Senha</S.SaveButton>
              </form>
            </S.SectionCard>
          )}

          {/* Fallback para outras abas */}
          {(activeTab === 'clinica' || activeTab === 'notificacoes') && (
            <S.EmptyTab>
              <i className="ri-tools-line"></i>
              <p>Esta seção está em desenvolvimento.</p>
            </S.EmptyTab>
          )}
        </S.MainContent>
      </S.SettingsWrapper>
    </S.Container>
  );
};

export default Settings;