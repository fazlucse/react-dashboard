import React from 'react';

const SupportTicketsSummary = ({ title, data, isMobile }) => {
    return (
        <>
            <h5 style={{ fontSize: isMobile ? '1rem' : '1.2rem', marginTop: 0 }}>🎧 {title}</h5>
            <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h6 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>Active Tickets</h6>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{data.tickets || 0}</p>
            </div>
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Recent ticket: #TK-{Math.floor(Math.random() * 10000)}</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#666' }}>Status: Pending Review</p>
            </div>
        </>
    );
};

export default SupportTicketsSummary;
