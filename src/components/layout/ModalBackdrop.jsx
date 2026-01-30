import React from 'react';

const ModalBackdrop = ({ isVisible, isExiting, onClick }) => {
    if (!isVisible && !isExiting) return null;

    return (
        <div
            className={isExiting ? 'backdrop-exiting' : 'backdrop-entering'}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick?.();
            }}
            onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 2999,
                pointerEvents: 'all',
                cursor: 'not-allowed'
            }}
        />
    );
};

export default ModalBackdrop;
