import { useEffect, useState } from 'react';
import Window from './Window';

export default function AutoPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
   
    setShowPopup(true);
  }, []);

  return (
    <>
      {showPopup && (
        <Window
          title="Software Installation Required"
          onClose={() => setShowPopup(false)}
        >
          <div className="p-4">
            <p>Warning: You need to install required software to continue.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowPopup(false)}
            >
              Got it
            </button>
          </div>
        </Window>
      )}
    </>
  );
} 