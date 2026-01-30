import React from 'react';

const WindowDimOverlay = ({ zIndex, onClick }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                zIndex,
                pointerEvents: 'all',
                cursor: 'not-allowed'
            }}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick?.();
            }}
            onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        />
    );
};

export default WindowDimOverlay;
