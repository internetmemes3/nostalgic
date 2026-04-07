'use client';

import { useState, useEffect, useCallback } from 'react';
import BootScreen from '../../components/BootScreen';
import DesktopIcon from '../../components/DesktopIcon';
import Window from '../../components/Window';
import Taskbar from '../../components/Taskbar';
import StartMenu from '../../components/StartMenu';
import ContextMenu from '../../components/ContextMenu';
import MyComputer from '../../components/windows/MyComputer';
import InternetExploder from '../../components/windows/InternetExploder';
import MSDank from '../../components/windows/MSDank';
import RecycleBin from '../../components/windows/RecycleBin';
import Minesweeper from '../../components/windows/Minesweeper';
import Notepad from '../../components/windows/Notepad';
import Clippy from '../../components/Clippy';

const WINDOW_DEFS = {
  mycomputer: { title: 'My Computer - C:\\My_Bags\\$NOSTALGIC', component: MyComputer },
  internet: { title: 'Internet Exploder 4.0 - $NOSTALGIC Fan Page', component: InternetExploder },
  msdank: { title: 'MS Dank - masterpiece.bmp', component: MSDank },
  recycle: { title: 'Recycle Bin - Rugged & Forgotten', component: RecycleBin },
  minesweeper: { title: 'Minesweeper - Crypto Edition', component: Minesweeper },
  notepad: { title: 'Notepad - untitled.txt', component: Notepad },
  coin: { title: '$NOSTALGIC — System Information', component: CoinInfoPanel },
};

const DESKTOP_ICONS = [
  { id: 'mycomputer', icon: '/icons/mycomputer.jpg', label: 'My Computer' },
  { id: 'internet', icon: '/icons/internet.png', label: 'Internet\nExploder' },
  { id: 'msdank', icon: '/icons/paint.png', label: 'MS Dank' },
  { id: 'recycle', icon: '/icons/recycle.png', label: 'Recycle Bin' },
  { id: 'minesweeper', icon: '/icons/minesweeper.png', label: 'Minesweeper' },
  { id: 'notepad', icon: '/icons/notepad.png', label: 'Notepad' },
  { id: 'coin', icon: '/icons/logo.png', label: '$NOSTALGIC\nInfo' },
];

function CoinInfoPanel() {
  return (
    <div style={{ width: '460px', maxWidth: '90vw' }}>
      <div className="p-3">
        {/* Tabs */}
        <div className="flex gap-0 mb-[-1px] relative z-10">
          {['General', 'Tokenomics', 'Socials'].map((tab, i) => (
            <div key={tab}
              className={`px-3 py-1 text-[12px] border border-[#808080] cursor-pointer ${i === 0 ? 'bg-[#c0c0c0] border-b-[#c0c0c0] font-bold' : 'bg-[#a0a0a0]'}`}
              onClick={() => { if (i !== 0) alert('All the info is right here, fren. Stop clicking tabs.'); }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Content Panel */}
        <div className="border border-[#808080] p-3 bg-[#c0c0c0]">
          {/* Logo Area */}
          <div className="text-center mb-3">
            <div className="text-[24px] font-bold text-[#000080]" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '16px' }}>
              $NOSTALGIC
            </div>
            <div className="text-[11px] text-[#808080]">NostalgicOS 97 — System Information</div>
          </div>

          <div className="bg-white border p-2 mb-2 text-[12px]" style={{ boxShadow: 'inset 1px 1px #808080' }}>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-[#e0e0e0]">
                  <td className="py-1 font-bold text-[#000080] w-[140px]">Token Name:</td>
                  <td className="py-1">$NOSTALGIC</td>
                </tr>
                <tr className="border-b border-[#e0e0e0] bg-[#f8f8f8]">
                  <td className="py-1 font-bold text-[#000080]">Blockchain:</td>
                  <td className="py-1">Solana</td>
                </tr>
                <tr className="border-b border-[#e0e0e0]">
                  <td className="py-1 font-bold text-[#000080]">Total Supply:</td>
                  <td className="py-1">1,000,000,000</td>
                </tr>
                <tr className="border-b border-[#e0e0e0] bg-[#f8f8f8]">
                  <td className="py-1 font-bold text-[#000080]">Tax:</td>
                  <td className="py-1">0/0 (Buy/Sell)</td>
                </tr>
                <tr className="border-b border-[#e0e0e0]">
                  <td className="py-1 font-bold text-[#000080]">Liquidity:</td>
                  <td className="py-1">Burned 🔥</td>
                </tr>
                <tr className="border-b border-[#e0e0e0] bg-[#f8f8f8]">
                  <td className="py-1 font-bold text-[#000080]">Contract:</td>
                  <td className="py-1 break-all text-[11px]">PASTE_CONTRACT_ADDRESS_HERE</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* How to Buy */}
          <div className="bg-[#ffffcc] border border-[#808080] p-2 mb-2 text-[12px]">
            <div className="font-bold text-[#800000] mb-1">📋 How to Buy:</div>
            <div className="text-[11px] space-y-1">
              <div>1. Install Phantom Wallet</div>
              <div>2. Buy SOL on an exchange → send to Phantom</div>
              <div>3. Go to Jupiter (jup.ag) or Raydium</div>
              <div>4. Paste contract address & swap</div>
              <div>5. Welcome to the club 🤝</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-2 justify-center flex-wrap">
            <button className="win95-button px-3 py-1 text-[12px]"
              onClick={() => window.open('https://x.com/PLACEHOLDER', '_blank')}>
              🐦 Twitter/X
            </button>
            <button className="win95-button px-3 py-1 text-[12px]"
              onClick={() => window.open('https://t.me/PLACEHOLDER', '_blank')}>
              💬 Telegram
            </button>
            <button className="win95-button px-3 py-1 text-[12px]"
              onClick={() => window.open('https://dexscreener.com/PLACEHOLDER', '_blank')}>
              📊 Dexscreener
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState({});
  const [windowOrder, setWindowOrder] = useState([]);
  const [minimized, setMinimized] = useState({});
  const [startOpen, setStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [nextZ, setNextZ] = useState(100);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [showClippy, setShowClippy] = useState(false);
  const [blueScreened, setBlueScreened] = useState(false);

  // Show a welcome popup after boot
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (booted) {
      const timer = setTimeout(() => setShowWelcome(true), 500);
      const clippyTimer = setTimeout(() => setShowClippy(true), 30000);
      return () => { clearTimeout(timer); clearTimeout(clippyTimer); };
    }
  }, [booted]);

  const openWindow = useCallback((id) => {
    setStartOpen(false);
    setContextMenu(null);
    if (windows[id] && !minimized[id]) {
      // Focus it
      setActiveWindowId(id);
      setNextZ(z => z + 1);
      setWindowOrder(prev => [...prev.filter(w => w !== id), id]);
      return;
    }
    if (minimized[id]) {
      setMinimized(prev => ({ ...prev, [id]: false }));
      setActiveWindowId(id);
      setNextZ(z => z + 1);
      setWindowOrder(prev => [...prev.filter(w => w !== id), id]);
      return;
    }
    setWindows(prev => ({ ...prev, [id]: true }));
    setWindowOrder(prev => [...prev, id]);
    setActiveWindowId(id);
    setNextZ(z => z + 1);
  }, [windows, minimized]);

  const closeWindow = useCallback((id) => {
    setWindows(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setWindowOrder(prev => prev.filter(w => w !== id));
    setMinimized(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id) => {
    setMinimized(prev => ({ ...prev, [id]: true }));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const focusWindow = useCallback((id) => {
    setActiveWindowId(id);
    setNextZ(z => z + 1);
    setWindowOrder(prev => [...prev.filter(w => w !== id), id]);
    setStartOpen(false);
  }, []);

  const handleDesktopClick = () => {
    setStartOpen(false);
    setContextMenu(null);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setStartOpen(false);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleStartItemClick = (id) => {
    setStartOpen(false);
    if (id === 'shutdown') {
      if (confirm('It is now safe to turn off your computer.\n\n(Just kidding, please stay and buy $NOSTALGIC)')) {
        document.body.innerHTML = '<div style="background:#000080;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:VT323,monospace;font-size:24px;text-align:center">It is now safe to turn off<br>your computer.<br><br><span style="font-size:14px">(refresh to reboot into $NOSTALGIC)</span></div>';
      }
      return;
    }
    openWindow(id);
  };

  const handleTaskbarWindowClick = (id) => {
    if (minimized[id]) {
      setMinimized(prev => ({ ...prev, [id]: false }));
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  // Boot screen
  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  // BSOD easter egg
  if (blueScreened) {
    return (
      <div className="fixed inset-0 bg-[#000080] z-[99999] flex items-center justify-center p-12"
        onClick={() => setBlueScreened(false)}
        style={{ cursor: 'none', fontFamily: "'VT323', 'Courier New', monospace" }}>
        <div className="text-white max-w-[600px] text-[16px] leading-relaxed">
          <p className="mb-4">A fatal exception 0x0420069 has occurred at 0028:C0FF33EE in VxD MOON(01) +
          00000000. The current application will be terminated.</p>
          <p className="mb-4">* Press any key to return to $NOSTALGIC desktop</p>
          <p className="mb-4">* Press CTRL+ALT+DEL to pretend this never happened</p>
          <p className="mb-4">You will lose any unsaved gains in all portfolios.</p>
          <p className="mb-2">Press any key to continue <span className="blink">_</span></p>
          <p className="text-[12px] text-[#8888ff] mt-8">
            NOSTALGIC_KERNEL_PANIC - BAGS_TOO_HEAVY_ERROR<br/>
            Error Code: 0xDEADBEEF<br/>
            Module: hopium.sys<br/>
            Description: System ran out of copium. Please install more hopium.<br/><br/>
            Technical information: *** STOP: 0x00000069 (click anywhere to dismiss this is not real we promise)
          </p>
        </div>
      </div>
    );
  }

  const taskbarWindows = windowOrder
    .filter(id => windows[id])
    .map(id => ({
      id,
      title: WINDOW_DEFS[id]?.title?.split(' - ')[0] || id,
      active: activeWindowId === id && !minimized[id],
    }));

  return (
    <div className="h-screen w-screen overflow-hidden scanlines"
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Background - teal with a watermark */}
      <div className="absolute inset-0" style={{ background: '#008080', paddingBottom: '40px' }}>
        {/* Wallpaper placeholder - absurd tiled pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)`,
          }}
        />
        {/* Watermark */}
        <div className="absolute bottom-12 right-4 text-[11px] text-white/30 text-right pointer-events-none select-none">
          NostalgicOS 97<br />
          Evaluation Copy. Build 4.20.69<br />
          PASTE_CONTRACT_ADDRESS_HERE
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute left-2 top-2 z-[1]" style={{ paddingBottom: '50px' }}>
        <div className="grid grid-cols-1 gap-1">
          {DESKTOP_ICONS.map(icon => (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={icon.label}
              onClick={() => openWindow(icon.id)}
              isActive={activeWindowId === icon.id}
            />
          ))}
        </div>
      </div>

      {/* Windows */}
      {windowOrder.map((id, orderIndex) => {
        if (!windows[id] || minimized[id]) return null;
        const def = WINDOW_DEFS[id];
        if (!def) return null;
        const Component = def.component;
        const zIdx = 100 + orderIndex;
        return (
          <Window
            key={id}
            id={id}
            title={def.title}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onFocus={() => focusWindow(id)}
            zIndex={zIdx}
            isActive={activeWindowId === id}
          >
            <Component />
          </Window>
        );
      })}

      {/* Welcome Popup */}
      {showWelcome && (
        <Window
          id="welcome"
          title="welcome.exe — IMPORTANT!!!"
          onClose={() => setShowWelcome(false)}
          onFocus={() => {}}
          zIndex={9000}
          isActive={true}
          defaultPos={{ x: Math.max(60, (typeof window !== 'undefined' ? window.innerWidth / 2 - 200 : 300)), y: Math.max(40, (typeof window !== 'undefined' ? window.innerHeight / 2 - 120 : 200)) }}
        >
          <div className="p-3" style={{ width: '380px', maxWidth: '85vw' }}>
            <div className="flex gap-3 mb-3">
              <div className="text-[48px]">⚠️</div>
              <div className="text-[13px]">
                <p className="font-bold text-[#800000] mb-1">WARNING: You have entered the $NOSTALGIC zone.</p>
                <p className="mb-1">Side effects may include:</p>
                <ul className="text-[12px] space-y-[2px] ml-4">
                  <li>• Uncontrollable urge to buy the dip</li>
                  <li>• Nostalgia for an internet you barely remember</li>
                  <li>• Sending this site to everyone you know</li>
                  <li>• Diamond hands syndrome (incurable)</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <button className="win95-button px-6 py-1 text-[13px] font-bold"
                onClick={() => { setShowWelcome(false); openWindow('coin'); }}>
                Show me the coin 🪙
              </button>
              <button className="win95-button px-4 py-1 text-[13px]"
                onClick={() => setShowWelcome(false)}>
                I understand the risks
              </button>
            </div>
          </div>
        </Window>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpenWindow={openWindow}
          onClippy={() => setShowClippy(true)}
          onBSOD={() => setBlueScreened(true)}
        />
      )}

      {/* Start Menu */}
      {startOpen && (
        <StartMenu onItemClick={handleStartItemClick} />
      )}

      {/* Clippy */}
      {showClippy && <Clippy onClose={() => setShowClippy(false)} />}

      {/* Taskbar */}
      <Taskbar
        onStartClick={() => { setStartOpen(prev => !prev); setContextMenu(null); }}
        startOpen={startOpen}
        openWindows={taskbarWindows}
        onWindowClick={handleTaskbarWindowClick}
      />
    </div>
  );
}
