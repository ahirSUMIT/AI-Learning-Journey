// WindowFrame.jsx - Window wrapper container with title bar & controls
import React, { useState } from 'react';

export default function WindowFrame({
  id,
  title,
  icon: IconComponent,
  isOpen,
  isMinimized,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  children,
  defaultWidth = '920px',
  defaultHeight = '620px'
}) {
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      className={`desktop-window-frame ${isActive ? 'active-window' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={{
        width: isMaximized ? '100vw' : defaultWidth,
        height: isMaximized ? 'calc(100vh - 30px)' : defaultHeight,
        zIndex: isActive ? 30 : 10
      }}
      onClick={onFocus}
    >
      {title !== 'HireMeAI' && (
        <div className="window-frame-header" onDoubleClick={() => setIsMaximized(!isMaximized)}>
          <div className="window-dots">
            <span className="dot dot-close" onClick={onClose} title="Close window" />
            <span className="dot dot-minimize" onClick={onMinimize} title="Minimize window" />
            <span
              className="dot dot-maximize"
              onClick={() => setIsMaximized(!isMaximized)}
              title="Maximize window"
            />
          </div>
          <div className="window-frame-title">
            {IconComponent && <IconComponent size={15} style={{ marginRight: '6px' }} />}
            <span>{title}</span>
          </div>
          <div style={{ width: '40px' }} />
        </div>
      )}
      <div className="window-frame-content">{children}</div>
    </div>
  );
}
