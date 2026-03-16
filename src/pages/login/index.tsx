import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import api from '../../services/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/login/', { username, password });
      
      // Salvamos o token no localStorage
      localStorage.setItem('@Clinica:token', response.data.access);
      localStorage.setItem('@Clinica:user', response.data.username);

      // Redireciona para a Dashboard ou Agenda
      navigate('/');
    } catch (error) {
      alert('Usuário ou senha inválidos. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.LoginCard>
        <header>
          <h1>Clínica Digital</h1>
          <p>Bem-vinda de volta, psicóloga!</p>
        </header>

        <form onSubmit={handleLogin}>
          <S.InputGroup>
            <label>Usuário</label>
            <input 
              type="text" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Digite seu usuário"
            />
          </S.InputGroup>

          <S.InputGroup>
            <label>Senha</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </S.InputGroup>

          <S.LoginButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Acessar Sistema'}
          </S.LoginButton>
        </form>
      </S.LoginCard>
    </S.Wrapper>
  );
};

export default Login;