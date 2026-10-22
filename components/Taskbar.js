'use client';
import { useEffect, useState } from 'react';
import { LINKS } from '../lib/site';

export default function Taskbar({ onStartClick, startOpen, openWindows, onWindowClick, onShowDesktop }) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="os-taskbar">
      <button
        type="button"
        className={`win95-button start-button ${startOpen ? 'is-pressed' : ''}`}
        onClick={(e) => { e.stopPropagation(); onStartClick(); }}
      >
        <img src="/icons/logo.png" alt="" draggable="false" />
        <span>Start</span>
      </button>

      <div className="win95-taskbar-divider" />

      <div className="quick-launch">
        {LINKS.map((item) => (
          <a
            key={item.id}
            className="quick-launch-btn quick-link"
            href={item.href || undefined}
            target={item.href ? '_blank' : undefined}
            rel={item.href ? 'noopener noreferrer' : undefined}
            title={item.href ? item.label : `${item.label} — add the link in .env.local`}
            onClick={(e) => {
              e.stopPropagation();
              if (!item.href) e.preventDefault();
            }}
          >
            <span className="quick-link-full">{item.label}</span>
            <span className="quick-link-short">{item.short}</span>
          </a>
        ))}
        <button type="button" className="quick-launch-btn" title="Show Desktop" onClick={onShowDesktop}>
          <span className="show-desktop-glyph" />
        </button>
      </div>

      <div className="win95-taskbar-divider" />

      <div className="task-buttons">
        {openWindows.map((win) => (
          <button
            key={win.id}
            type="button"
            className={`win95-button task-button ${win.active ? 'is-pressed' : ''}`}
            onClick={() => onWindowClick(win.id)}
            title={win.title}
          >
            {win.icon && (win.icon.startsWith('/') || win.icon.startsWith('http')
              ? <img src={win.icon} alt="" draggable="false" />
              : <span className="task-emoji">{win.icon}</span>)}
            <span>{win.title}</span>
          </button>
        ))}
      </div>

      <div className="tray" title={`${currentDate}\nNostalgicOS 98`}>
        <img src="/icons/logo.png" alt="" className="tray-logo" title="NostalgicOS 98" draggable="false" />
        <span className="tray-vol" title="Volume — dial-up loudness: maximum">🔊</span>
        <span className="tray-clock">{currentTime}</span>
      </div>
    </div>
  );
}
