'use client';
import { useEffect, useState } from 'react';

export default function GagPopups({ active, onToys, onInstall }) {
  const [step, setStep] = useState(-1);
  const [midiTries, setMidiTries] = useState(0);

  useEffect(() => {
    if (!active) {
      setStep(-1);
      setMidiTries(0);
      return undefined;
    }
    const timer = setTimeout(() => setStep(0), 1400);
    return () => clearTimeout(timer);
  }, [active]);

  const next = () => setStep((s) => s + 1);

  if (!active || step < 0 || step > 3) return null;

  return (
    <>
      {step === 0 && (
        <div className="gag-mail" onClick={(e) => e.stopPropagation()}>
          <div className="gag-mail-title">
            <span>Congratulations</span>
            <button type="button" className="win98-caption-btn" aria-label="Close" onClick={next}>
              <span className="win98-close-glyph">✕</span>
            </button>
          </div>
          <div className="p-2 text-[12px]">
            <p className="font-bold text-[#c00000] mb-1">YOU ARE VISITOR 1,000,000</p>
            <p>Your prize is a toolbox. The tools work on the desktop. Fire, scissors, a hammer, paint, a stamp, termites, and tape.</p>
            <div className="flex justify-end gap-1 mt-2">
              <button type="button" className="win95-button px-2 py-[2px] text-[11px]" onClick={() => { next(); onToys(); }}>
                Open it
              </button>
              <button type="button" className="win95-button px-2 py-[2px] text-[11px]" onClick={next}>
                I don&apos;t click banners
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="gag-ad" onClick={(e) => e.stopPropagation()}>
          <div className="gag-mail-title">
            <span>Cookie</span>
            <button type="button" className="win98-caption-btn" aria-label="Close" onClick={next}>
              <span className="win98-close-glyph">✕</span>
            </button>
          </div>
          <div className="p-2 text-[12px]">
            <p className="mb-1">This site would like to place a cookie on your computer. 🍪</p>
            <p>It is oatmeal raisin. Decline has not been invented yet. We also stored the word &quot;gm&quot;.</p>
            <div className="flex justify-end gap-1 mt-2">
              <button type="button" className="win95-button px-2 py-[2px] text-[11px]" onClick={next}>Chocolate chip</button>
              <button type="button" className="win95-button px-2 py-[2px] text-[11px]" onClick={next}>Oatmeal raisin</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="gag-im" onClick={(e) => e.stopPropagation()}>
          <div className="gag-mail-title">
            <span>autoplay.mid</span>
            <button type="button" className="win98-caption-btn" aria-label="Close" onClick={next}>
              <span className="win98-close-glyph">✕</span>
            </button>
          </div>
          <div className="p-2 text-[12px]">
            <p>A song started on its own. It is your portfolio, rendered as a midi file from a GeoCities page.</p>
            <p className="mt-1">The stop button is arriving by dial-up.</p>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="win95-button px-2 py-[2px] text-[11px]"
                onClick={() => {
                  if (midiTries < 1) setMidiTries(1);
                  else next();
                }}
              >
                {midiTries < 1 ? 'Stop' : 'Still buffering silence (64%)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="gag-phone" onClick={(e) => e.stopPropagation()}>
          <span className="text-[18px]">🔧</span>
          <div>
            <div className="font-bold">Nostalgic Toolbar wants to improve your homepage.</div>
            <div>It will also make search worse. That is the bundle. There was never an unbundle.</div>
          </div>
          <button type="button" className="win95-button px-2 py-[2px] text-[11px]" onClick={() => { onInstall(); next(); }}>Install</button>
          <button type="button" className="win95-button px-2 py-[2px] text-[11px]" onClick={() => { onInstall(); next(); }}>No thanks</button>
        </div>
      )}
    </>
  );
}
