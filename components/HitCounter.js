'use client';
import { useEffect, useState } from 'react';
import { hurtFilter, useToy } from './ToyPlay';

const MAX_DIGITS = 99999999;

export default function HitCounter() {
  const { pieces } = useToy();
  const hurt = pieces.counter;
  const [hits, setHits] = useState(69420);
  const [note, setNote] = useState('the webmaster rounded this');

  useEffect(() => {
    const onBump = (event) => {
      const amount = event.detail || 1000000;
      setHits((n) => Math.min(MAX_DIGITS, n + amount));
      setNote('the counter jumped on its own');
    };
    window.addEventListener('bump-hits', onBump);
    return () => window.removeEventListener('bump-hits', onBump);
  }, []);

  const poke = () => {
    if (hits >= MAX_DIGITS) {
      setNote('the counter ran out of digits. bullish.');
      return;
    }
    const roll = Math.random();
    if (roll < 0.25) {
      setHits((n) => Math.min(MAX_DIGITS, n + 1));
      setNote('a real visitor. rare.');
    } else if (roll < 0.7) {
      setHits((n) => Math.min(MAX_DIGITS, n * 10));
      setNote('the webmaster added a zero');
    } else {
      setHits((n) => Math.min(MAX_DIGITS, n + 111111));
      setNote('bots signed the guestbook');
    }
  };

  return (
    <button
      type="button"
      className="hit-counter"
      data-desk-target="counter"
      onClick={poke}
      style={{
        filter: hurtFilter(hurt),
        transform: hurt && (hurt.x || hurt.y || hurt.rot)
          ? `translate(${hurt.x}px, ${hurt.y}px) rotate(${hurt.rot}deg)`
          : undefined,
      }}
    >
      <span className="hit-counter-label">you are visitor</span>
      <span className="hit-counter-num">{String(hits).padStart(8, '0')}</span>
      <span className="hit-counter-note">{note}</span>
    </button>
  );
}
