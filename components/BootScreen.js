'use client';
import { useState, useEffect } from 'react';

const BIOS_LINES = [
  'NostalgicOS BIOS v4.20.69',
  'Copyright (C) 1998 Nostalgic Corp.',
  '',
  'Checking RAM.......... 420 MB OK',
  'Checking VRAM......... 69 MB OK',
  'Detecting hard drives...',
  '  C:\\ - 2GB "MEMES"',
  '  D:\\ - CD-ROM "NOW THATS WHAT I CALL CRYPTO VOL. 98"',
  '',
  'Loading keyboard driver... sus_keyboard.sys',
  'Loading mouse driver..... dank_mouse.drv',
  'Loading sound driver..... earrape_audio.vxd',
  '',
  'WARNING: Financial advice module MISSING (this is fine)',
  '',
  'Starting NostalgicOS...',
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= BIOS_LINES.length) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="boot-screen">
      {BIOS_LINES.slice(0, visibleLines).map((line, i) => (
        <div key={i} style={{ color: line.startsWith('WARNING') ? '#ff6' : '#aaa' }}>
          {line}
        </div>
      ))}
      {visibleLines < BIOS_LINES.length && (
        <span className="boot-cursor">█</span>
      )}
    </div>
  );
}
