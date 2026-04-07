'use client';
import { useState, useEffect } from 'react';

const SILLY_MESSAGES = [
  "ERROR 420: Gains not found",
  "Downloading more RAM... please wait...",
  "Have you tried turning your portfolio off and on again?",
  "This action requires 69 confirmations",
  "WARNING: Your bags are getting heavier",
  "Defragmenting your diamond hands...",
  "This is financial advice (it's not)",
  "Error: Wallet too light to perform this action",
];

export default function ContextMenu({ x, y, onClose, onOpenWindow, onClippy, onBSOD }) {
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  const handleSilly = (e) => {
    e.stopPropagation();
    const msg = SILLY_MESSAGES[Math.floor(Math.random() * SILLY_MESSAGES.length)];
    alert(msg);
    onClose();
  };

  const handleRefresh = (e) => {
    e.stopPropagation();
    document.body.style.transition = 'transform 0.5s';
    document.body.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      document.body.style.transform = 'none';
      document.body.style.transition = '';
    }, 600);
    onClose();
  };

  const handleViewSource = (e) => {
    e.stopPropagation();
    alert("SOURCE CODE:\n\nif (bag === 'heavy') {\n  cope();\n} else {\n  moon();\n}\n\n// TODO: figure out what a blockchain is\n// TODO: ask mom for more pizza rolls");
    onClose();
  };

  const handleScreenFlip = (e) => {
    e.stopPropagation();
    document.body.style.transition = 'filter 1s';
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    setTimeout(() => {
      document.body.style.filter = 'none';
      document.body.style.transition = '';
    }, 2000);
    onClose();
  };

  return (
    <div
      className="context-menu"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="context-menu-item" onClick={handleRefresh}>
        ↻ Refresh Desktop
      </div>
      <div className="context-menu-item" onClick={handleScreenFlip}>
        🔄 Invert Colors (prank mode)
      </div>
      <div className="context-menu-divider" />
      <div className="context-menu-item" onClick={() => { onOpenWindow('notepad'); onClose(); }}>
        📝 New → Text Document
      </div>
      <div className="context-menu-item" onClick={handleSilly}>
        📁 Arrange Icons by Market Cap
      </div>
      <div className="context-menu-item" onClick={handleSilly}>
        🧹 Empty Recycle Bin (your portfolio)
      </div>
      <div className="context-menu-divider" />
      <div className="context-menu-item" onClick={handleViewSource}>
        💻 View Source Code
      </div>
      <div className="context-menu-item" onClick={handleSilly}>
        🎨 Display Properties
      </div>
      <div className="context-menu-divider" />
      <div className="context-menu-item" onClick={(e) => { e.stopPropagation(); onClippy && onClippy(); onClose(); }}>
        � Summon Clippy
      </div>
      <div className="context-menu-item" onClick={(e) => { e.stopPropagation(); onBSOD && onBSOD(); onClose(); }}>
        💀 crash_system.exe
      </div>
    </div>
  );
}
