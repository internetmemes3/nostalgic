'use client';
import { useState } from 'react';

const FAKE_FILES = [
  { icon: '📁', name: 'bag_of_holding', type: 'File Folder', size: '∞ KB', date: '01/01/2003' },
  { icon: '📁', name: 'definitely_not_a_rug', type: 'File Folder', size: '0 KB', date: '04/20/2069' },
  { icon: '📄', name: 'tokenomics.xls', type: 'Excel Meme Sheet', size: '420 KB', date: '06/09/2003' },
  { icon: '💰', name: 'dev_wallet.exe', type: 'Application', size: 'TRUST ME BRO', date: '01/01/1970' },
  { icon: '📄', name: 'whitepaper.doc', type: 'Word Document', size: '2 pages of vibes', date: '12/25/2002' },
  { icon: '🔒', name: 'liquidity.locked', type: 'Locked File', size: 'YES', date: '♾️' },
  { icon: '🎵', name: 'dial_up_sound.wav', type: 'Wave Sound', size: '69 KB', date: '03/15/1999' },
  { icon: '🖼️', name: 'chart_going_up.bmp', type: 'Bitmap Image', size: 'TO THE MOON', date: 'SOON™' },
  { icon: '🔮', name: 'crystal_ball.exe', type: 'Prophecy Engine', size: '∞', date: '01/01/2031' },
  { icon: '🎰', name: 'slot_machine.exe', type: 'Entertainment', size: '777 KB', date: '04/20/2003' },
  { icon: '📊', name: 'gains_calculator.xls', type: 'Copium Sheet', size: 'YES', date: 'DAILY' },
];

const WALLET_STATS = [
  { label: 'Token Name', value: 'Nostalgic' },
  { label: 'Ticker', value: '$NLGC' },
  { label: 'Chain', value: 'Solana (the fast one)' },
  { label: 'Total Supply', value: '1,000,000,000' },
  { label: 'Tax', value: '0% (we\'re not savages)' },
  { label: 'Liquidity', value: 'LOCKED (pinky promise)' },
  { label: 'Contract', value: 'CONTRACT_SOON' },
  { label: 'Vibe Check', value: '✅ PASSED' },
  { label: 'Rug Status', value: '❌ NOT TODAY SATAN' },
];

const PROPHECIES = [
  '🔮 The crystal ball says: "Your bags will be heavy, but your spirit heavier."',
  '🔮 Vision detected: A green candle so tall it breaks your monitor.',
  '🔮 Prophecy: You will explain $NLGC to your parents. They will not understand. Buy more anyway.',
  '🔮 The ball shows... someone is reading this RIGHT NOW and not buying. Disappointing.',
  '🔮 Future sight: In 2031, this coin will be taught in university. The course is called "Vibeonomics 101".',
  '🔮 WARNING: Crystal ball overheating from too much bullish energy.',
];

const SLOT_RESULTS = [
  { symbols: '🚀🚀🚀', msg: 'JACKPOT!! Three rockets! You are going to the moon! (emotionally, not financially. maybe financially. who knows.)' },
  { symbols: '🌕🌕🚀', msg: 'SO CLOSE! Two moons and a rocket. The universe is teasing you.' },
  { symbols: '💎🙌💎', msg: 'DIAMOND HANDS DETECTED. You physically cannot sell now. The slot machine has decided.' },
  { symbols: '📉📉📉', msg: 'Three charts down. This is just a buying opportunity. Copium reserves: FULL.' },
  { symbols: '🤡🤡🤡', msg: 'Three clowns. This is not about you. Or is it? No. Unless...?' },
  { symbols: '💰🔥💰', msg: 'Money, fire, money. This is either very good or very bad. We choose to believe good.' },
];

export default function MyComputer() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [slotResult, setSlotResult] = useState(null);

  const handleFileClick = (fileName) => {
    if (fileName === 'dev_wallet.exe') alert('ACCESS DENIED\n\nNice try, fren. The dev wallet is a myth.\nLike Bigfoot. But with more SOL.');
    else if (fileName === 'whitepaper.doc') alert('WHITEPAPER.DOC\n\n1. Make coin\n2. ???\n3. Profit\n\n[END OF DOCUMENT]');
    else if (fileName === 'dial_up_sound.wav') alert('🔊 BEEEE BOOO BRRRRR KSSSHHHH DINGDINGDING\n\n(imagine the dial-up sound here)');
    else if (fileName === 'chart_going_up.bmp') {
      document.body.classList.add('dramatic-zoom');
      setTimeout(() => document.body.classList.remove('dramatic-zoom'), 600);
      alert('📈 Cannot render image.\nChart is going UP too fast for your display.\n\nYour monitor is now permanently tilted upward.');
    }
    else if (fileName === 'tokenomics.xls') alert('TOKENOMICS.XLS\n\n100% of supply = vibes\n0% = dev wallet\nTax: 0%\nLP: Burned\n\nSource: trust me bro');
    else if (fileName === 'bag_of_holding') alert('📁 Opening folder...\n\n📂 bag_of_holding/\n  └── more_bags/\n       └── even_more_bags/\n            └── inception_bags/\n                 └── README.txt: "you are in too deep"');
    else if (fileName === 'definitely_not_a_rug') alert('📁 Opening folder...\n\nThis folder is EMPTY.\n\nSee? Not a rug. Told you.\nStop being suspicious.\nWe are offended, honestly.');
    else if (fileName === 'liquidity.locked') {
      document.body.classList.add('screen-shake');
      setTimeout(() => document.body.classList.remove('screen-shake'), 500);
      alert('🔒 ACCESS DENIED\n\nThis file is LOCKED. Like the liquidity.\nLike your diamond hands.\nLike this joke. It\'s locked in.');
    }
    else if (fileName === 'crystal_ball.exe') {
      const prophecy = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
      alert(prophecy);
    }
    else if (fileName === 'slot_machine.exe') {
      const result = SLOT_RESULTS[Math.floor(Math.random() * SLOT_RESULTS.length)];
      setSlotResult(result);
      setTimeout(() => setSlotResult(null), 5000);
    }
    else if (fileName === 'gains_calculator.xls') {
      const bought = Math.floor(Math.random() * 1000000);
      const price = (Math.random() * 0.001).toFixed(8);
      const futurePrice = (Math.random() * 100).toFixed(2);
      alert(`📊 GAINS CALCULATOR v4.20\n\nTokens: ${bought.toLocaleString()} $NLGC\nEntry price: $${price}\nFuture price: $${futurePrice} (source: vibes)\n\nProjected gains: $${(bought * parseFloat(futurePrice)).toLocaleString()}\n\n⚠️ This calculator is not responsible for\nthe dopamine hit you just received.`);
    }
  };

  const runVirusScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setScanning(false);
      setScanResult('✅ Scan complete. 0 viruses found.\n69 memes detected. 420 vibes catalogued.\nYour system is CLEAN and BULLISH.');
      setTimeout(() => setScanResult(null), 4000);
    }, 3000);
  };

  return (
    <div style={{ width: '580px', maxWidth: '90vw' }}>
      {/* Slot Machine Result */}
      {slotResult && (
        <div className="absolute top-2 right-2 z-50 bg-[#ffffcc] border-2 border-[#ff6600] p-3 shadow-md" style={{ maxWidth: '240px', fontFamily: "'VT323', monospace" }}>
          <div className="text-center text-[28px] mb-1">{slotResult.symbols}</div>
          <div className="text-[11px] text-black">{slotResult.msg}</div>
          <button className="win95-button text-[9px] px-2 mt-1 block mx-auto" onClick={() => setSlotResult(null)}>Nice</button>
        </div>
      )}
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 border-b border-[#808080] text-[13px]">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer">Go to Moon</span>
        <span className="hover:underline cursor-pointer" onClick={runVirusScan}>🛡️ Scan</span>
        <span className="hover:underline cursor-pointer">Help (lol)</span>
      </div>
      {/* Virus Scan Progress */}
      {scanning && (
        <div className="px-2 py-1 bg-[#ffffcc] border-b border-[#808080] text-[11px]">
          <div className="mb-1">🛡️ Norton AntiRug is scanning your files...</div>
          <div className="w-full h-[14px] bg-white border border-[#808080]" style={{ boxShadow: 'inset 1px 1px #808080' }}>
            <div className="fake-progress-fill" />
          </div>
        </div>
      )}
      {scanResult && (
        <div className="px-2 py-1 bg-[#ccffcc] border-b border-[#808080] text-[11px] whitespace-pre-line">
          {scanResult}
        </div>
      )}

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-[#808080]">
        <span className="text-[12px] font-bold">Address:</span>
        <div className="flex-1 bg-white border border-[#808080] px-1 text-[12px]"
          style={{ boxShadow: 'inset 1px 1px #0a0a0a' }}>
          C:\My_Bags\$NLGC\to_the_moon
        </div>
      </div>

      {/* Wallet Stats Panel */}
      <div className="p-2 border-b border-[#808080]">
        <div className="text-[13px] font-bold mb-1">📊 System Properties — Wallet Overview</div>
        <div className="bg-white border p-2" style={{ boxShadow: 'inset 1px 1px #808080' }}>
          <table className="w-full text-[12px]">
            <tbody>
              {WALLET_STATS.map((stat, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#f0f0f0]' : ''}>
                  <td className="py-[2px] px-1 font-bold text-[#000080]">{stat.label}:</td>
                  <td className="py-[2px] px-1">{stat.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* File Explorer */}
      <div className="p-1">
        <div className="bg-white border" style={{ boxShadow: 'inset 1px 1px #808080' }}>
          {/* Column Headers */}
          <div className="flex border-b border-[#808080] bg-[#c0c0c0] text-[11px] font-bold">
            <div className="flex-1 px-2 py-[2px] border-r border-[#808080]">Name</div>
            <div className="w-[100px] px-2 py-[2px] border-r border-[#808080]">Type</div>
            <div className="w-[100px] px-2 py-[2px] border-r border-[#808080]">Size</div>
            <div className="w-[80px] px-2 py-[2px]">Date</div>
          </div>
          {/* Files */}
          {FAKE_FILES.map((file, i) => (
            <div key={i}
              className="flex text-[12px] hover:bg-[#000080] hover:text-white cursor-pointer"
              onClick={() => handleFileClick(file.name)}
            >
              <div className="flex-1 px-2 py-[1px] flex items-center gap-1">
                <span>{file.icon}</span> {file.name}
              </div>
              <div className="w-[100px] px-2 py-[1px]">{file.type}</div>
              <div className="w-[100px] px-2 py-[1px]">{file.size}</div>
              <div className="w-[80px] px-2 py-[1px]">{file.date}</div>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-[#808080] px-1 pt-1">
          {FAKE_FILES.length} object(s) — 420.69 MB free — Disk space is a social construct
        </div>
      </div>
    </div>
  );
}
