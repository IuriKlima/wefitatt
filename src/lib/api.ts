// Serviço centralizado para chamar a API Python (FastAPI)
const API_BASE_URL = 'http://127.0.0.1:8000';

export const api = {
  // --- AUTH ---
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Erro no login');
    return data;
  },

  async register(payload: {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    role?: string;
    company_name?: string;
    document_cnpj?: string;
    tenant_id?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Erro no cadastro');
    return data;
  },

  // --- HEALTH ---
  async health() {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.json();
  },
};

export default api;
