'use client';

const NOTEPAD_TEXT = `note_to_the_future.txt
========================================
date: december 14, 1999
time: 2:47 AM
status: cant sleep. brain is doing the thing again.
========================================

ok so i know this is gonna sound insane but just hear 
me out. im sitting here at my computer and i just had 
the craziest idea of my entire life.

what if... money... was inside the computer??

i mean what if the actual MONEY lived inside the computer. 
like you couldnt even touch it. 
it would just be numbers but everyone would AGREE that the 
numbers are money. i know that sounds stupid but think 
about it. we already do that with baseball cards kinda.

i think in the future there will be like a giant invisible 
notebook that every computer in the world shares and 
nobody can erase it. like a permanent receipt for 
everything. and people will use this notebook to send 
money to each other

and get this, i think people will make their OWN money. 
like anyone with a computer could just... create a coin. 
and if enough people believe in it, it becomes real money. 
i KNOW im onto something.

i guess in the future there will be THOUSANDS of these 
computer coins. some of them will be named after dogs 
probably because the internet loves dogs. someone will 
definitely make a coin thats just a joke and it will 
somehow be worth millions.

IMPORTANT PREDICTION: i think one day someone will 
make a coin that is about remembering all of THIS. 
like, right now. the old internet. the dial up sounds. 
the way everything looks kinda ugly but in a beautiful 
way. they will call it something like $NLGC because 
thats what it will be about, missing the good old days 
when the internet was weird, fun and free.

and if that coin exists and you are reading this... 
that means i was RIGHT. about ALL of it. the computer 
money, the invisible notebook, the dog coins, everything. 
i was a genius and nobody listened to me

if $NLGC is real right now... BUY IT. not because 
i understand economics (i do not) but 
because its proof that the future turned out exactly 
as weird as i hoped it would.


if you found this file on an old hard drive at a 
garage sale or something... congratulations. you are 
holding a historical document. print this out and put 
it in a museum. or dont. i cant tell you what to do 
im just a text file from 1999.

- some kid, 1999

P.S. if the invisible notebook people are reading 
this, im available for consulting. i accept payment 
in $NLGC coins or pizza rolls.

`;

export default function Notepad() {
  return (
    <div style={{ width: '520px', maxWidth: '90vw' }}>
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 border-b border-[#808080] text-[12px]">
        <span className="hover:underline cursor-pointer" onClick={() => alert('File operations are disabled.\nThis document was recovered from a corrupted hard drive.\nIt is read-only for preservation purposes.')}>File</span>
        <span className="hover:underline cursor-pointer" onClick={() => alert('EDIT:\n\nYou cannot alter a recovered artifact.\nThe kid from 1999 wrote what they wrote.\nHistory is history.')}>Edit</span>
        <span className="hover:underline cursor-pointer">Format</span>
        <span className="hover:underline cursor-pointer" onClick={() => alert('HELP:\n\nYou are reading a note recovered from a dead hard drive.\nWritten by someone who accidentally predicted\nthe entire crypto industry at age 12.\n\nNo further help is available.')}>Help</span>
      </div>

      {/* Text Area */}
      <div className="bg-white border m-1 p-2 overflow-auto"
        style={{
          boxShadow: 'inset 1px 1px #808080',
          maxHeight: '400px',
          fontFamily: "'VT323', 'Courier New', monospace",
          fontSize: '14px',
          lineHeight: '1.4',
          whiteSpace: 'pre-wrap',
          color: '#000',
        }}>
        {NOTEPAD_TEXT}
      </div>

      {/* Status Bar */}
      <div className="flex justify-between px-2 py-[2px] text-[10px] text-[#808080] border-t border-[#808080]">
        <span>Ln 1, Col 1</span>
        <span>UTF-8 (probably)</span>
        <span>Read Only (recovered file)</span>
      </div>
    </div>
  );
}
