import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './ModalWindow.css'; // ← we'll put styles here or use CSS modules / tailwind

/**
 * Reusable modal-style window with header, content, footer, animations,
 * maximize/minimize support, mobile responsiveness, and bring-to-front behavior.
 */
export default function ModalWindow({
                                        id,
                                        title,
                                        children,
                                        zIndex = 3000,
                                        onClose,
                                        onResize,
                                        onBringToFront,
                                        size = 'default',           // 'default' | 'maximize' | 'minimize'
                                        isMobile = false,
                                        windowIndex = 0,
                                        totalWindows = 1,
                                        isTopWindow = true,
                                        isExiting = false,
                                        previousSize,               // optional — used internally for restore
                                    }) {
    // Determine size & positioning styles
    let windowStyle = {};

    if (size === 'maximize') {
        windowStyle = {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            transform: 'none',
            borderRadius: 0,
        };
    } else if (size === 'minimize') {
        if (isMobile) {
            windowStyle = {
                width: '100%',
                height: '50%',
                top: 0,
                left: 0,
                transform: 'none',
                borderRadius: 0,
            };
        } else {
            windowStyle = {
                width: '50%',
                height: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '12px',
            };
        }
    } else {
        // default size — slightly shrinking for each new window (classic MDI feel)
        const basePercent = Math.max(70, 100 - windowIndex * 4);
        windowStyle = {
            width: isMobile ? '100%' : `${basePercent}%`,
            height: isMobile ? '100%' : `${basePercent}%`,
            top: isMobile ? 0 : '50%',
            left: isMobile ? 0 : '50%',
            transform: isMobile ? 'none' : 'translate(-50%, -50%)',
            borderRadius: isMobile ? 0 : '12px',
        };
    }

    const animationClass = isExiting
        ? isMobile
            ? 'modal-exiting-mobile'
            : 'modal-exiting'
        : isMobile
            ? 'modal-entering-mobile'
            : 'modal-entering';

    return (
        <div
            className={clsx('modal-window', animationClass)}
            style={{
                position: 'fixed',
                background: 'white',
                border: '2px solid #0062AF',
                boxShadow: '0 20px 60px rgba(0,0,0,0.38)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex,
                opacity: isTopWindow ? 1 : 0.78,
                filter: isTopWindow ? 'none' : 'blur(0.8px)',
                pointerEvents: 'all',
                transition: isExiting ? 'none' : 'opacity 0.25s, filter 0.25s, box-shadow 0.25s',
                ...windowStyle,
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (isTopWindow) return;
                onBringToFront?.();
            }}
        >
            {/* Header */}
            <WindowHeader
                title={title}
                isMobile={isMobile}
                onMinimize={() => onResize?.('min')}
                onMaximize={() => onResize?.('max')}
                onClose={onClose}
            />

            {/* Content Area */}
            <div
                className="modal-content"
                onMouseDown={(e) => {
                    // Bring to front on content click (except buttons/inputs)
                    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
                    onBringToFront?.();
                }}
                onTouchStart={() => onBringToFront?.()}
                style={{
                    flex: 1,
                    padding: isMobile ? '16px' : '24px',
                    overflowY: 'auto',
                    background: '#ffffff',
                    WebkitOverflowScrolling: 'touch',
                    pointerEvents: isTopWindow ? 'auto' : 'none',
                }}
            >
                {children}
            </div>

            {/* Footer */}
            <WindowFooter
                isMobile={isMobile}
                windowId={id}
                onSave={() => {
                    // You can later connect real save logic here
                    console.log(`Save triggered for window ${id} — ${title}`);
                    // Example: call API, show toast, etc.
                }}
                onClose={onClose}
            />
        </div>
    );
}

ModalWindow.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    zIndex: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onResize: PropTypes.func,
    onBringToFront: PropTypes.func,
    size: PropTypes.oneOf(['default', 'maximize', 'minimize']),
    isMobile: PropTypes.bool,
    windowIndex: PropTypes.number,
    totalWindows: PropTypes.number,
    isTopWindow: PropTypes.bool,
    isExiting: PropTypes.bool,
    previousSize: PropTypes.string,
};

// ────────────────────────────────────────────────
//    Reusable sub-components (can be extracted later)
// ────────────────────────────────────────────────

function WindowHeader({ title, isMobile, onMinimize, onMaximize, onClose }) {
    return (
        <div className="window-header">
            <span className="window-title">{title}</span>
            <div className="window-controls">
                {!isMobile && onMinimize && (
                    <button className="control-btn minimize" onClick={onMinimize}>
                        _
                    </button>
                )}
                {onMaximize && (
                    <button className="control-btn maximize" onClick={onMaximize}>
                        ▢
                    </button>
                )}
                <button className="control-btn close" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
}

function WindowFooter({ isMobile, windowId, onSave, onClose }) {
    return (
        <div className="window-footer">
            <div className="window-id">
                ID: {windowId.substring(0, 12)}...
            </div>
            <div className="footer-actions">
                <button className="btn save" onClick={onSave}>
                    Save
                </button>
                <button className="btn cancel" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
