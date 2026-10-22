// Public site values. Edit .env.local, then restart `npm run dev`.
// Every screen reads from here, so one change updates the whole desktop.

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
export const CONTRACT_LABEL = CONTRACT_ADDRESS || 'soon';

export const X_URL = process.env.NEXT_PUBLIC_X_URL || 'https://x.com/nostalgicSolana';
export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/NostalgicPanel';
export const DEXSCREENER_URL = process.env.NEXT_PUBLIC_DEXSCREENER_URL || '';

export const LINKS = [
  { id: 'x', label: 'X', short: 'X', href: X_URL },
  { id: 'telegram', label: 'Telegram', short: 'TG', href: TELEGRAM_URL },
  { id: 'dex', label: 'Dexscreener', short: 'DEX', href: DEXSCREENER_URL },
];

export function openExternal(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}
