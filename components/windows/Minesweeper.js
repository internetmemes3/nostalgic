'use client';
import { useState, useCallback } from 'react';

const ROWS = 9;
const COLS = 9;
const MINE_COUNT = 10;

const MINE_LABELS = [
  'RUG PULL', 'DEV WALLET', 'KYC', 'SEC', 'HACK',
  'HONEYPOT', 'EXIT SCAM', 'TAXES 99%', 'JEET', 'BANKRUN',
];

const FACES = { playing: '🙂', won: '😎', lost: '💀', clicking: '😮' };

function generateBoard() {
  const board = Array(ROWS).fill(null).map(() =>
    Array(COLS).fill(null).map(() => ({
      mine: false,
      mineLabel: '',
      revealed: false,
      flagged: false,
      adjacentMines: 0,
    }))
  );

  // Place mines
  let placed = 0;
  while (placed < MINE_COUNT) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      board[r][c].mineLabel = MINE_LABELS[placed % MINE_LABELS.length];
      placed++;
    }
  }

  // Count adjacent
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) count++;
        }
      }
      board[r][c].adjacentMines = count;
    }
  }

  return board;
}

function revealCell(board, r, c) {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
  if (board[r][c].revealed || board[r][c].flagged || board[r][c].mine) return;
  board[r][c].revealed = true;
  if (board[r][c].adjacentMines === 0) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        revealCell(board, r + dr, c + dc);
      }
    }
  }
}

const NUM_COLORS = ['', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000', '#808080'];

export default function Minesweeper() {
  const [board, setBoard] = useState(() => generateBoard());
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [flagCount, setFlagCount] = useState(0);
  const [pressing, setPressing] = useState(false);

  const handleClick = useCallback((r, c) => {
    if (gameState !== 'playing') return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];
    if (cell.flagged || cell.revealed) return;

    if (cell.mine) {
      // Game over — reveal all mines
      newBoard.forEach(row => row.forEach(cell => {
        if (cell.mine) cell.revealed = true;
      }));
      setBoard(newBoard);
      setGameState('lost');
      return;
    }

    revealCell(newBoard, r, c);

    // Check win
    let unrevealed = 0;
    newBoard.forEach(row => row.forEach(cell => {
      if (!cell.revealed && !cell.mine) unrevealed++;
    }));
    if (unrevealed === 0) {
      setGameState('won');
    }

    setBoard(newBoard);
  }, [board, gameState]);

  const handleRightClick = useCallback((e, r, c) => {
    e.preventDefault();
    if (gameState !== 'playing') return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[r][c];
    if (cell.revealed) return;
    cell.flagged = !cell.flagged;
    setBoard(newBoard);
    setFlagCount(prev => cell.flagged ? prev + 1 : prev - 1);
  }, [board, gameState]);

  const reset = () => {
    setBoard(generateBoard());
    setGameState('playing');
    setFlagCount(0);
  };

  const getCellContent = (cell) => {
    if (!cell.revealed && cell.flagged) return '🚩';
    if (!cell.revealed) return '';
    if (cell.mine) return '💣';
    if (cell.adjacentMines === 0) return '';
    return cell.adjacentMines;
  };

  const face = pressing && gameState === 'playing' ? FACES.clicking : FACES[gameState];

  return (
    <div style={{ width: 'fit-content' }}>
      {/* Menu */}
      <div className="flex gap-3 px-2 py-1 border-b border-[#808080] text-[12px]">
        <span className="hover:underline cursor-pointer" onClick={reset}>Game</span>
        <span className="hover:underline cursor-pointer" onClick={() => alert('HELP:\n\nClick to reveal. Right-click to flag.\nAvoid: RUG PULLS, DEV WALLETS, the SEC.\n\nBasically just like real crypto.')}>Help</span>
      </div>

      {/* Counter + Face + Counter */}
      <div className="flex items-center justify-between p-1 bg-[#c0c0c0] border-b border-[#808080]">
        <div className="bg-black text-red-500 font-bold px-2 py-1 text-[18px] font-mono min-w-[50px] text-center"
          style={{ fontFamily: "'VT323', monospace", letterSpacing: '2px' }}>
          {String(MINE_COUNT - flagCount).padStart(3, '0')}
        </div>
        <button
          className="win95-button w-[30px] h-[30px] flex items-center justify-center text-[18px]"
          onClick={reset}
        >
          {face}
        </button>
        <div className="bg-black text-red-500 font-bold px-2 py-1 text-[18px] font-mono min-w-[50px] text-center"
          style={{ fontFamily: "'VT323', monospace", letterSpacing: '2px' }}>
          000
        </div>
      </div>

      {/* Grid */}
      <div className="p-1 bg-[#c0c0c0]"
        style={{ boxShadow: 'inset 2px 2px #808080, inset -2px -2px #fff' }}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        onMouseLeave={() => setPressing(false)}
      >
        {board.map((row, r) => (
          <div key={r} className="flex">
            {row.map((cell, c) => {
              const content = getCellContent(cell);
              const color = !cell.mine && cell.revealed && cell.adjacentMines > 0
                ? NUM_COLORS[cell.adjacentMines] : (cell.mine && cell.revealed ? '#f00' : '#000');

              return (
                <div
                  key={c}
                  className={`mine-cell ${cell.revealed ? 'revealed' : ''}`}
                  style={{
                    color: color,
                    background: cell.revealed && cell.mine ? '#ff0000' : (cell.revealed ? '#c0c0c0' : undefined),
                  }}
                  onClick={() => handleClick(r, c)}
                  onContextMenu={(e) => handleRightClick(e, r, c)}
                  title={cell.revealed && cell.mine ? cell.mineLabel : ''}
                >
                  {content}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="text-[11px] text-center py-1 text-[#808080]">
        {gameState === 'won' && '🎉 You avoided all the rugs! Incredible. Hire this person.'}
        {gameState === 'lost' && '💀 You hit a rug pull. Your portfolio is now a tax write-off.'}
        {gameState === 'playing' && 'Left click = reveal | Right click = flag the red flags'}
      </div>
    </div>
  );
}
