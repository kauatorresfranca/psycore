import api from './api';

export const clinicaService = {
  // Pacientes
  getPacientes: async () => {
    const response = await api.get('/pacientes/');
    return response.data;
  },

  // Sessões
  getSessoes: async () => {
    const response = await api.get('/sessoes/');
    return response.data;
  },

  // Evoluções
  getEvolucoes: async () => {
    const response = await api.get('/evolucoes/');
    return response.data;
  }
};