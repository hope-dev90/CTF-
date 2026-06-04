const BASE_URL = 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
}

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
