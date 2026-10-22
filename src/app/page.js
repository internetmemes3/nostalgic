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
import DoNotClick from '../../components/windows/DoNotClick';
import ToyBox from '../../components/windows/ToyBox';
import { DesktopBrand, DesktopWreck, ToyProvider } from '../../components/ToyPlay';
import { CONTRACT_LABEL, LINKS, openExternal } from '../../lib/site';
import Clippy from '../../components/Clippy';
import GagPopups from '../../components/GagPopups';
import HitCounter from '../../components/HitCounter';
import NostalgicToolbar from '../../components/NostalgicToolbar';
import Screensaver from '../../components/Screensaver';

const WINDOW_DEFS = {
  mycomputer: { title: 'My Computer', short: 'My Computer', icon: '/icons/mycomputer.jpg', component: MyComputer },
  internet: { title: 'Internet Exploder — the good web', short: 'Internet Exploder', icon: '/icons/internet.png', component: InternetExploder },
  msdank: { title: 'Nostalgic Paint — connecting_to_the_past.bmp', short: 'Nostalgic Paint', icon: '/icons/paint.png', component: MSDank },
  recycle: { title: 'Recycle Bin', short: 'Recycle Bin', icon: '/icons/recycle.png', component: RecycleBin },
  minesweeper: { title: 'Minesweeper', short: 'Minesweeper', icon: '/icons/minesweeper.png', component: Minesweeper },
  notepad: { title: 'Notepad — note_to_the_future.txt', short: 'Notepad', icon: '/icons/notepad.png', component: Notepad },
  coin: { title: 'Nostalgic — System Information', short: 'Nostalgic', icon: '/icons/logo.png', component: CoinInfoPanel },
  donotclick: { title: 'DO NOT CLICK', short: 'DO NOT CLICK', icon: '🚫', component: DoNotClick },
  toys: { title: 'Toy Box', short: 'Toy Box', icon: '🧰', component: ToyBox },
};

const DESKTOP_ICONS = [
  { id: 'mycomputer', icon: '/icons/mycomputer.jpg', label: 'My Computer' },
  { id: 'donotclick', icon: '🚫', label: 'DO NOT\nCLICK' },
  { id: 'coin', icon: '/icons/logo.png', label: 'Nostalgic' },
  { id: 'internet', icon: '/icons/internet.png', label: 'Internet\nExploder' },
  { id: 'toys', icon: '🧰', label: 'Toy Box' },
  { id: 'recycle', icon: '/icons/recycle.png', label: 'Recycle Bin' },
  { id: 'msdank', icon: '/icons/paint.png', label: 'Paint' },
  { id: 'minesweeper', icon: '/icons/minesweeper.png', label: 'Minesweeper' },
  { id: 'notepad', icon: '/icons/notepad.png', label: 'Notepad' },
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
        <div className="text-center mb-3">
          <img src="/icons/logo.png" alt="Nostalgic" style={{ width: 92, height: 'auto', margin: '0 auto 6px' }} draggable="false" />
          <div className="text-[16px] font-bold text-[#000080]">Nostalgic</div>
          <div className="text-[11px] text-[#404040]">$NLGC on Solana · NostalgicOS 98 System Information</div>
        </div>

          <div className="bg-white border p-2 mb-2 text-[12px]" style={{ boxShadow: 'inset 1px 1px #808080' }}>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-[#e0e0e0]">
                  <td className="py-1 font-bold text-[#000080] w-[140px]">Token Name:</td>
                  <td className="py-1">Nostalgic</td>
                </tr>
                <tr className="border-b border-[#e0e0e0] bg-[#f8f8f8]">
                  <td className="py-1 font-bold text-[#000080]">Ticker:</td>
                  <td className="py-1 font-bold">$NLGC</td>
                </tr>
                <tr className="border-b border-[#e0e0e0]">
                  <td className="py-1 font-bold text-[#000080]">Blockchain:</td>
                  <td className="py-1">Solana</td>
                </tr>
                <tr className="border-b border-[#e0e0e0]">
                  <td className="py-1 font-bold text-[#000080]">Total Supply:</td>
                  <td className="py-1">1,000,000,000</td>
                </tr>
                <tr className="border-b border-[#e0e0e0]">
                  <td className="py-1 font-bold text-[#000080]">Liquidity:</td>
                  <td className="py-1">Burned 🔥</td>
                </tr>
                <tr className="border-b border-[#e0e0e0] bg-[#f8f8f8]">
                  <td className="py-1 font-bold text-[#000080]">Contract:</td>
                  <td className="py-1 break-all text-[11px]">{CONTRACT_LABEL}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* How to Buy */}
          <div className="bg-[#ffffcc] border border-[#808080] p-2 mb-2 text-[12px]">
            <div className="font-bold text-[#800000] mb-1">📋 How to Buy:</div>
            <div className="text-[11px] space-y-1">
              <div>1. Install Wallet</div>
              <div>2. Get SOL</div>
              <div>3. Go to a Dex </div>
              <div>4. Paste contract address & swap</div>
              <div>5. Welcome to the club 🤝</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-2 justify-center flex-wrap">
            {LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="win95-button px-3 py-1 text-[12px]"
                onClick={() => openExternal(item.href)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showSaver, setShowSaver] = useState(false);
  const [toolbar, setToolbar] = useState(0);
  const [toolbarNote, setToolbarNote] = useState('');
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

  const finishBoot = useCallback(() => setBooted(true), []);

  useEffect(() => {
    if (!booted) return undefined;
    let seen = false;
    try { seen = sessionStorage.getItem('nostalgicos-welcomed') === '1'; } catch (e) { /* private mode */ }
    if (seen) return undefined;
    const timer = setTimeout(() => {
      setShowWelcome(true);
      try { sessionStorage.setItem('nostalgicos-welcomed', '1'); } catch (e) { /* private mode */ }
    }, 400);
    return () => clearTimeout(timer);
  }, [booted]);

  useEffect(() => {
    if (!booted || showWelcome) return undefined;
    let seen = false;
    try { seen = sessionStorage.getItem('nostalgicos-welcomed') === '1'; } catch (e) { /* private mode */ }
    if (!seen) return undefined;
    const clippyTimer = setTimeout(() => setShowClippy(true), 20000);
    return () => clearTimeout(clippyTimer);
  }, [booted, showWelcome]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setStartOpen(false);
        setContextMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onInstall = () => setToolbar((n) => (n === 0 ? 1 : n));
    window.addEventListener('install-toolbar', onInstall);
    return () => window.removeEventListener('install-toolbar', onInstall);
  }, []);

  const uninstallToolbar = () => {
    if (toolbar < 2) {
      setToolbar(2);
      setToolbarNote('Uninstall failed. PLUS moved in. It does the weather now.');
    } else {
      setToolbar(0);
      setToolbarNote('');
    }
  };

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
    if (id === 'screensaver') {
      setShowSaver(true);
      return;
    }
    if (id === 'shutdown') {
      if (confirm('Shut down NostalgicOS 98?\n\n(Just kidding. Stay a minute. The modem just connected.)')) {
        document.body.innerHTML = '<div style="background:#008080;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:Tahoma,sans-serif;font-size:20px;text-align:center;padding:24px">It is now safe to turn off<br>your computer.<br><br><span style="font-size:13px">NostalgicOS 98 · refresh to reconnect</span></div>';
      }
      return;
    }
    openWindow(id);
  };

  const handleTaskbarWindowClick = (id) => {
    setStartOpen(false);
    if (minimized[id]) {
      setMinimized(prev => ({ ...prev, [id]: false }));
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const showDesktop = useCallback(() => {
    const anyOpen = windowOrder.some((id) => windows[id] && !minimized[id]);
    if (anyOpen) {
      setMinimized((prev) => {
        const next = { ...prev };
        windowOrder.forEach((id) => {
          if (windows[id]) next[id] = true;
        });
        return next;
      });
      setActiveWindowId(null);
    } else {
      setMinimized({});
      const last = [...windowOrder].reverse().find((id) => windows[id]);
      if (last) setActiveWindowId(last);
    }
    setStartOpen(false);
  }, [windowOrder, windows, minimized]);

  if (!booted) {
    return <BootScreen onComplete={finishBoot} />;
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
          <p className="mb-4">* Press any key to return to the NostalgicOS 98 desktop</p>
          <p className="mb-4">* Press CTRL+ALT+DEL to pretend this never happened</p>
          <p className="mb-4">You will lose any unsaved gains in all portfolios.</p>
          <p className="mb-2">Press any key to continue <span className="blink">_</span></p>
          <p className="text-[12px] text-[#8888ff] mt-8">
            NLGC_KERNEL_PANIC - BAGS_TOO_HEAVY_ERROR<br/>
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
      title: WINDOW_DEFS[id]?.short || WINDOW_DEFS[id]?.title || id,
      icon: WINDOW_DEFS[id]?.icon,
      active: activeWindowId === id && !minimized[id],
    }));

  const toysLive = !!windows.toys && !minimized.toys;

  return (
    <ToyProvider live={toysLive}>
    <div className={`relative h-screen w-screen overflow-hidden${toolbar ? ' has-toolbar' : ''}`}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      <div className="absolute inset-0" style={{ background: '#008080' }}>
        <DesktopBrand />
      </div>

      <HitCounter />
      <DesktopWreck />

      <div className="desktop-icons">
        {DESKTOP_ICONS.map(icon => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
          />
        ))}
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
            icon={def.icon}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onFocus={() => focusWindow(id)}
            zIndex={zIdx}
            isActive={activeWindowId === id}
            defaultPos={id === 'toys' ? { x: Math.max(16, window.innerWidth - 400), y: Math.max(8, window.innerHeight - 390) } : undefined}
          >
            <Component />
          </Window>
        );
      })}

      {/* Welcome Popup */}
      {showWelcome && (
        <Window
          id="welcome"
          title="Welcome to NostalgicOS 98"
          icon="/icons/logo.png"
          dialog
          onClose={() => setShowWelcome(false)}
          onFocus={() => {}}
          zIndex={9000}
          isActive={true}
          defaultPos={{ x: Math.max(48, (typeof window !== 'undefined' ? window.innerWidth / 2 - 230 : 280)), y: Math.max(36, (typeof window !== 'undefined' ? window.innerHeight / 2 - 150 : 160)) }}
        >
          <div className="p-3" style={{ width: '440px', maxWidth: '86vw' }}>
            <div className="flex gap-3 mb-3">
              <img src="/icons/logo.png" alt="" width={72} height={72} draggable="false" style={{ width: 72, height: 72, objectFit: 'contain' }} />
              <div className="text-[12px] leading-snug">
                <p className="font-bold mb-1">You are connected. Unfortunately.</p>
                <p className="mb-2">This computer has been online since 1999. It has the toolbars to prove it.</p>
                <ul className="space-y-[2px] ml-4">
                  <li>• There is an icon that says DO NOT CLICK. That is how the toolbar got in last time.</li>
                  <li>• The Toy Box works on the desktop. Fire, scissors, a hammer, paint, a stamp, termites, and tape.</li>
                  <li>• The hit counter is lying. The webmaster does this.</li>
                  <li>• $NLGC is the coin that remembers all of it.</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-2 flex-wrap">
              <button className="win95-button px-3 py-1 text-[12px] font-bold"
                onClick={() => { setShowWelcome(false); openWindow('donotclick'); }}>
                DO NOT CLICK
              </button>
              <button className="win95-button px-3 py-1 text-[12px]"
                onClick={() => { setShowWelcome(false); openWindow('toys'); }}>
                Open the toy box
              </button>
              <button className="win95-button px-3 py-1 text-[12px]"
                onClick={() => setShowWelcome(false)}>
                I&apos;ll behave
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
          onScreensaver={() => setShowSaver(true)}
          onInstall={() => setToolbar((n) => (n === 0 ? 1 : n))}
        />
      )}

      {/* Start Menu */}
      {startOpen && (
        <StartMenu onItemClick={handleStartItemClick} />
      )}

      <GagPopups
        active={!showWelcome}
        onToys={() => openWindow('toys')}
        onInstall={() => setToolbar((n) => (n === 0 ? 1 : n))}
      />

      {toolbar > 0 && (
        <NostalgicToolbar level={toolbar} note={toolbarNote} onUninstall={uninstallToolbar} />
      )}

      {showSaver && <Screensaver onClose={() => setShowSaver(false)} />}

      {/* Clippy */}
      {showClippy && <Clippy onClose={() => setShowClippy(false)} />}

      {/* Taskbar */}
      <Taskbar
        onStartClick={() => { setStartOpen(prev => !prev); setContextMenu(null); }}
        startOpen={startOpen}
        openWindows={taskbarWindows}
        onWindowClick={handleTaskbarWindowClick}
        onShowDesktop={showDesktop}
      />
    </div>
    </ToyProvider>
  );
}
