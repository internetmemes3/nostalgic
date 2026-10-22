'use client';
import { useEffect, useState } from 'react';

export default function NostalgicToolbar({ level, note, onUninstall }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(note || '');

  useEffect(() => {
    if (note) setResult(note);
  }, [note]);

  const search = () => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResult('You searched for nothing. Nothing is up 4% today. Not advice.');
    } else if (q.includes('uninstal') || q === 'remove') {
      setResult('Uninstall is the X on the right. It has a personality. Good luck.');
    } else {
      setResult(`No results for "${query.trim()}". Did you mean $NLGC? Everyone does.`);
    }
  };

  return (
    <div className={`nl-toolbar ${level > 1 ? 'plus' : ''}`} onClick={(e) => e.stopPropagation()}>
      <span className="nl-toolbar-brand">{level > 1 ? 'Toolbar PLUS' : 'Nostalgic Toolbar'}</span>
      <input
        value={query}
        placeholder="Search"
        aria-label="Search the web"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') search(); }}
      />
      <button type="button" className="win95-button px-2 py-[1px] text-[11px]" onClick={search}>Search</button>
      <button
        type="button"
        className="win95-button px-2 py-[1px] text-[11px]"
        onClick={() => setResult('Homepage set to this page. It already was. It is more now.')}
      >
        Home
      </button>
      <button
        type="button"
        className="win95-button px-2 py-[1px] text-[11px]"
        onClick={() => setResult(level > 1
          ? 'Weather for your portfolio: cloudy, chance of candles. Humidity 98% hopium.'
          : 'Popup blocked. Another one is loading out of spite.')}
      >
        {level > 1 ? 'Weather' : 'Block popups'}
      </button>
      <span className="nl-toolbar-msg">{result || note}</span>
      <button type="button" className="win95-button nl-toolbar-x" aria-label="Uninstall toolbar" title="Uninstall" onClick={onUninstall}>
        ✕
      </button>
    </div>
  );
}
