'use client';

const DELETED_ITEMS = [
  { icon: '🪦', name: 'FTX_account_balance.pdf', origLocation: 'C:\\Definitely Safe\\Exchange', date: '11/11/2022', size: '$32B → jail', reason: 'Your funds are safu (narrator: they were not)' },
  { icon: '🔥', name: 'BitConnect_gains.doc', origLocation: 'C:\\Too Good To Be True', date: '01/17/2018', size: 'WASAWASAWASA', reason: 'Hey hey heyyyy' },
  { icon: '💩', name: 'SafeMoon_is_safe.txt', origLocation: 'C:\\Copium\\Maximum', date: '04/20/2023', size: '99.9% down', reason: 'Safe? Moon? Neither.' },
  { icon: '🤡', name: 'ICP_at_launch.bmp', origLocation: 'C:\\FOMO\\Extreme', date: '05/10/2021', size: '$700 → $4', reason: 'Internet Computer? More like Internet Clownputer' },
  { icon: '🧻', name: 'Squid_Game_Token.exe', origLocation: 'C:\\Red Flags\\Ignored', date: '11/01/2021', size: '∞ → $0.00', reason: 'Couldn\'t sell. Literally. That was the feature.' },
  { icon: '🪙', name: 'Every_dog_coin_ever.folder', origLocation: 'C:\\DOGE\\Knockoffs', date: 'Every day', size: '10,000+', reason: 'BabyElonShibaFlokiInuMoonDogeSafe... you get it' },
  { icon: '📉', name: '"this_is_the_bottom".msg', origLocation: 'C:\\Crypto Twitter\\Hot Takes', date: 'Every. Single. Dip.', size: 'It was not the bottom', reason: 'Narrator: It was, in fact, not the bottom.' },
];

export default function RecycleBin() {
  return (
    <div style={{ width: '600px', maxWidth: '90vw' }}>
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 border-b border-[#808080] text-[12px]">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer" onClick={() => alert('These items cannot be restored.\nLike your portfolio. Sorry.')}>Edit</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer" onClick={() => alert('HELP:\n\nYou are looking at things that got deleted from crypto.\nMuch like your savings after buying these.\n\nFor emotional support, call 1-800-HODL')}>Help</span>
      </div>

      {/* Description */}
      <div className="px-2 py-1 text-[11px] text-[#808080] border-b border-[#808080]">
        🗑️ Recycle Bin — Contains items that have been permanently rugged from crypto history
      </div>

      {/* File List */}
      <div className="bg-white border m-1" style={{ boxShadow: 'inset 1px 1px #808080', maxHeight: '380px', overflowY: 'auto' }}>
        {/* Headers */}
        <div className="flex border-b border-[#808080] bg-[#c0c0c0] text-[10px] font-bold sticky top-0">
          <div className="w-[180px] px-1 py-[2px] border-r border-[#808080]">Name</div>
          <div className="w-[140px] px-1 py-[2px] border-r border-[#808080]">Original Location</div>
          <div className="w-[80px] px-1 py-[2px] border-r border-[#808080]">Date Deleted</div>
          <div className="flex-1 px-1 py-[2px]">Size / Status</div>
        </div>

        {DELETED_ITEMS.map((item, i) => (
          <div key={i}
            className="flex text-[11px] hover:bg-[#000080] hover:text-white cursor-pointer border-b border-[#f0f0f0]"
            onClick={() => alert(`${item.icon} ${item.name}\n\n${item.reason}\n\nRestore this item? LOL. No.`)}
          >
            <div className="w-[180px] px-1 py-[2px] flex items-center gap-1 border-r border-[#f0f0f0]">
              <span>{item.icon}</span> <span className="truncate">{item.name}</span>
            </div>
            <div className="w-[140px] px-1 py-[2px] truncate border-r border-[#f0f0f0]">{item.origLocation}</div>
            <div className="w-[80px] px-1 py-[2px] border-r border-[#f0f0f0]">{item.date}</div>
            <div className="flex-1 px-1 py-[2px]">{item.size}</div>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="px-2 py-1 text-[10px] text-[#808080] flex justify-between">
        <span>{DELETED_ITEMS.length} item(s) — Total value lost: incalculable</span>
        <span>Empty Recycle Bin? They already emptied themselves 💀</span>
      </div>
    </div>
  );
}
