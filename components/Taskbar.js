'use client';
import { useState, useEffect } from 'react';

export default function Taskbar({ onStartClick, startOpen, openWindows, onWindowClick }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[40px] bg-[#c0c0c0] z-[3000]"
      style={{ boxShadow: 'inset 0 1px 0 #fff' }}>
      <div className="flex items-center h-full px-1 gap-1">
        {/* Start Button */}
        <button
          className={`win95-button px-2 py-[2px] flex items-center gap-1 h-[30px] font-bold text-[14px] ${startOpen ? 'border-[#0a0a0a] border-r-[#dfdfdf] border-b-[#dfdfdf]' : ''}`}
          onClick={(e) => { e.stopPropagation(); onStartClick(); }}
        >
          <img src="/icons/win.png" alt="Start" style={{ width: '20px', height: '20px' }} draggable="false" />
          <span>Start</span>
        </button>

        <div className="win95-taskbar-divider mx-1 h-[28px]" />

        {/* Open Window Buttons */}
        <div className="flex-1 flex items-center gap-1 overflow-hidden">
          {openWindows.map(win => (
            <button
              key={win.id}
              className={`win95-button px-2 py-[2px] h-[26px] text-[12px] truncate max-w-[140px] ${win.active ? 'border-[#0a0a0a] border-r-[#dfdfdf] border-b-[#dfdfdf]' : ''}`}
              onClick={() => onWindowClick(win.id)}
            >
              {win.title}
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 h-[28px] px-2"
          style={{ boxShadow: 'inset 1px 1px #808080, inset -1px -1px #fff' }}>
          <span className="text-[11px]" title="Volume">🔊</span>
          <span className="text-[13px] font-mono">{currentTime}</span>
        </div>
      </div>
    </div>
  );
}
