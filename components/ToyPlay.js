'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

const ToyContext = createContext(null);

const ZERO = { burn: 0, cut: 0, smash: 0, x: 0, y: 0, rot: 0 };

const NAMES = {
  mycomputer: 'My Computer',
  donotclick: 'DO NOT CLICK',
  coin: 'Nostalgic',
  internet: 'Internet Exploder',
  toys: 'the Toy Box icon',
  recycle: 'the Recycle Bin',
  msdank: 'Paint',
  minesweeper: 'Minesweeper',
  notepad: 'Notepad',
  brand: 'the big logo',
  counter: 'the hit counter',
};

const HINTS = {
  burn: 'Fire is live. Drag it across the desktop.',
  cut: 'Scissors are live. Slice the desktop.',
  smash: 'Hammer is live. Hit the desktop. Pieces fall off.',
  paint: 'Paint is live. Splatter the desktop.',
  stamp: 'Stamp is live. Leave a $NLGC mark.',
  bugs: 'Termites are live. They eat whatever you drag over.',
  tape: 'Tape is live. Drag it over the damage.',
};

const CURSORS = {
  burn: '🔥',
  cut: '✂️',
  smash: '🔨',
  paint: '🎨',
  stamp: '💠',
  bugs: '🐜',
  tape: '🩹',
};

export function hurtFilter(hurt) {
  if (!hurt) return undefined;
  const burn = hurt.burn || 0;
  const smash = hurt.smash || 0;
  const paint = hurt.paint || 0;
  if (!burn && !smash && !paint) return undefined;
  const parts = [
    `sepia(${Math.min(1, burn * 0.4)})`,
    `saturate(${1 + burn * 0.7})`,
    `brightness(${Math.max(0.35, 1 - burn * 0.16 - smash * 0.06)})`,
    `grayscale(${Math.min(0.85, smash * 0.22)})`,
  ];
  if (burn) parts.push('drop-shadow(0 0 6px rgba(255, 90, 0, 0.95))');
  if (paint) parts.push(`hue-rotate(${paint * 55}deg)`);
  return parts.join(' ');
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function damagePiece(cur, tool, id) {
  const next = { ...cur };
  if (tool === 'tape') {
    next.burn = Math.max(0, cur.burn - 1);
    next.cut = Math.max(0, cur.cut - 1);
    next.smash = Math.max(0, cur.smash - 1);
    next.paint = Math.max(0, (cur.paint || 0) - 1);
    next.x = cur.x * 0.28;
    next.y = cur.y * 0.28;
    next.rot = cur.rot * 0.28;
    return next;
  }
  if (tool === 'burn') {
    next.burn = Math.min(4, cur.burn + 1);
    return next;
  }
  if (tool === 'paint') {
    next.paint = Math.min(4, (cur.paint || 0) + 1);
    return next;
  }
  if (tool === 'cut') {
    next.cut = Math.min(3, cur.cut + 1);
    if (id !== 'brand') next.rot = cur.rot + (Math.random() > 0.5 ? 9 : -9);
    return next;
  }
  const heavy = id !== 'brand';
  next.smash = Math.min(5, cur.smash + 1);
  next.x = clamp(cur.x + (Math.random() * (heavy ? 30 : 8) - 6), heavy ? -24 : -8, heavy ? 70 : 12);
  next.y = clamp(cur.y + (heavy ? 14 + Math.random() * 18 : 3), 0, heavy ? 84 : 12);
  next.rot = cur.rot + (Math.random() > 0.5 ? 1 : -1) * (heavy ? 24 : 4);
  return next;
}

function lineFor(tool, id, integrity) {
  const name = id ? NAMES[id] : null;
  if (integrity <= 0 && tool !== 'tape') return 'The desktop gave up. Tape is the only undo.';
  if (tool === 'burn') return name ? `${name} is on fire.` : 'Scorch on the wallpaper. The teal is cooking.';
  if (tool === 'cut') return name ? `Cut straight through ${name}.` : 'A slice in the desktop. Both halves still load.';
  if (tool === 'smash') return name ? `The hammer found ${name}. A piece fell off.` : 'Hole in the desktop. That piece is on the floor.';
  if (tool === 'paint') return name ? `${name} got a fresh coat.` : 'Paint on the wallpaper. The 90s wants this back.';
  if (tool === 'stamp') return name ? `Stamped ${name}. It is official now.` : 'A $NLGC stamp. The desktop is in the club.';
  if (tool === 'bugs') return name ? `Termites found ${name}. They are hungry.` : 'Termites. They eat desktops. This one is lunch.';
  if (name) return `Taped ${name} back together. The seam is a feature.`;
  return 'Tape over the hole. From the doorway it looks fine.';
}

let audioCtx;
function audio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playTone(freq, duration, type, gainValue, slide) {
  const ctx = audio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), ctx.currentTime + duration);
  gain.gain.setValueAtTime(gainValue, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playBurn() {
  const ctx = audio();
  if (!ctx) return;
  const len = Math.floor(ctx.sampleRate * 0.1);
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  const gain = ctx.createGain();
  gain.gain.value = 0.16;
  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start();
}

export function playTool(kind) {
  if (kind === 'burn') playBurn();
  else if (kind === 'cut') playTone(980, 0.05, 'square', 0.05, 1400);
  else if (kind === 'smash') playTone(160, 0.12, 'sawtooth', 0.12, 45);
  else if (kind === 'paint') playTone(540, 0.06, 'triangle', 0.05, 240);
  else if (kind === 'stamp') playTone(190, 0.08, 'square', 0.07, 80);
  else if (kind === 'bugs') playTone(1460, 0.04, 'square', 0.03, 760);
  else if (kind === 'tape') playTone(320, 0.07, 'triangle', 0.06, 640);
}

export function ToyProvider({ live, children }) {
  const [tool, setTool] = useState(null);
  const [integrity, setIntegrity] = useState(100);
  const [line, setLine] = useState('Pick a tool. Then drag it across the desktop.');
  const [pieces, setPieces] = useState({});
  const integrityRef = useRef(100);

  useEffect(() => {
    if (!live) setTool(null);
  }, [live]);

  const choose = (id) => {
    audio();
    if (tool === id) {
      setTool(null);
      setLine('Tool put down. The desktop is a computer again.');
      return;
    }
    setTool(id);
    setLine(HINTS[id]);
    playTool(id);
  };

  const hurt = (id, kind) => {
    if (!id) return;
    setPieces((prev) => {
      const cur = prev[id] || ZERO;
      return { ...prev, [id]: damagePiece(cur, kind, id) };
    });
  };

  const addIntegrity = (delta) => {
    const next = Math.max(0, Math.min(100, integrityRef.current + delta));
    integrityRef.current = next;
    setIntegrity(next);
    return next;
  };

  const value = {
    tool,
    choose,
    integrity,
    line,
    setLine,
    pieces,
    hurt,
    addIntegrity,
  };

  return <ToyContext.Provider value={value}>{children}</ToyContext.Provider>;
}

export function useToy() {
  const ctx = useContext(ToyContext);
  if (!ctx) throw new Error('Toy tools are only on the desktop');
  return ctx;
}

function fillBlob(ctx, x, y, radius, color) {
  ctx.beginPath();
  const steps = 11;
  for (let i = 0; i <= steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const rad = radius * (0.72 + Math.random() * 0.45);
    const px = x + Math.cos(angle) * rad;
    const py = y + Math.sin(angle) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function paintBurn(ctx, x, y) {
  const radius = 28 + Math.random() * 20;
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, 'rgba(30, 6, 0, 0.92)');
  glow.addColorStop(0.38, 'rgba(170, 40, 0, 0.78)');
  glow.addColorStop(0.72, 'rgba(255, 130, 0, 0.38)');
  glow.addColorStop(1, 'rgba(255, 210, 40, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(12, 4, 0, 0.85)';
  for (let i = 0; i < 5; i += 1) {
    ctx.fillRect(x + (Math.random() - 0.5) * radius, y + (Math.random() - 0.5) * radius, 3, 2);
  }
}

function paintCut(ctx, x0, y0, x1, y1) {
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(255,255,255,0.92)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.strokeStyle = '#101010';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function paintSmash(ctx, x, y) {
  const radius = 20 + Math.random() * 16;
  fillBlob(ctx, x, y, radius + 7, '#e8e8e8');
  fillBlob(ctx, x, y, radius, '#070707');
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.35;
    const len = 34 + Math.random() * 58;
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0.9)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function paintTape(ctx, x, y) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.4);
  ctx.fillStyle = 'rgba(226, 208, 158, 0.82)';
  ctx.fillRect(-32, -8, 64, 16);
  ctx.strokeStyle = 'rgba(90, 68, 28, 0.55)';
  ctx.lineWidth = 1;
  ctx.strokeRect(-32, -8, 64, 16);
  ctx.restore();
}

const SPLAT_COLORS = ['#ff2d95', '#ffe600', '#39ff14', '#00e5ff', '#ff6a00', '#c44dff'];
const STAMP_WORDS = ['$NLGC', 'GM', 'WAGMI'];

function paintSplat(ctx, x, y) {
  const color = SPLAT_COLORS[Math.floor(Math.random() * SPLAT_COLORS.length)];
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.9;
  for (let i = 0; i < 6; i += 1) {
    const radius = 4 + Math.random() * 11;
    ctx.beginPath();
    ctx.arc(x + (Math.random() - 0.5) * 26, y + (Math.random() - 0.5) * 22, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 0.8;
  ctx.fillRect(x - 2, y, 5, 16 + Math.random() * 28);
  ctx.restore();
}

function paintStamp(ctx, x, y) {
  const word = STAMP_WORDS[Math.floor(Math.random() * STAMP_WORDS.length)];
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((Math.random() - 0.5) * 0.5);
  ctx.fillStyle = 'rgba(255,255,255,0.94)';
  ctx.fillRect(-30, -13, 60, 26);
  ctx.strokeStyle = '#000080';
  ctx.lineWidth = 2;
  ctx.strokeRect(-30, -13, 60, 26);
  ctx.fillStyle = '#000080';
  ctx.font = 'bold 12px Tahoma, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(word, 0, 1);
  ctx.restore();
}

function targetAt(x, y) {
  const nodes = document.querySelectorAll('[data-desk-target]');
  let best = null;
  let bestArea = Infinity;
  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return;
    const area = rect.width * rect.height;
    if (area < bestArea) {
      bestArea = area;
      best = node.dataset.deskTarget;
    }
  });
  return best;
}

function inChrome(x, y) {
  if (y > window.innerHeight - 36) return true;
  const bar = document.querySelector('.nl-toolbar');
  if (!bar) return false;
  const rect = bar.getBoundingClientRect();
  return y >= rect.top && x >= rect.left && x <= rect.right;
}

export function DesktopBrand() {
  const { pieces } = useToy();
  const brand = pieces.brand;
  return (
    <div className="desktop-brand" data-desk-target="brand" aria-hidden="true">
      <div style={{ filter: hurtFilter(brand) }}>
        <img src="/icons/logo.png" alt="" draggable="false" />
        {brand?.cut > 0 && <span className="desk-slash desk-slash-brand" />}
        <div className="desktop-brand-name">NostalgicOS 98</div>
        <div className="desktop-brand-tag">connecting to the past...</div>
      </div>
      {brand?.burn > 0 && <span className="desk-flame desk-flame-brand">🔥</span>}
    </div>
  );
}

export function DesktopWreck() {
  const toy = useToy();
  const toyRef = useRef(toy);
  toyRef.current = toy;
  const persistRef = useRef(null);
  const fxRef = useRef(null);
  const stageRef = useRef(null);
  const painting = useRef(false);
  const last = useRef(null);
  const gesture = useRef({ hurt: new Set(), target: undefined });
    const heard = useRef(0);
    const shakeTimer = useRef(0);
    const particles = useRef([]);
  const looping = useRef(false);
  const [cursor, setCursor] = useState(null);

  const fit = () => {
    const stage = stageRef.current;
    const persist = persistRef.current;
    const fx = fxRef.current;
    if (!stage || !persist || !fx) return;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    [persist, fx].forEach((canvas) => {
      if (canvas.width === width && canvas.height === height) return;
      const copy = canvas === persist && canvas.width > 0 ? document.createElement('canvas') : null;
      if (copy) {
        copy.width = canvas.width;
        copy.height = canvas.height;
        copy.getContext('2d').drawImage(canvas, 0, 0);
      }
      canvas.width = width;
      canvas.height = height;
      if (copy) canvas.getContext('2d').drawImage(copy, 0, 0);
    });
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const observer = new ResizeObserver(() => fit());
    observer.observe(stage);
    fit();
    return () => observer.disconnect();
  }, []);

  const drawFx = () => {
    const canvas = fxRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.current = particles.current.filter((bit) => bit.life > 0 && bit.y < canvas.height + 40);
    particles.current.forEach((bit) => {
      bit.x += bit.vx;
      bit.y += bit.vy;
      bit.life -= 1;
      const alpha = Math.max(0, bit.life / bit.max);
      ctx.save();
      ctx.globalAlpha = alpha;
      if (bit.kind === 'flame') {
        bit.vy -= 0.04;
        const glow = ctx.createRadialGradient(bit.x, bit.y, 0, bit.x, bit.y, bit.r);
        glow.addColorStop(0, '#fff4b0');
        glow.addColorStop(0.45, '#ff7a00');
        glow.addColorStop(1, 'rgba(180, 20, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bit.x, bit.y, bit.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (bit.kind === 'shard') {
        bit.vy += 0.38;
        bit.rot += bit.vr;
        ctx.translate(bit.x, bit.y);
        ctx.rotate(bit.rot);
        ctx.fillStyle = '#008080';
        ctx.fillRect(-bit.w / 2, -bit.h / 2, bit.w, bit.h);
        ctx.strokeStyle = '#dff';
        ctx.lineWidth = 1;
        ctx.strokeRect(-bit.w / 2, -bit.h / 2, bit.w, bit.h);
      } else if (bit.kind === 'bug') {
        const board = persistRef.current;
        if (board && bit.life % 5 === 0) {
          const bite = board.getContext('2d');
          bite.fillStyle = '#070707';
          bite.beginPath();
          bite.arc(bit.x, bit.y, 2.5 + Math.random() * 2, 0, Math.PI * 2);
          bite.fill();
        }
        if (Math.random() < 0.18) {
          bit.vx = (Math.random() - 0.5) * 2.2;
          bit.vy = (Math.random() - 0.5) * 2.2;
        }
        ctx.globalAlpha = 1;
        ctx.translate(bit.x, bit.y);
        ctx.rotate(Math.atan2(bit.vy, bit.vx));
        ctx.fillStyle = '#161616';
        ctx.beginPath();
        ctx.ellipse(0, 0, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, -2);
        ctx.lineTo(-7, -5);
        ctx.moveTo(1, -2);
        ctx.lineTo(3, -6);
        ctx.moveTo(-2, 2);
        ctx.lineTo(-7, 5);
        ctx.moveTo(1, 2);
        ctx.lineTo(3, 6);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(bit.x, bit.y, 2, 2);
      }
      ctx.restore();
    });
  };

  const kick = () => {
    if (looping.current) return;
    looping.current = true;
    const step = () => {
      drawFx();
      if (particles.current.length) requestAnimationFrame(step);
      else looping.current = false;
    };
    requestAnimationFrame(step);
  };

  const spawnFlame = (x, y) => {
    for (let i = 0; i < 5; i += 1) {
      particles.current.push({
        kind: 'flame',
        x: x + (Math.random() - 0.5) * 18,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -1.1 - Math.random() * 1.6,
        life: 26 + Math.random() * 10,
        max: 36,
        r: 5 + Math.random() * 6,
      });
    }
    kick();
  };

  const spawnShards = (x, y) => {
    for (let i = 0; i < 8; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.4 + Math.random() * 3.2;
      particles.current.push({
        kind: 'shard',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.4,
        rot: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.28,
        life: 64,
        max: 64,
        w: 10 + Math.random() * 14,
        h: 7 + Math.random() * 7,
      });
    }
    kick();
  };

  const spawnBugs = (x, y) => {
    for (let i = 0; i < 5; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 1.4;
      particles.current.push({
        kind: 'bug',
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 110,
        max: 110,
      });
    }
    kick();
  };

  const localPoint = (clientX, clientY) => {
    const rect = persistRef.current.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const stamp = (clientX, clientY) => {
    const api = toyRef.current;
    const kind = api.tool;
    const canvas = persistRef.current;
    if (!kind || !canvas) return;
    if (inChrome(clientX, clientY)) return;
    const under = document.elementFromPoint(clientX, clientY);
    if (under && under.closest('.win98-window, .os-taskbar, .nl-toolbar, .start-menu, .gag-mail, .gag-ad, .gag-im, .gag-phone, .context-menu')) return;
    const ctx = canvas.getContext('2d');
    const point = localPoint(clientX, clientY);
    const prev = last.current;
    if (kind === 'burn') {
      paintBurn(ctx, point.x, point.y);
      spawnFlame(point.x, point.y);
    } else if (kind === 'cut') {
      if (prev) paintCut(ctx, prev.x, prev.y, point.x, point.y);
      else paintCut(ctx, point.x - 26, point.y - 8, point.x + 28, point.y + 12);
    } else if (kind === 'smash') {
      paintSmash(ctx, point.x, point.y);
      spawnShards(point.x, point.y);
      document.body.classList.remove('screen-shake');
      void document.body.offsetWidth;
      document.body.classList.add('screen-shake');
      window.clearTimeout(shakeTimer.current);
      shakeTimer.current = window.setTimeout(() => document.body.classList.remove('screen-shake'), 480);
    } else if (kind === 'paint') {
      paintSplat(ctx, point.x, point.y);
    } else if (kind === 'stamp') {
      paintStamp(ctx, point.x, point.y);
    } else if (kind === 'bugs') {
      spawnBugs(point.x, point.y);
    } else {
      paintTape(ctx, point.x, point.y);
    }
    last.current = point;

    const id = targetAt(clientX, clientY);
    const now = performance.now();
    if (now - heard.current > 90) {
      playTool(kind);
      heard.current = now;
    }
    const delta = { smash: -4, tape: 1.4, bugs: -1.1, paint: -0.15, stamp: 0 }[kind] ?? -0.55;
    const nextIntegrity = api.addIntegrity(delta);
    if (kind === 'tape') {
      if (id) api.hurt(id, kind);
    } else if (id && !gesture.current.hurt.has(id)) {
      gesture.current.hurt.add(id);
      api.hurt(id, kind);
    }
    if (gesture.current.target !== id) {
      gesture.current.target = id;
      api.setLine(lineFor(kind, id, nextIntegrity));
    } else if (nextIntegrity <= 0 && kind !== 'tape') {
      api.setLine('The desktop gave up. Tape is the only undo.');
    }
  };

  const onDown = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    painting.current = true;
    gesture.current = { hurt: new Set(), target: undefined };
    last.current = null;
    stamp(event.clientX, event.clientY);
  };

  const onMove = (event) => {
    if (toyRef.current.tool) setCursor({ x: event.clientX, y: event.clientY });
    if (!painting.current) return;
    const point = localPoint(event.clientX, event.clientY);
    const prev = last.current;
    const gap = { smash: 46, stamp: 42, bugs: 24, paint: 18 }[toyRef.current.tool] || 14;
    if (prev && Math.hypot(point.x - prev.x, point.y - prev.y) < gap) return;
    stamp(event.clientX, event.clientY);
  };

  const onUp = () => {
    painting.current = false;
    last.current = null;
  };

  const tool = toy.tool;
  const mark = CURSORS[tool] || '🩹';

  return (
    <>
      <div className="toy-stage" ref={stageRef}>
        <canvas ref={persistRef} className="toy-canvas" />
        <canvas ref={fxRef} className="toy-canvas toy-canvas-fx" />
      </div>
      <div
        className={`toy-playfield${tool ? ' is-hot' : ''}`}
        onPointerDown={tool ? onDown : undefined}
        onPointerMove={tool ? onMove : undefined}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => setCursor(null)}
        onContextMenu={(event) => {
          if (tool) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      />
      {tool && cursor && (
        <div className="toy-cursor" style={{ left: cursor.x, top: cursor.y }}>{mark}</div>
      )}
    </>
  );
}
