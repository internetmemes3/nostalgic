'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';

const Window = ({ id, title, children, onClose, onFocus, onMinimize, style, zIndex = 10, isActive = true, defaultPos }) => {
  const windowRef = useRef(null);
  const [pos, setPos] = useState(defaultPos || { x: 80 + Math.random() * 200, y: 40 + Math.random() * 100 });
  const [size, setSize] = useState(null);
  const [maximized, setMaximized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const prevPos = useRef(pos);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('button')) return;
    onFocus && onFocus();
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    e.preventDefault();
  }, [pos, onFocus]);

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => {
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: Math.max(0, e.clientY - dragOffset.current.y),
      });
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging]);

  const handleMaximize = () => {
    if (maximized) {
      setPos(prevPos.current);
      setMaximized(false);
    } else {
      prevPos.current = pos;
      setPos({ x: 0, y: 0 });
      setMaximized(true);
    }
  };

  const windowStyle = maximized
    ? { position: 'fixed', left: 0, top: 0, width: '100vw', height: 'calc(100vh - 40px)', zIndex: zIndex }
    : { position: 'absolute', left: pos.x, top: pos.y, zIndex: zIndex, ...(style || {}) };

  return (
    <div
      ref={windowRef}
      className={`bg-[#c0c0c0] flex flex-col ${dragging ? 'win-dragging' : ''}`}
      style={{
        ...windowStyle,
        boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, 2px 2px 0px #000',
        minWidth: '280px',
        minHeight: '120px',
      }}
      onMouseDown={() => onFocus && onFocus()}
    >
      {/* Title Bar */}
      <div
        className={`${isActive ? 'bg-[#000080]' : 'bg-[#808080]'} px-2 py-[2px] flex items-center justify-between select-none shrink-0`}
        onMouseDown={handleMouseDown}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <span className="text-white text-[13px] font-bold truncate mr-2"
          style={{ fontFamily: "'VT323', 'MS Sans Serif', sans-serif" }}>
          {title}
        </span>
        <div className="flex items-center gap-[2px]">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center text-[10px]"
              style={{ border: '1px outset #fff', borderRightColor: '#000', borderBottomColor: '#000' }}
            >
              _
            </button>
          )}
          <button
            onClick={handleMaximize}
            className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center text-[10px]"
            style={{ border: '1px outset #fff', borderRightColor: '#000', borderBottomColor: '#000' }}
          >
            □
          </button>
          <button
            onClick={onClose}
            className="w-[16px] h-[14px] bg-[#c0c0c0] flex items-center justify-center text-[10px] font-bold"
            style={{ border: '1px outset #fff', borderRightColor: '#000', borderBottomColor: '#000' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto" style={{ background: '#c0c0c0' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;