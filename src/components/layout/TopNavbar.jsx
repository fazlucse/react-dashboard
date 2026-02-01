import React from 'react';

const TopNavbar = ({ onToggleSidebar, isMobile }) => {
    return (
        <nav style={{
            height: '60px',
            background: '#fff',
            zIndex: 1060,
            borderBottom: '1px solid #eee',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
        }}>
            <button
                onClick={onToggleSidebar}
                style={{
                    border: 'none',
                    background: 'none',
                    padding: '8px',
                    marginRight: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                    <path d="M2 3h12M2 8h12M2 13h12" stroke="#0062AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <span style={{
                fontWeight: 'bold',
                color: '#0062AF',
                fontSize: isMobile ? '1.2rem' : '1.5rem'
            }}>SIGNET</span>
            <div style={{ marginLeft: 'auto' }}>
                <div style={{
                    background: '#6c757d',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px'
                }}></div>
            </div>
        </nav>
    );
};

export default TopNavbar;
