'use client';

import { useToy } from '../ToyPlay';

const TOOLS = [
  { id: 'burn', icon: '🔥', label: 'Burn' },
  { id: 'cut', icon: '✂️', label: 'Cut' },
  { id: 'smash', icon: '🔨', label: 'Smash' },
  { id: 'paint', icon: '🎨', label: 'Paint' },
  { id: 'stamp', icon: '💠', label: 'Stamp' },
  { id: 'bugs', icon: '🐜', label: 'Bugs' },
  { id: 'tape', icon: '🩹', label: 'Tape' },
];

export default function ToyBox() {
  const { tool, choose, integrity, line } = useToy();
  const shown = Math.round(integrity);
  const meter = shown <= 30 ? 'dead' : shown <= 60 ? 'warn' : '';

  return (
    <div className="toy-palette">
      <p className="toy-help">The desktop is the toy. Pick a tool, then drag it across the screen. Click the tool again to put it down.</p>
      <div className="toy-tools">
        {TOOLS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`win95-button toy-tool ${tool === item.id ? 'is-armed' : ''}`}
            aria-pressed={tool === item.id}
            onClick={() => choose(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div className="toy-meter">
        <span>Desktop</span>
        <div className="toy-meter-track" aria-hidden="true">
          <div className={`toy-meter-fill ${meter}`} style={{ width: `${shown}%` }} />
        </div>
        <span>{shown}%</span>
      </div>
      <div className="toy-status" role="status">{line}</div>
    </div>
  );
}
