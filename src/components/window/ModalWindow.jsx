import React from 'react';
import WindowHeader from './WindowHeader';
import WindowFooter from './WindowFooter';
import WindowDimOverlay from './WindowDimOverlay';

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
                         totalWindows,
                         isTopWindow,
                         isExiting
                     }) => {
    let sizeStyle = {};

    if (size === 'maximize') {
        sizeStyle = {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            transform: 'none',
            borderRadius: 0
        };
    } else if (size === 'minimize') {
        if (isMobile) {
            sizeStyle = {
                width: '100%',
                height: '50%',
                top: 0,
                left: 0,
                transform: 'none',
                borderRadius: 0
            };
        } else {
            sizeStyle = {
                width: '50%',
                height: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '12px'
            };
        }
    } else {
        const sizePercentage = Math.max(70, 100 - (windowIndex * 5));

        sizeStyle = {
            width: isMobile ? '100%' : `${sizePercentage}%`,
            height: isMobile ? '100%' : `${sizePercentage}%`,
            top: isMobile ? 0 : '50%',
            left: isMobile ? 0 : '50%',
            transform: isMobile ? 'none' : 'translate(-50%, -50%)',
            borderRadius: isMobile ? 0 : '12px'
        };
    }

    const animationClass = isExiting
        ? (isMobile ? 'modal-exiting-mobile' : 'modal-exiting')
        : (isMobile ? 'modal-entering-mobile' : 'modal-entering');

    return (
        <>
            {!isTopWindow && (
                <WindowDimOverlay
                    zIndex={zIndex}
                    onClick={onBringToFront}
                />
            )}

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isTopWindow) onBringToFront();
                }}
                className={animationClass}
                style={{
                    position: 'fixed',
                    background: 'white',
                    border: '2px solid #0062AF',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    pointerEvents: 'all',
                    overflow: 'hidden',
                    zIndex: zIndex + 1,
                    opacity: isTopWindow ? 1 : 0.7,
                    filter: isTopWindow ? 'none' : 'blur(1px)',
                    transition: isExiting ? 'none' : 'all 0.3s ease',
                    animationFillMode: isExiting ? 'forwards' : 'none',
                    ...sizeStyle
                }}
            >
                <WindowHeader
                    title={title}
                    isMobile={isMobile}
                    onMinimize={() => onResize('min')}
                    onMaximize={() => onResize('max')}
                    onClose={onClose}
                />

                <div
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        if (!isTopWindow) onBringToFront();
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation();
                        if (!isTopWindow) onBringToFront();
                    }}
                    style={{
                        flex: 1,
                        padding: isMobile ? '15px' : '25px',
                        overflowY: 'auto',
                        background: '#fff',
                        WebkitOverflowScrolling: 'touch',
                        pointerEvents: isTopWindow ? 'all' : 'none'
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
        </>
    );
};

export default ModalWindow;
