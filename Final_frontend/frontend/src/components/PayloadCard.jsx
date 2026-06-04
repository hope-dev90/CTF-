import React, { useState } from 'react';

export default function PayloadCard({ item, onEdit, onDelete }) {
  const [copied, setCopied] = useState(false);

  const copyPayload = () => {
    const text = item.payload || item.content || item.writeup;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getBadgeColor = (cat) => {
    if (cat?.toLowerCase().includes('reflect')) return '#31e368';
    if (cat?.toLowerCase().includes('polyglot')) return '#75d4e8';
    if (cat?.toLowerCase().includes('obfusc')) return '#d7baff';
    if (cat?.toLowerCase().includes('dom')) return '#31e368';
    return '#31e368';
  };

  const badge = item.technique || item.category || item.dbType || 'Default';
  const title = item.title || item.challengeName;
  const body = item.notes || item.content || item.writeup;
  const code = item.payload || item.content || item.writeup;

  return (
    <div className="payload-card p-5 rounded-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="px-2 py-0.5 rounded border text-xs font-mono inline-block mb-2"
            style={{
              color: getBadgeColor(badge),
              background: `${getBadgeColor(badge)}1A`,
              borderColor: `${getBadgeColor(badge)}33`,
            }}>
            {badge || 'General'}
          </span>
          <h3 className="font-semibold text-lg" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
            {title}
          </h3>
        </div>
        <button className="hover:text-primary transition-colors" style={{ color: '#bbcbb8' }} onClick={() => onDelete(item.id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      {/* Description */}
      {body && (
        <p className="text-sm line-clamp-2" style={{ color: '#bbcbb8' }}>
          {body}
        </p>
      )}

      {/* Code block */}
      <div className="relative group">
        <pre className="code-block-bg p-4 rounded-lg text-sm border overflow-x-auto"
          style={{ fontFamily: 'JetBrains Mono', color: '#31e368', borderColor: '#3c4a3c' }}>
          <code>{code?.slice(0, 200)}{code?.length > 200 ? '...' : ''}</code>
        </pre>
        <button
          onClick={copyPayload}
          className="absolute top-2 right-2 p-2 rounded transition-all"
          style={{
            background: copied ? '#31e368' : 'rgba(49,227,104,0.1)',
            color: copied ? '#00702c' : '#31e368',
          }}
          title="Copy to Clipboard"
        >
          <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'rgba(60,74,60,0.3)' }}>
        <span className="text-xs font-mono" style={{ color: '#bbcbb8' }}>
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => onEdit(item)}
          className="text-xs font-mono hover:underline"
          style={{ color: '#31e368' }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
