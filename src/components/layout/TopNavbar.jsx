import React from "react";

const TopNavbar = ({ onToggleSidebar, isMobile }) => (
    <nav style={{
        height: '60px', background: '#fff', zIndex: 1060, borderBottom: '1px solid #eee',
        position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', padding: '0 15px'
    }}>
        <button onClick={onToggleSidebar} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 16 16"><path d="M2 3h12M2 8h12M2 13h12" stroke="#0062AF" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <span style={{ fontWeight: 'bold', color: '#0062AF', fontSize: isMobile ? '1.2rem' : '1.5rem', marginLeft: '10px' }}>SIGNET</span>
    </nav>
);

export default TopNavbar;
