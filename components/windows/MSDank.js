'use client';

// Pre-drawn pixel art of a rocket going to the moon — represented as a grid of colors
const PIXEL_ART = [
  '..........⬛...........',
  '.........⬛🟡⬛.........',
  '........⬛🟡🟡⬛........',
  '.......⬛🟡🟡🟡⬛.......',
  '......⬛⬜⬜⬜⬜⬛......',
  '......⬛⬜🟦🟦⬜⬛......',
  '......⬛⬜⬜⬜⬜⬛......',
  '......⬛⬜⬜⬜⬜⬛......',
  '.....⬛🟥⬜⬜⬜🟥⬛.....',
  '....⬛🟥🟥⬜⬜🟥🟥⬛....',
  '...⬛🟥🟥🟥⬛🟥🟥🟥⬛...',
  '......⬛🟧🟧🟧⬛......',
  '.......⬛🟨🟨⬛.......',
  '........⬛🟨⬛........',
  '.........⬛⬛.........',
];

const MOON = [
  '...⬛⬛⬛⬛...',
  '..⬛🟡🟡🟡⬛..',
  '.⬛🟡⬛🟡🟡⬛.',
  '.⬛🟡🟡🟡⬛⬛.',
  '.⬛🟡🟡🟡🟡⬛.',
  '..⬛🟡🟡🟡⬛..',
  '...⬛⬛⬛⬛...',
];

export default function MSDank() {
  return (
    <div style={{ width: '500px', maxWidth: '90vw' }}>
      {/* Toolbar */}
      <div className="flex gap-3 px-2 py-1 border-b border-[#808080] text-[12px]">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer">Image</span>
        <span className="hover:underline cursor-pointer" onClick={() => alert('There are no colors. Only vibes.')}>Colors</span>
        <span className="hover:underline cursor-pointer" onClick={() => alert('HELP:\n\nYou cannot draw here.\nThis masterpiece is READ ONLY.\nIt belongs in a museum.\n\n(or an NFT marketplace)')}>Help</span>
      </div>

      {/* Tool Palette on left */}
      <div className="flex">
        <div className="w-[36px] bg-[#c0c0c0] border-r border-[#808080] p-1 flex flex-col gap-1">
          {['✏️', '🪣', '🔍', '✂️', '📐', '⭕', '▭', '🅰️', '💧', '🌟'].map((tool, i) => (
            <div key={i}
              className="w-[26px] h-[26px] flex items-center justify-center text-[12px] border border-[#808080] bg-[#c0c0c0] hover:bg-[#dfdfdf] cursor-pointer"
              onClick={() => alert('Tool not available.\n\nThis is a MUSEUM, not a STUDIO.\nDo NOT touch the art.')}
            >
              {tool}
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white p-4 flex flex-col items-center justify-center" style={{ minHeight: '350px' }}>
          <div className="text-[10px] text-[#808080] mb-2 text-center" style={{ fontFamily: "'VT323', monospace" }}>
            masterpiece.bmp — &quot;$NOSTALGIC to the Moon&quot; by anon (2003)
          </div>

          {/* Moon */}
          <div className="mb-2" style={{ lineHeight: '10px', fontSize: '10px', letterSpacing: '-1px' }}>
            {MOON.map((row, i) => (
              <div key={`m${i}`} style={{ whiteSpace: 'pre' }}>{row.replace(/\./g, '  ')}</div>
            ))}
          </div>

          {/* Rocket */}
          <div style={{ lineHeight: '10px', fontSize: '10px', letterSpacing: '-1px' }}>
            {PIXEL_ART.map((row, i) => (
              <div key={`r${i}`} style={{ whiteSpace: 'pre' }}>{row.replace(/\./g, '  ')}</div>
            ))}
          </div>

          <div className="mt-3 text-center text-[12px]" style={{ fontFamily: "'VT323', monospace", color: '#000080' }}>
            &quot;they said it couldnt be done. they were wrong.&quot;
            <br />
            <span className="text-[10px] text-[#808080]">— certified pixel art connoisseur, 2003</span>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="flex items-center gap-0 px-2 py-1 border-t border-[#808080]">
        {['#000','#800','#080','#008','#880','#808','#088','#ccc','#888','#f00','#0f0','#00f','#ff0','#f0f','#0ff','#fff'].map((c, i) => (
          <div key={i}
            className="w-[16px] h-[16px] border border-[#808080] cursor-pointer"
            style={{ background: c }}
            onClick={() => alert(`Color: ${c}\n\nYou selected a color but you still can't draw.\nLife is full of disappointments.`)}
          />
        ))}
      </div>
    </div>
  );
}
