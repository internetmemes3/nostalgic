'use client';
import { useState } from 'react';

export default function InternetExploder() {
  const [hits, setHits] = useState(69420);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');

  const triggerPopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <div style={{ width: '620px', maxWidth: '90vw' }} className="relative">
      {/* Annoying popup ad */}
      {showPopup && (
        <div className="absolute top-8 right-4 z-50 bg-[#ffffcc] border-2 border-[#ff0000] p-2 text-[11px] text-black shadow-md"
          style={{ fontFamily: "'VT323', monospace", maxWidth: '200px' }}>
          <div className="font-bold text-red-600 mb-1">⚠️ ALERT ⚠️</div>
          {popupMsg}
          <button className="win95-button text-[9px] px-1 mt-1 block" onClick={() => setShowPopup(false)}>OK whatever</button>
        </div>
      )}

      {/* Browser toolbar */}
      <div className="flex items-center gap-1 px-1 py-1 bg-[#c0c0c0] border-b border-[#808080]">
        <button className="win95-button text-[11px] px-2 py-0" onClick={() => triggerPopup('There is no going back. Only forward. This is crypto.')}>⬅ Back</button>
        <button className="win95-button text-[11px] px-2 py-0" onClick={() => triggerPopup('You are already in the future. The future is $NOSTALGIC.')}>➡ Forward</button>
        <button className="win95-button text-[11px] px-2 py-0" onClick={() => triggerPopup('ERROR: Cannot stop. The blockchain has no brakes.')}>🛑 Stop</button>
        <button className="win95-button text-[11px] px-2 py-0" onClick={() => { setHits(h => h + Math.floor(Math.random() * 1000)); triggerPopup('Page refreshed. You are now 1000x more bullish.'); }}>🔄 Refresh</button>
        <button className="win95-button text-[11px] px-2 py-0" onClick={() => triggerPopup('🏠 Home page set to: $NOSTALGIC\n\nYour browser homepage has been permanently changed. You\'re welcome.')}>🏠 Home</button>
      </div>
      <div className="flex items-center gap-1 px-1 py-1 bg-[#c0c0c0] border-b border-[#808080]">
        <span className="text-[11px] font-bold">Address:</span>
        <div className="flex-1 bg-white border px-1 text-[11px]" style={{ boxShadow: 'inset 1px 1px #808080' }}>
          http://www.geocities.com/Area51/Vault/4269/nostalgic_official.html
        </div>
        <button className="win95-button text-[11px] px-2 py-0">Go</button>
      </div>

      {/* GEOCITIES PAGE */}
      <div className="bg-[#000033] text-[#00ff00] overflow-auto" style={{ maxHeight: '420px', fontFamily: "'VT323', 'Comic Sans MS', cursive" }}>
        {/* Under Construction Bar */}
        <div className="under-construction" />

        <div className="p-4 text-center">
          {/* Header */}
          <div className="text-[28px] rainbow-text mb-2">
            ★·.·´¯`·.·★ $NOSTALGIC ★·.·´¯`·.·★
          </div>
          <div className="text-[#ff00ff] text-[14px] mb-1">
            ~ The Only Website That Matters ~
          </div>
          <div className="text-[#ffff00] text-[11px] blink mb-2">
            ⚠️ BEST VIEWED WITH INTERNET EXPLODER 4.0 AT 800x600 ⚠️
          </div>
          <div className="text-[#ff6600] text-[10px] mb-4">
            (if your monitor is making buzzing noises that is normal and means it is working)
          </div>

          <div className="under-construction mb-4" />

          {/* Welcome */}
          <div className="text-left text-[14px] text-[#00ffff] mb-4">
            <p className="mb-2">👋 hello and welcome to the OFFICIAL $NOSTALGIC homepage!! 👋</p>
            <p className="text-[#ff6600] mb-2">
              this page was made at 3am to tell you about the greatest
              thing to happen to the internet since someone figured out how to put music on websites
              that you CANNOT turn off
            </p>
            <p className="text-[#00ff00] mb-2">
              $NOSTALGIC is a coin for everyone who remembers when the internet was GOOD.
              when every website had a visitor counter and a guestbook and at least one page
              that was permanently &quot;under construction&quot; for years straight. 🚧
            </p>
            <p className="text-[#ff00ff] mb-2">
              we just have VIBES and a deep emotional connection to dial-up sounds. 📞
            </p>
          </div>

          {/* Marquee */}
          <div className="marquee-container mb-4 border-y border-[#00ff00] py-1">
            <div className="marquee-content text-[#ff0] text-[14px]">
              📢 BREAKING NEWS: $NOSTALGIC has been officially recognized by absolutely nobody of importance!! 📢 Chart looking like the pipes screensaver!! 📢 Dev is alive and simply built different!! 📢
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border border-[#00ffff] p-2 mb-4 text-left bg-[#000044]">
            <div className="text-[#00ffff] text-[16px] mb-2 text-center">❓ F.A.Q. (Frequently Avoided Questions) ❓</div>
            <div className="text-[12px] space-y-2 text-[#0f0]">
              <p><span className="text-[#ff0]">Q: Is this a scam?</span><br/>A: sir this is a geocities website. does this LOOK like we have the organizational skills to scam anyone?</p>
              <p><span className="text-[#ff0]">Q: When moon?</span><br/>A: the moon is a mindset.</p>
              <p><span className="text-[#ff0]">Q: Do you have a whitepaper?</span><br/>A: we have a white notepad document with 3 bullet points and a drawing of a rocket. close enough.</p>
              <p><span className="text-[#ff0]">Q: Is the dev doxxed?</span><br/>A: the dev is a text file from 1999 found on a hard drive at goodwill. make of that what you will.</p>
              <p><span className="text-[#ff0]">Q: What&apos;s the use case?</span><br/>A: nostalgia. the use case is feeling something. when was the last time a coin made you FEEL something?? exactly.</p>
              <p><span className="text-[#ff0]">Q: Why does this website look like this?</span><br/>A: because we peaked in 1999 and we are not afraid to admit it.</p>
            </div>
          </div>

          {/* Guestbook */}
          <div className="border border-[#00ff00] p-2 mb-4 text-left">
            <div className="text-[#ff00ff] text-[16px] mb-2 text-center">📖 GUESTBOOK 📖</div>
            <div className="text-[12px] space-y-2">
              <p><span className="text-[#ff0]">visitor_847:</span> <span className="text-[#0f0]">i was looking for a recipe website and ended up here. just bought 10 million tokens. what happened</span></p>
              <p><span className="text-[#ff0]">time_traveler_real:</span> <span className="text-[#0ff]">i came here from 2031. you guys have no idea whats coming. keep holding.</span></p>
              <p><span className="text-[#ff0]">definitely_a_bot:</span> <span className="text-[#0f0]">GREAT PROJECT VERY GOOD TEAM ✅✅✅ I AM REAL HUMAN PERSON WHO TYPES WITH FINGERS</span></p>
              <p><span className="text-[#ff0]">the_intern:</span> <span className="text-[#f88]">i was hired to make this website professional. i have failed. i am sorry. i am also holding.</span></p>
            </div>
          </div>

          {/* How to Buy */}
          <div className="border border-[#ff00ff] p-3 mb-4 text-left bg-[#000066]">
            <div className="text-[#ffff00] text-[18px] mb-2 text-center blink">💰 HOW 2 BUY (very easy trust us) 💰</div>
            <ol className="text-[13px] text-[#00ff00] space-y-1 list-decimal list-inside">
              <li>Get a wallet (it lives in your browser)</li>
              <li>Buy some SOL (the fast money that goes zoom)</li>
              <li>Go to Jupiter or Raydium (space themed exchanges, very on brand)</li>
              <li>Paste the contract address: <span className="text-[#ff0] break-all">PASTE_CONTRACT_ADDRESS_HERE</span></li>
              <li>Swap SOL for $NOSTALGIC</li>
              <li>Tell your friends, your enemies, your dentist, everyone</li>
              <li>There is no step 7. You are done. Congratulations. You are now nostalgic.</li>
            </ol>
          </div>

          {/* Testimonials - fake old forum style */}
          <div className="border border-[#888] p-2 mb-4 text-left bg-[#001100]">
            <div className="text-[#00ff00] text-[14px] mb-2 text-center">💬 REAL TESTIMONIALS (probably) 💬</div>
            <div className="text-[11px] space-y-3">
              <div className="border-b border-[#333] pb-2">
                <span className="text-[#888]">[Posted 03/15/1999 11:42 PM]</span><br/>
                <span className="text-[#0f0]">&quot;i just discovered this thing called the internet and i think it will be big. if anyone from the future is reading this: you&apos;re welcome for being early.&quot;</span>
              </div>
              <div className="border-b border-[#333] pb-2">
                <span className="text-[#888]">[Posted 01/01/2000 12:01 AM]</span><br/>
                <span className="text-[#0f0]">&quot;Y2K didnt destroy the computers!!! now we can keep posting!! also i predict in the year 2026 people will send money through the computer to buy pictures of monkeys. screenshot this.&quot;</span>
              </div>
              <div>
                <span className="text-[#888]">[Posted JUST NOW]</span><br/>
                <span className="text-[#0f0]">&quot;im not saying im from the future but $NOSTALGIC is the last coin you will ever need to buy. i am definitely from the present. please do not investigate further.&quot;</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mb-4 text-[14px]">
            <div className="text-[#ff00ff] mb-2">🔗 IMPORTANT LINKS 🔗</div>
            <div className="space-y-1">
              <div><a href="#" className="text-[#00ffff] underline hover:text-[#ff0]" onClick={(e) => { e.preventDefault(); window.open('https://x.com/nostalgicSolana', '_blank'); }}>📱 Twitter/X</a> - follow us before we get banned (again)</div>
              <div><a href="#" className="text-[#00ffff] underline hover:text-[#ff0]" onClick={(e) => { e.preventDefault(); window.open('https://t.me/NostalgicPanel', '_blank'); }}>💬 Telegram</a> - 24/7 chaos. no mods. we lost them.</div>
              <div><a href="#" className="text-[#00ffff] underline hover:text-[#ff0]" onClick={(e) => { e.preventDefault(); window.open('https://dexscreener.com/PLACEHOLDER', '_blank'); }}>📊 Chart</a> - stare at the line. feel things. this is financial meditation.</div>
            </div>
          </div>

          {/* Webring */}
          <div className="border border-[#666] p-2 mb-4 text-[11px] text-[#888] text-center">
            ⬅ <span className="text-[#0ff] cursor-pointer" onClick={() => triggerPopup('ERROR 404: The previous site in this webring was rugged.')}>Prev</span>
            {' | '}
            <span className="text-[#ff0]">🌐 $NOSTALGIC WebRing — 1 of 1 sites 🌐</span>
            {' | '}
            <span className="text-[#0ff] cursor-pointer" onClick={() => triggerPopup('You have reached the end of the internet. There is nothing after $NOSTALGIC.')}>Next</span> ➡
          </div>

          {/* Hit Counter */}
          <div className="under-construction mb-2" />
          <div className="text-[#808080] text-[12px] mt-2">
            <div className="inline-block bg-black border border-[#333] px-2 py-1">
              You are visitor number: <span className="text-[#00ff00] font-bold">{hits.toLocaleString()}</span>
              <span className="text-[8px] text-[#444]"> (this number is 100% accurate and not made up at all)</span>
            </div>
          </div>
          <div className="text-[10px] text-[#555] mt-3 space-y-1">
            <div>Made with 💚 in Notepad.exe at 3am | Hosted on GeoCities (in our hearts)</div>
            <div>© 1999-forever | Best viewed on a CRT monitor while eating pizza rolls</div>
            <div className="text-[#333]">Not affiliated with any government, corporation, or rational financial decision</div>
          </div>
        </div>
        <div className="under-construction" />
      </div>
    </div>
  );
}
