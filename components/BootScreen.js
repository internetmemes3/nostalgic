'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const DURATION = 700;

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onCompleteRef.current();
  }, []);

  useEffect(() => {
    const started = Date.now();
    let doneTimer;
    const interval = setInterval(() => {
      const next = Math.min(100, ((Date.now() - started) / DURATION) * 100);
      setProgress(next);
      if (next >= 100) {
        clearInterval(interval);
        doneTimer = setTimeout(finish, 180);
      }
    }, 40);
    return () => {
      clearInterval(interval);
      clearTimeout(doneTimer);
    };
  }, [finish]);

  return (
    <div className="boot-splash" onClick={finish}>
      <div className="px-cloud" style={{ top: '8%', left: '6%', transform: 'scale(1.15)' }} />
      <div className="px-cloud" style={{ top: '18%', left: '28%', transform: 'scale(0.7)' }} />
      <div className="px-cloud" style={{ top: '10%', right: '8%', transform: 'scale(1)' }} />
      <div className="px-cloud" style={{ top: '26%', right: '22%', transform: 'scale(0.55)' }} />
      <div className="px-cloud" style={{ bottom: '22%', left: '10%', transform: 'scale(0.8)' }} />
      <div className="px-cloud" style={{ bottom: '30%', right: '12%', transform: 'scale(0.9)' }} />
      <div className="px-cloud" style={{ bottom: '16%', left: '42%', transform: 'scale(0.6)' }} />

      <img src="/icons/logo.png" alt="Nostalgic" className="boot-splash-logo" draggable="false" />
      <div className="boot-splash-title">NostalgicOS <span>98</span></div>

      <div className="boot-splash-meter">
        <div className="boot-splash-track" aria-hidden="true">
          <div className="boot-splash-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
