'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';

const Window = ({
  id,
  title,
  icon,
  children,
  onClose,
  onFocus,
  onMinimize,
  style,
  zIndex = 10,
  isActive = true,
  defaultPos,
  dialog = false,
}) => {
  const [pos, setPos] = useState(defaultPos || { x: 96, y: 48 });
  const [maximized, setMaximized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const prevPos = useRef(pos);

  useEffect(() => {
    if (defaultPos) return;
    const n = id ? id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) : 40;
    const maxX = Math.max(12, window.innerWidth - 520);
    const maxY = Math.max(12, window.innerHeight - 420);
    setPos({
      x: Math.min(88 + (n % 5) * 18, maxX),
      y: Math.min(20 + (n % 4) * 18, maxY),
    });
  }, [id, defaultPos]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('button')) return;
    onFocus && onFocus();
    if (maximized) return;
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    e.preventDefault();
  }, [pos, onFocus, maximized]);

  useEffect(() => {
    if (!dragging) return undefined;
    const handleMove = (e) => {
      setPos({
        x: Math.min(window.innerWidth - 80, e.clientX - dragOffset.current.x),
        y: Math.max(0, Math.min(window.innerHeight - 48, e.clientY - dragOffset.current.y)),
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
    ? { position: 'fixed', left: 0, top: 0, width: '100vw', height: 'calc(100vh - 34px)', zIndex }
    : {
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        zIndex,
        maxWidth: `calc(100vw - ${Math.max(pos.x, 0) + 16}px)`,
        ...(style || {}),
      };

  return (
    <div
      className={`win98-window flex flex-col ${dragging ? 'win-dragging' : ''}`}
      style={windowStyle}
      onMouseDown={() => onFocus && onFocus()}
    >
      <div
        className="win98-titlebar"
        data-active={isActive ? 'true' : 'false'}
        onMouseDown={handleMouseDown}
        onDoubleClick={dialog ? undefined : handleMaximize}
      >
        <div className="win98-title-text">
          {icon && (icon.startsWith('/') || icon.startsWith('http')
            ? <img src={icon} alt="" className="win98-title-icon" draggable="false" />
            : <span className="win98-title-emoji">{icon}</span>)}
          <span className="truncate">{title}</span>
        </div>
        <div className="win98-caption">
          {onMinimize && !dialog && (
            <button type="button" className="win98-caption-btn" aria-label="Minimize" onClick={onMinimize}>
              <span className="win98-min-glyph" />
            </button>
          )}
          {!dialog && (
            <button type="button" className="win98-caption-btn" aria-label="Maximize" onClick={handleMaximize}>
              <span className={maximized ? 'win98-restore-glyph' : 'win98-max-glyph'} />
            </button>
          )}
          <button type="button" className="win98-caption-btn win98-close-btn" aria-label="Close" onClick={onClose}>
            <span className="win98-close-glyph">✕</span>
          </button>
        </div>
      </div>

      <div className="win98-client flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
