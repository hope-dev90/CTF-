import React, { useState, useEffect } from 'react';
import { picoctfApi } from '../services/api';
import Modal from '../components/Modal';

const EMPTY = { challengeName: '', category: '', difficulty: '', writeup: '', flag: '' };

const difficultyColor = (d) => {
  if (!d) return '#bbcbb8';
  if (d.toLowerCase() === 'easy') return '#31e368';
  if (d.toLowerCase() === 'medium') return '#75d4e8';
  if (d.toLowerCase() === 'hard') return '#ffb4ab';
  return '#d7baff';
};

function ChallengeCard({ item, onEdit, onDelete }) {
  const [copied, setCopied] = useState(false);
  const copyFlag = () => {
    if (!item.flag) return;
    navigator.clipboard.writeText(item.flag).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div className="payload-card p-5 rounded-xl flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-2 mb-2">
            {item.category && (
              <span className="px-2 py-0.5 rounded border text-xs font-mono"
                style={{ color: '#d7baff', background: 'rgba(215,186,255,0.1)', borderColor: 'rgba(215,186,255,0.2)' }}>
                {item.category}
              </span>
            )}
            {item.difficulty && (
              <span className="px-2 py-0.5 rounded border text-xs font-mono"
                style={{ color: difficultyColor(item.difficulty), background: `${difficultyColor(item.difficulty)}1A`, borderColor: `${difficultyColor(item.difficulty)}33` }}>
                {item.difficulty}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
            {item.challengeName}
          </h3>
        </div>
        <button onClick={() => onDelete(item.id)} style={{ color: '#bbcbb8' }}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      <div className="relative">
        <pre className="code-block-bg p-4 rounded-lg text-sm border overflow-x-auto"
          style={{ fontFamily: 'JetBrains Mono', color: '#d7baff', borderColor: '#3c4a3c', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>{item.writeup?.slice(0, 300)}{item.writeup?.length > 300 ? '...' : ''}</code>
        </pre>
      </div>

      {item.flag && (
        <div className="flex items-center justify-between p-3 rounded-lg border"
          style={{ background: 'rgba(49,227,104,0.05)', borderColor: 'rgba(49,227,104,0.2)' }}>
          <span className="text-xs font-mono" style={{ color: '#31e368' }}>🚩 {item.flag}</span>
          <button onClick={copyFlag} className="text-xs font-mono" style={{ color: '#31e368' }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'rgba(60,74,60,0.3)' }}>
        <span className="text-xs font-mono" style={{ color: '#bbcbb8' }}>
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
        <button onClick={() => onEdit(item)} className="text-xs font-mono hover:underline" style={{ color: '#d7baff' }}>Edit</button>
      </div>
    </div>
  );
}

export default function PicoctfPage({ search }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try { setItems(await picoctfApi.getAll()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ challengeName: item.challengeName, category: item.category || '', difficulty: item.difficulty || '', writeup: item.writeup, flag: item.flag || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      editing ? await picoctfApi.update(editing.id, form) : await picoctfApi.create(form);
      setShowModal(false);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await picoctfApi.remove(id);
    load();
  };

  const filtered = items.filter(i =>
    !search || i.challengeName?.toLowerCase().includes(search.toLowerCase()) ||
    i.category?.toLowerCase().includes(search.toLowerCase()) ||
    i.writeup?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="mb-12">
        <div className="flex items-end justify-between">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-xs font-mono" style={{ color: '#bbcbb8' }}>
              <span>Library</span>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
              <span style={{ color: '#d7baff' }}>PicoCTF Writeups</span>
            </nav>
            <h2 className="text-3xl font-bold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
              CTF Challenge Writeups
            </h2>
          </div>
          <button onClick={openCreate} className="px-6 py-2 rounded-lg font-bold flex items-center gap-2"
            style={{ background: '#d7baff', color: '#290055' }}>
            <span className="material-symbols-outlined">add</span>New Writeup
          </button>
        </div>
      </header>

      {error && <div className="mb-6 p-4 rounded-lg border text-sm font-mono"
        style={{ background: '#93000a22', borderColor: '#ffb4ab', color: '#ffb4ab' }}>{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="material-symbols-outlined animate-spin text-5xl" style={{ color: '#d7baff' }}>progress_activity</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filtered.map(item => (
            <ChallengeCard key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center h-48 gap-3">
              <span className="material-symbols-outlined text-5xl" style={{ color: '#3c4a3c' }}>emoji_events</span>
              <p className="font-mono text-sm" style={{ color: '#bbcbb8' }}>No writeups yet. Add one!</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Writeup' : 'New CTF Writeup'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label: 'Challenge Name *', key: 'challengeName', required: true },
              { label: 'Category (e.g. Web, Crypto)', key: 'category' },
              { label: 'Difficulty (easy / medium / hard)', key: 'difficulty' },
              { label: 'Flag (e.g. picoCTF{...})', key: 'flag' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  required={f.required}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Writeup / Solution *</label>
              <textarea value={form.writeup} onChange={e => setForm(p => ({ ...p, writeup: e.target.value }))}
                required rows={5}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none font-mono resize-none"
                style={{ background: '#000', borderColor: '#3c4a3c', color: '#d7baff' }} />
            </div>
            <div className="flex gap-3 justify-end mt-2">
              <button type="button" onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-mono border"
                style={{ borderColor: '#3c4a3c', color: '#bbcbb8' }}>Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-lg text-sm font-bold"
                style={{ background: '#d7baff', color: '#290055' }}>
                {editing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
