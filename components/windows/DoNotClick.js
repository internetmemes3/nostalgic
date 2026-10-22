'use client';
import { useState } from 'react';

const CONSEQUENCES = [
  'Your homepage was changed. It was already this page. It is louder now.',
  'A toolbar saw the open window and sat down. It brought a search box.',
  'The hit counter grew a zero. The webmaster will deny this in the guestbook.',
  'autoplay.mid started in another room. You can hear it anyway.',
  'Clippy wrote the whole thing down. He will mention it at the worst time.',
];

export default function DoNotClick() {
  const [stage, setStage] = useState(0);
  const [shown, setShown] = useState(0);

  const clickAnyway = () => {
    setStage(1);
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 500);
    let n = 0;
    const timer = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= CONSEQUENCES.length) clearInterval(timer);
    }, 450);
  };

  const install = () => {
    setStage(2);
    window.dispatchEvent(new CustomEvent('install-toolbar'));
  };

  return (
    <div style={{ width: '390px', maxWidth: '100%' }} className="p-3">
      {stage === 0 && (
        <>
          <div className="flex gap-3 mb-3">
            <div className="text-[40px] leading-none">🚫</div>
            <div className="text-[12px]">
              <p className="font-bold mb-1">This is how the family computer died in 2001.</p>
              <p>Someone clicked a button that said not to. A toolbar moved in. A song started. Nobody found the stop button until 2004.</p>
              <p className="mt-2">NostalgicOS 98 remembers. $NLGC was minted out of that feeling.</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="win95-button px-3 py-1 text-[12px]" onClick={() => setStage(3)}>
              I will behave
            </button>
            <button type="button" className="win95-button px-3 py-1 text-[12px] font-bold" onClick={clickAnyway}>
              Click anyway
            </button>
          </div>
        </>
      )}

      {stage === 1 && (
        <>
          <p className="font-bold text-[13px] text-[#800000] mb-2">Okay. You clicked it.</p>
          <ul className="text-[12px] space-y-1 mb-3 min-h-[96px]">
            {CONSEQUENCES.slice(0, shown).map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
          {shown >= CONSEQUENCES.length && (
            <div className="flex justify-end">
              <button type="button" className="win95-button px-3 py-1 text-[12px] font-bold" onClick={install}>
                Let it install
              </button>
            </div>
          )}
        </>
      )}

      {stage === 2 && (
        <div className="text-[12px]">
          <p className="text-[28px] text-center mb-2">🔧</p>
          <p className="font-bold text-center mb-1">It&apos;s in.</p>
          <p className="text-center">Look just above the clock. The X is decorative the first time. You knew that. You lived through Yahoo Toolbar.</p>
        </div>
      )}

      {stage === 3 && (
        <p className="text-[12px]">Incredible restraint. The family computer survives. The hammer still works on the desktop.</p>
      )}
    </div>
  );
}
