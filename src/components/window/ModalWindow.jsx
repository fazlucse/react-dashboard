import React from 'react';
import './ModalWindow.css';
import WindowHeader from './WindowHeader';
import WindowFooter from './WindowFooter';

const ModalWindow = ({
  id,
  title,
  children,
  zIndex,
  onClose,
  onResize,
  onBringToFront,
  size,
  isMobile,
  windowIndex,
  isTopWindow,
  isExiting,
}) => {
  /* ─── Compute position / dimensions ─── */
  let sizeStyle = {};

  if (size === 'maximize') {
    sizeStyle = {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      transform: 'none',
      borderRadius: 0,
    };
  } else if (size === 'minimize') {
    sizeStyle = isMobile
      ? { width: '100%', height: '50%', top: 0, left: 0, transform: 'none', borderRadius: 0 }
      : { width: '50%', height: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '12px' };
  } else {
    // default – shrink slightly with each stacked window
    const pct = Math.max(70, 100 - windowIndex * 5);
    sizeStyle = isMobile
      ? { width: '100%', height: '100%', top: 0, left: 0, transform: 'none', borderRadius: 0 }
      : { width: `${pct}%`, height: `${pct}%`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '12px' };
  }

  /* ─── Animation class ─── */
  const animClass = isExiting
    ? (isMobile ? 'modal-exiting-mobile' : 'modal-exiting')
    : (isMobile ? 'modal-entering-mobile' : 'modal-entering');

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={animClass}
      style={{
        position: 'fixed',
        background: 'white',
        border: '2px solid #0062AF',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'all',
        overflow: 'hidden',
        zIndex,
        opacity: isTopWindow ? 1 : 0.7,
        filter: isTopWindow ? 'none' : 'blur(1px)',
        transition: isExiting ? 'none' : 'all 0.3s ease',
        animationFillMode: isExiting ? 'forwards' : 'none',
        ...sizeStyle,
      }}
    >
      <WindowHeader
        title={title}
        isMobile={isMobile}
        onMinimize={() => onResize('min')}
        onMaximize={() => onResize('max')}
        onClose={onClose}
      />

      {/* Scrollable body – clicking here brings window to front */}
      <div
        onMouseDown={(e) => { e.stopPropagation(); onBringToFront(); }}
        onTouchStart={(e) => { e.stopPropagation(); onBringToFront(); }}
        style={{
          flex: 1,
          padding: isMobile ? '15px' : '25px',
          overflowY: 'auto',
          background: '#fff',
          WebkitOverflowScrolling: 'touch',
          pointerEvents: isTopWindow ? 'all' : 'none',
        }}
      >
        {children}
      </div>

      <WindowFooter
        isMobile={isMobile}
        windowId={id}
        onAction1={() => alert('Save clicked for ' + title)}
        onAction2={onClose}
      />
    </div>
  );
};

export default ModalWindow;
