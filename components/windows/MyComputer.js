'use client';

const FAKE_FILES = [
  { icon: '📁', name: 'bag_of_holding', type: 'File Folder', size: '∞ KB', date: '01/01/2003' },
  { icon: '📁', name: 'definitely_not_a_rug', type: 'File Folder', size: '0 KB', date: '04/20/2069' },
  { icon: '📄', name: 'tokenomics.xls', type: 'Excel Meme Sheet', size: '420 KB', date: '06/09/2003' },
  { icon: '💰', name: 'dev_wallet.exe', type: 'Application', size: 'TRUST ME BRO', date: '01/01/1970' },
  { icon: '📄', name: 'whitepaper.doc', type: 'Word Document', size: '2 pages of vibes', date: '12/25/2002' },
  { icon: '🔒', name: 'liquidity.locked', type: 'Locked File', size: 'YES', date: '♾️' },
  { icon: '🎵', name: 'dial_up_sound.wav', type: 'Wave Sound', size: '69 KB', date: '03/15/1999' },
  { icon: '🖼️', name: 'chart_going_up.bmp', type: 'Bitmap Image', size: 'TO THE MOON', date: 'SOON™' },
];

const WALLET_STATS = [
  { label: 'Token Name', value: '$NOSTALGIC' },
  { label: 'Chain', value: 'Solana (the fast one)' },
  { label: 'Total Supply', value: '1,000,000,000' },
  { label: 'Tax', value: '0% (we\'re not savages)' },
  { label: 'Liquidity', value: 'LOCKED (pinky promise)' },
  { label: 'Contract', value: 'PASTE_CONTRACT_ADDRESS_HERE' },
  { label: 'Vibe Check', value: '✅ PASSED' },
  { label: 'Rug Status', value: '❌ NOT TODAY SATAN' },
];

export default function MyComputer() {
  return (
    <div style={{ width: '580px', maxWidth: '90vw' }}>
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 border-b border-[#808080] text-[13px]">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer">Go to Moon</span>
        <span className="hover:underline cursor-pointer">Help (lol)</span>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-[#808080]">
        <span className="text-[12px] font-bold">Address:</span>
        <div className="flex-1 bg-white border border-[#808080] px-1 text-[12px]"
          style={{ boxShadow: 'inset 1px 1px #0a0a0a' }}>
          C:\My_Bags\$NOSTALGIC\to_the_moon
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
              onClick={() => {
                if (file.name === 'dev_wallet.exe') alert('ACCESS DENIED\n\nNice try, fren. The dev wallet is a myth.\nLike Bigfoot. But with more SOL.');
                else if (file.name === 'whitepaper.doc') alert('WHITEPAPER.DOC\n\n1. Make coin\n2. ???\n3. Profit\n\n[END OF DOCUMENT]');
                else if (file.name === 'dial_up_sound.wav') alert('🔊 BEEEE BOOO BRRRRR KSSSHHHH DINGDINGDING\n\n(imagine the dial-up sound here)');
                else if (file.name === 'chart_going_up.bmp') alert('📈 Cannot render image.\nChart is going UP too fast for your display.');
                else if (file.name === 'tokenomics.xls') alert('TOKENOMICS.XLS\n\n100% of supply = vibes\n0% = dev wallet\nTax: 0%\nLP: Burned\n\nSource: trust me bro');
              }}
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
          8 object(s) — 420.69 MB free — Disk space is a social construct
        </div>
      </div>
    </div>
  );
}
