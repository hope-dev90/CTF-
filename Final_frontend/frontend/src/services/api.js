const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'https://ctf-zujn.onrender.com';

function getToken() {
  return localStorage.getItem('ctf_token') || null;
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
}

// ── Auth ──────────────────────────────────────────
export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
};

// ── XSS ──────────────────────────────────────────
export const xssApi = {
  getAll: () => request('/xss'),
  getOne: (id) => request(`/xss/${id}`),
  create: (body) => request('/xss', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/xss/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id) => request(`/xss/${id}`, { method: 'DELETE' }),
};

// ── SQL ──────────────────────────────────────────
export const sqlApi = {
  getAll: () => request('/sql'),
  getOne: (id) => request(`/sql/${id}`),
  create: (body) => request('/sql', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/sql/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id) => request(`/sql/${id}`, { method: 'DELETE' }),
};

// ── Learn ─────────────────────────────────────────
export const learnApi = {
  getAll: () => request('/learn'),
  getOne: (id) => request(`/learn/${id}`),
  create: (body) => request('/learn', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/learn/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id) => request(`/learn/${id}`, { method: 'DELETE' }),
};

// ── PicoCTF ───────────────────────────────────────
export const picoctfApi = {
  getAll: () => request('/picoctf'),
  getOne: (id) => request(`/picoctf/${id}`),
  create: (body) => request('/picoctf', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/picoctf/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id) => request(`/picoctf/${id}`, { method: 'DELETE' }),
};

// ── Chat (Asha) ───────────────────────────────────
export const chatApi = {
  send: (userId, message) =>
    request('/chat', { method: 'POST', body: JSON.stringify({ userId, message }) }),
  history: (userId) => request(`/chat/${userId}`),
};
