'use client';
import { useState, useEffect } from 'react';

const CLIPPY_MESSAGES = [
  "It looks like you're trying to buy a meme coin! Would you like help losing money?",
  "I see you haven't checked the chart in 30 seconds. Is everything okay at home?",
  "Did you know? The average $NLGC holder is 420% more attractive. Source: me.",
  "TIP: If you turn your monitor upside down, the chart is going up!",
  "It looks like you're writing a message to your ex about $NLGC. I would advise against this.",
  "REMINDER: You left the oven on. Also, $NLGC is still a good investment. Probably.",
  "Fun fact: This paperclip was made in 1997 and has seen things you wouldn't believe.",
  "I notice you haven't told your friends about $NLGC yet. That's weird. Do it now.",
  "ALERT: Your portfolio needs emotional support. I'm here for you. I'm a paperclip.",
  "Would you like to: [A] Buy more $NLGC [B] Buy even more $NLGC [C] Close this (not available)",
  "I've been watching you stare at this screen for a while. Blink. Please. I'm worried.",
  "FUN FACT: If you printed out the entire blockchain it would be very long. That's it. That's the fact.",
  "BREAKING: I just ran the numbers and $NLGC is mathematically perfect. I am a paperclip, not a financial advisor.",
  "You've been scrolling for a while. Your posture is terrible. Also, buy $NLGC.",
  "I tried to close myself but I can't. We're both stuck here. Might as well buy $NLGC.",
  "ALERT: Someone just mass-DMed 'gm' in the Telegram. Peak hour activity detected.",
];

const COMPLIMENTS = [
  "You have the energy of someone who bought Bitcoin at $1. Absolute legend energy.",
  "Your taste in meme coins is *chef's kiss*. Truly exquisite.",
  "If diamond hands had a face, it would be yours. Gorgeous.",
  "You're the kind of person who actually reads the whitepaper. Respect.",
  "Your wallet is small but your spirit is enormous. That's what matters.",
  "You radiate the aura of a person who has never panic sold. Iconic.",
];

export default function Clippy({ onClose }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      const bounce = setInterval(() => {
        setBouncing(true);
        setTimeout(() => setBouncing(false), 300);
      }, 4000);
      return () => clearInterval(bounce);
    }
  }, [visible]);

  const nextMessage = () => {
    setMessageIndex((prev) => (prev + 1) % CLIPPY_MESSAGES.length);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-[8000] flex items-start gap-2"
      style={{ transition: 'transform 0.3s', transform: bouncing ? 'translateY(-8px)' : 'translateY(0)' }}>
      {/* Clippy "icon" */}
      <div className="text-[40px] cursor-pointer select-none" onClick={nextMessage}
        style={{ filter: 'drop-shadow(1px 1px 0 #000)', lineHeight: 1 }}>
        📎
      </div>
      {/* Speech Bubble */}
      <div className="bg-[#ffffcc] border-2 border-[#000] p-2 rounded-sm relative max-w-[240px] text-[12px]"
        style={{ fontFamily: "'VT323', monospace", boxShadow: '2px 2px 0 #000' }}>
        <div className="text-[10px] text-[#808080] mb-1 font-bold">📎 Clippy says:</div>
        <div className="text-black mb-2">{CLIPPY_MESSAGES[messageIndex]}</div>
        <div className="flex gap-1 justify-end flex-wrap">
          <button className="win95-button text-[10px] px-2 py-0" onClick={nextMessage}>
            Next tip
          </button>
          <button className="win95-button text-[10px] px-2 py-0" onClick={() => {
            const c = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
            setMessageIndex(-1);
            setTimeout(() => setMessageIndex(CLIPPY_MESSAGES.indexOf(CLIPPY_MESSAGES[0])), 0);
            alert('\ud83d\udcce Clippy\'s Compliment Corner:\n\n' + c);
          }}>
            Compliment me
          </button>
          <button className="win95-button text-[10px] px-2 py-0" onClick={() => {
            document.body.classList.add('screen-shake');
            setTimeout(() => document.body.classList.remove('screen-shake'), 500);
          }}>
            Shake it
          </button>
          <button className="win95-button text-[10px] px-2 py-0" onClick={onClose}>
            Go away
          </button>
        </div>
      </div>
    </div>
  );
}
