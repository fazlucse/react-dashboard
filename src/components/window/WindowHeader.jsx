import React from 'react';

const WindowHeader = ({ title, isMobile, onMinimize, onMaximize, onClose }) => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #0062AF 0%, #004a85 100%)',
            padding: isMobile ? '12px 15px' : '14px 20px',
            borderBottom: '2px solid #003d6b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
      <span style={{
          fontWeight: 'bold',
          fontSize: isMobile ? '0.9rem' : '1.05rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '60%',
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
      }}>{title}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
                {!isMobile && onMinimize && (
                    <button
                        onClick={onMinimize}
                        style={{
                            border: 'none',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: 'white',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    >_</button>
                )}
                {onMaximize && (
                    <button
                        onClick={onMaximize}
                        style={{
                            border: 'none',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: 'white',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    >▢</button>
                )}
                <button
                    onClick={onClose}
                    style={{
                        border: 'none',
                        background: '#dc3545',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'background 0.2s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                >×</button>
            </div>
        </div>
    );
};

export default WindowHeader;
