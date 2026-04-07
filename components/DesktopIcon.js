export default function DesktopIcon({ icon, label, onClick, isActive }) {
  const isEmoji = !icon.startsWith('/') && !icon.startsWith('http');

  return (
    <div 
      onDoubleClick={onClick}
      className={`
        flex flex-col items-center w-[72px] p-1 cursor-pointer select-none rounded-[2px]
        ${isActive ? 'desktop-icon-selected' : 'hover:bg-[#000080]/20'}
      `}
    >
      <div className="w-[48px] h-[48px] flex items-center justify-center mb-[2px]">
        {isEmoji ? (
          <span style={{ fontSize: '36px', lineHeight: 1 }}>{icon}</span>
        ) : (
          <img 
            src={icon} 
            alt={label}
            className="w-full h-full object-contain"
            draggable="false"
          />
        )}
      </div>
      <span className={`icon-label text-white text-center text-[11px] leading-tight px-[2px] whitespace-pre-line ${isActive ? 'bg-[#000080]' : ''}`}
        style={{ fontFamily: "'VT323', 'MS Sans Serif', sans-serif", textShadow: '1px 1px 0 #000' }}>
        {label}
      </span>
    </div>
  );
} 