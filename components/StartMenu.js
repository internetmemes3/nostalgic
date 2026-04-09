'use client';
import { useState } from 'react';

const PROGRAMS = [
  { id: 'mycomputer', icon: '/icons/mycomputer.jpg', label: 'My Computer' },
  { id: 'internet', icon: '/icons/internet.png', label: 'Internet Exploder' },
  { id: 'msdank', icon: '/icons/paint.png', label: 'MS Dank' },
  { id: 'notepad', icon: '/icons/notepad.png', label: 'note_to_the_future.txt' },
  { id: 'minesweeper', icon: '/icons/minesweeper.png', label: 'Minesweeper' },
  { id: 'recycle', icon: '/icons/recycle.png', label: 'Recycle Bin' },
];

const SILLY_PROGRAMS = [
  { icon: '📞', label: 'Dial-Up Connector', action: () => alert('🔊 BEEEE BOOO BRRRRR KSSSHHHH DINGDINGDING\n\nConnecting to the internet...\n\nSpeed: 56kbps (on a good day)\n\n⚠️ WARNING: Someone is trying to call the house. Connection will be lost.') },
  { icon: '🧮', label: 'Portfolio Calculator', action: () => alert('PORTFOLIO CALCULATOR v1.0\n\nCalculating your gains...\n\n...\n...\n\nResult: ✨ INCALCULABLE ✨\n\n(this calculator only goes up)') },
  { icon: '🦠', label: 'Norton AntiRug 2003', action: () => alert('🛡️ NORTON ANTIRUG 2003\n\nScanning for rugs...\n\nC:\\definitely_not_a_rug.exe — CLEAN ✅\nC:\\trust_me_bro.dll — CLEAN ✅\nSummary: Your bags are safe. Probably. We are not liable.') },
  { icon: '🗺️', label: 'Roadmap.exe', action: () => alert('LOADING ROADMAP...\n\n❌ Error: File not found.\n\nThe roadmap was last seen heading north.\nIf found, please return to $NLGC headquarters\n(which is someone\'s basement).') },
  { icon: '🎰', label: 'luck_check.exe', action: () => { const outcomes = ['You will 100x by Friday. (not financial advice)', 'A mysterious whale is watching your wallet. Stay calm.', 'Your next trade will be legendary. Or terrible. 50/50.', 'The stars say: BUY. The stars are not financial advisors.', 'You will find a forgotten wallet with 0.001 SOL. Life changing.', 'A dev will follow you on Twitter today. This means nothing.']; alert('🔮 LUCK CHECK v4.20\n\n' + outcomes[Math.floor(Math.random() * outcomes.length)]); }},
  { icon: '🪩', label: 'party.exe', action: () => { document.body.classList.add('rave-mode'); const emojis = ['🚀','🌕','💎','💰','✨','🔥']; for(let i=0;i<20;i++){const el=document.createElement('div');el.className='float-emoji';el.textContent=emojis[Math.floor(Math.random()*emojis.length)];el.style.left=Math.random()*window.innerWidth+'px';el.style.top=(window.innerHeight*0.3+Math.random()*window.innerHeight*0.5)+'px';el.style.animationDelay=(Math.random()*1)+'s';document.body.appendChild(el);setTimeout(()=>el.remove(),2500);} setTimeout(()=>document.body.classList.remove('rave-mode'),2000); }},
  { icon: '🔄', label: 'screen_flip.exe', action: () => { document.body.style.transition='transform 1s';document.body.style.transform='scaleY(-1)';setTimeout(()=>{document.body.style.transform='none';setTimeout(()=>{document.body.style.transition='';},500);},2000); }},
  { icon: '💾', label: 'download_more_ram.exe', action: () => { const w=window.open('','','width=340,height=120');if(w){w.document.write('<html><head><title>Downloading RAM...</title></head><body style="background:#c0c0c0;font-family:VT323,monospace;padding:15px"><b>Downloading 69GB of RAM...</b><br><br><div style="border:2px inset #808080;height:18px;background:#fff"><div style="height:100%;background:linear-gradient(90deg,#000080,#0000cc);animation:fill 3s ease-in-out forwards"></div></div><style>@keyframes fill{from{width:0}to{width:100%}}</style><br><span id="s">Please wait...</span><script>setTimeout(function(){document.getElementById("s").textContent="\u2705 Complete! Your computer now has 69GB more RAM. (It doesn\'t.)"}, 3000);<\/script></body></html>'); } }},
];

export default function StartMenu({ onItemClick }) {
  const [showPrograms, setShowPrograms] = useState(false);
  const [runText, setRunText] = useState('');
  const [showRun, setShowRun] = useState(false);

  const handleRun = () => {
    const cmd = runText.toLowerCase().trim();
    if (cmd === '' || cmd === 'moon') {
      alert('🚀 Launching moon sequence...\n\n...\n\nJust kidding. But $NLGC IS going to the moon.\nThis is a fact and not speculation.');
    } else if (cmd === 'help') {
      alert('AVAILABLE COMMANDS:\n\nmoon — go to the moon\nlambo — check lambo status\nrug — ???\ngm — say gm\nwagmi — confirm wagmi\n\nAll other commands will be interpreted as bullish.');
    } else if (cmd === 'lambo') {
      alert('🏎️ LAMBO STATUS CHECK\n\nChecking current portfolio value...\nChecking Lambo dealership prices...\n\nResult: You can currently afford 0.0003 Lamborghinis.\n\nKeep holding.');
    } else if (cmd === 'rug') {
      alert('⚠️ ACCESS DENIED\n\nThe command "rug" has been permanently disabled.\nThis is a rug-free zone.\nPlease touch grass and try again.');
    } else if (cmd === 'gm') {
      alert('☀️ gm\n\ngm to you too fren.\n\nAnother beautiful day to hold $NLGC.');
    } else if (cmd === 'wagmi') {
      alert('✅ WAGMI CONFIRMED\n\nAll systems indicate: We Are Gonna Make It.\n\nThis message was approved by the vibes department.');
    } else {
      alert(`Running "${runText}"...\n\n❌ '${runText}' is not recognized as an internal\nor external command, operable program, or batch file.\n\nBut we appreciate the enthusiasm. Very bullish.`);
    }
    setShowRun(false);
    setRunText('');
  };

  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="flex">
        {/* Sidebar */}
        <div className="start-menu-sidebar">
          Nostalgic<span style={{ fontWeight: 'normal', fontSize: '12px' }}>97</span>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-1 relative" style={{ minWidth: '220px' }}>
          {/* Programs submenu trigger */}
          <div
            className="start-menu-item relative"
            onMouseEnter={() => setShowPrograms(true)}
            onMouseLeave={() => setShowPrograms(false)}
          >
            <img src="/icons/mycomputer.jpg" alt="" style={{ width: '20px', height: '20px' }} />
            <span className="flex-1">Programs</span>
            <span className="text-[12px]">▶</span>

            {/* Submenu - opens upward via bottom:0 */}
            {showPrograms && (
              <div className="absolute left-full bottom-0 bg-[#c0c0c0] border-2 min-w-[220px] max-h-[calc(100vh-50px)] overflow-y-auto"
                style={{ borderColor: '#fff #0a0a0a #0a0a0a #fff', boxShadow: '2px 2px 0 #000' }}>
                {PROGRAMS.map(item => (
                  <div key={item.id} className="start-menu-item" onClick={() => onItemClick(item.id)}>
                    <img src={item.icon} alt="" style={{ width: '20px', height: '20px' }} />
                    <span>{item.label}</span>
                  </div>
                ))}
                <div className="context-menu-divider" />
                <div className="px-2 py-1 text-[10px] text-[#808080]">Accessories</div>
                {SILLY_PROGRAMS.map((prog, i) => (
                  <div key={i} className="start-menu-item" onClick={prog.action}>
                    <span style={{ fontSize: '18px', width: '24px', textAlign: 'center', display: 'inline-block' }}>{prog.icon}</span>
                    <span>{prog.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="context-menu-divider" />

          {/* Quick launch items */}
          <div className="start-menu-item" onClick={() => onItemClick('coin')}>
            <img src="/icons/logo.png" alt="" style={{ width: '20px', height: '20px' }} />
            <span>$NLGC Info</span>
          </div>
          <div className="start-menu-item" onClick={() => onItemClick('notepad')}>
            <img src="/icons/notepad.png" alt="" style={{ width: '20px', height: '20px' }} />
            <span>note_to_the_future.txt</span>
          </div>
          <div className="start-menu-item" onClick={() => {
            alert('🔍 FIND: Searching for gains...\n\n0 results found.\n\nTry searching again after buying more $NLGC.');
          }}>
            <span style={{ fontSize: '18px', width: '24px', textAlign: 'center', display: 'inline-block' }}>🔍</span>
            <span>Find...</span>
          </div>

          <div className="context-menu-divider" />

          {/* Run */}
          <div className="start-menu-item" onClick={() => setShowRun(true)}>
            <span style={{ fontSize: '18px', width: '24px', textAlign: 'center', display: 'inline-block' }}>⌨️</span>
            <span>Run...</span>
          </div>

          <div className="context-menu-divider" />

          {/* Shut Down */}
          <div className="start-menu-item" onClick={() => onItemClick('shutdown')}>
            <span style={{ fontSize: '18px', width: '24px', textAlign: 'center', display: 'inline-block' }}>⚡</span>
            <span>Shut Down...</span>
          </div>
        </div>
      </div>

      {/* Run Dialog */}
      {showRun && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={(e) => { e.stopPropagation(); setShowRun(false); }}>
          <div className="bg-[#c0c0c0] border-2 p-3"
            style={{ borderColor: '#fff #0a0a0a #0a0a0a #fff', boxShadow: '2px 2px 0 #000', minWidth: '340px' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[28px]">⌨️</span>
              <div>
                <div className="font-bold text-[14px]">Run</div>
                <div className="text-[12px] text-[#444]">Type a command and pray it works</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[12px]">Open:</span>
              <input
                className="flex-1 border px-2 py-1 text-[13px] bg-white"
                style={{ boxShadow: 'inset 1px 1px #808080', fontFamily: "'VT323', monospace" }}
                value={runText}
                onChange={(e) => setRunText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleRun(); }}
                placeholder="try: moon, lambo, rug, gm, wagmi"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <button className="win95-button px-4 py-1 text-[12px]" onClick={handleRun}>OK</button>
              <button className="win95-button px-4 py-1 text-[12px]" onClick={() => { setShowRun(false); setRunText(''); }}>Cancel</button>
              <button className="win95-button px-4 py-1 text-[12px]" onClick={() => alert('📖 HELP:\n\nYou are on your own.\nThis is crypto.\nNobody can help you here.')}>Help</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
