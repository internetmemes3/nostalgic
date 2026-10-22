'use client';

import { hurtFilter, useToy } from './ToyPlay';

export default function DesktopIcon({ id, icon, label, onClick }) {
  const { pieces } = useToy();
  const hurt = pieces[id];
  const isEmoji = icon && !icon.startsWith('/') && !icon.startsWith('http');
  const knocked = hurt && (hurt.x || hurt.y || hurt.rot);

  return (
    <button
      type="button"
      onClick={onClick}
      className="desktop-icon"
      data-desk-target={id}
      style={{
        transform: knocked ? `translate(${hurt.x}px, ${hurt.y}px) rotate(${hurt.rot}deg)` : undefined,
      }}
    >
      <span className="desktop-icon-stack" style={{ filter: hurtFilter(hurt) }}>
        <div className="desktop-icon-art">
          {isEmoji ? (
            <span className="desktop-icon-emoji">{icon}</span>
          ) : (
            <img src={icon} alt="" draggable="false" />
          )}
          {hurt?.cut > 0 && <span className="desk-slash" aria-hidden="true" />}
        </div>
        <span className="icon-label">{label}</span>
      </span>
      {hurt?.burn > 0 && <span className="desk-flame" aria-hidden="true">🔥</span>}
    </button>
  );
}
