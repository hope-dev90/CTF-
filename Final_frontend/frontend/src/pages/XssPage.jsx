import React, { useState, useEffect } from 'react';
import { xssApi } from '../services/api';
import PayloadCard from '../components/PayloadCard';
import Modal from '../components/Modal';

const EMPTY = { title: '', payload: '', technique: '', notes: '' };

export default function XssPage({ search }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try {
      const data = await xssApi.getAll();
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ title: item.title, payload: item.payload, technique: item.technique || '', notes: item.notes || '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await xssApi.update(editing.id, form);
      } else {
        await xssApi.create(form);
      }
      setShowModal(false);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await xssApi.remove(id);
    load();
  };

  const filtered = items.filter(i =>
    !search || i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.payload?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Page header */}
      <header className="mb-12">
        <div className="flex items-end justify-between">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-xs font-mono" style={{ color: '#bbcbb8' }}>
              <span>Library</span>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
              <span style={{ color: '#31e368' }}>Cross-Site Scripting (XSS)</span>
            </nav>
            <h2 className="text-3xl font-bold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
              XSS Exploit Database
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={openCreate}
              className="px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
              style={{ background: '#31e368', color: '#00702c' }}>
              <span className="material-symbols-outlined">add</span>
              New Payload
            </button>
          </div>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-lg border text-sm font-mono"
          style={{ background: '#93000a22', borderColor: '#ffb4ab', color: '#ffb4ab' }}>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="material-symbols-outlined animate-spin text-5xl" style={{ color: '#31e368' }}>progress_activity</span>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filtered.map(item => (
              <PayloadCard key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center h-48 gap-3">
                <span className="material-symbols-outlined text-5xl" style={{ color: '#3c4a3c' }}>bug_report</span>
                <p className="font-mono text-sm" style={{ color: '#bbcbb8' }}>No XSS payloads yet. Add one!</p>
              </div>
            )}
          </div>

          {/* Analytics section */}
          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 rounded-xl border" style={{ background: '#201f1f', borderColor: '#3c4a3c' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>Weekly Activity</h3>
              </div>
              <div className="h-48 w-full flex items-end gap-2 px-2">
                {[40, 65, 30, 85, 50, 95, 75].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t transition-all hover:opacity-100"
                    style={{ height: `${h}%`, background: i === 6 ? '#31e368' : 'rgba(49,227,104,0.2)' }} />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-mono" style={{ color: '#bbcbb8' }}>
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
              </div>
            </div>
            <div className="p-6 rounded-xl border flex flex-col justify-between" style={{ background: '#201f1f', borderColor: '#3c4a3c' }}>
              <div>
                <h3 className="text-xl font-semibold mb-1" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>Total Entries</h3>
                <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#bbcbb8' }}>XSS Payloads</p>
              </div>
              <div className="flex items-center justify-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(49,227,104,0.2)' }} />
                  <div className="relative w-24 h-24 rounded-full border-4 flex items-center justify-center"
                    style={{ borderColor: '#31e368', background: 'rgba(49,227,104,0.1)' }}>
                    <span className="text-3xl font-bold" style={{ color: '#31e368' }}>{items.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <Modal title={editing ? 'Edit XSS Payload' : 'New XSS Payload'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label: 'Title *', key: 'title', type: 'text', required: true },
              { label: 'Technique / Category', key: 'technique', type: 'text' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  required={f.required}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Payload *</label>
              <textarea
                value={form.payload}
                onChange={e => setForm(p => ({ ...p, payload: e.target.value }))}
                required rows={3}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none font-mono resize-none"
                style={{ background: '#000', borderColor: '#3c4a3c', color: '#31e368' }}
              />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Notes</label>
              <textarea
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }}
              />
            </div>
            <div className="flex gap-3 justify-end mt-2">
              <button type="button" onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-mono border"
                style={{ borderColor: '#3c4a3c', color: '#bbcbb8' }}>
                Cancel
              </button>
              <button type="submit"
                className="px-6 py-2 rounded-lg text-sm font-bold"
                style={{ background: '#31e368', color: '#00702c' }}>
                {editing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
