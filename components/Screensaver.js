'use client';
import { useEffect } from 'react';

const BITS = [
  { emoji: '💾', top: '12%', delay: '0s', duration: '7s' },
  { emoji: '🧰', top: '28%', delay: '1.2s', duration: '9s' },
  { emoji: '🍪', top: '46%', delay: '0.4s', duration: '6s' },
  { emoji: '🏆', top: '62%', delay: '2s', duration: '8s' },
  { emoji: '📎', top: '18%', delay: '2.4s', duration: '10s' },
  { emoji: '🔧', top: '74%', delay: '0.8s', duration: '11s' },
  { emoji: '💾', top: '84%', delay: '1.6s', duration: '7.5s' },
  { emoji: '🚧', top: '38%', delay: '3s', duration: '12s' },
];

export default function Screensaver({ onClose }) {
  useEffect(() => {
    const onKey = () => onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="screensaver" onClick={onClose}>
      {BITS.map((bit, i) => (
        <div
          key={i}
          className="saver-bit"
          style={{ top: bit.top, animationDelay: bit.delay, animationDuration: bit.duration }}
        >
          {bit.emoji}
        </div>
      ))}
      <div className="saver-caption">
        NostalgicOS Screen Saver
        <span>moving so the CRT doesn&apos;t burn in. your attention span already did.</span>
        <span>click anywhere. the holes in the desktop are still there.</span>
      </div>
    </div>
  );
}
