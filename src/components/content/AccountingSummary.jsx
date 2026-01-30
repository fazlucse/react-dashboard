import React from 'react';

const AccountingSummary = ({ title, data, isMobile }) => {
    return (
        <>
            <h5 style={{ fontSize: isMobile ? '1rem' : '1.2rem', marginTop: 0 }}>📈 {title}</h5>
            <div style={{ background: '#f3e5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h6 style={{ margin: '0 0 10px 0', color: '#7b1fa2' }}>Current Balance</h6>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#4caf50' }}>
                    ${data.balance?.toLocaleString() || '0.00'}
                </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button style={{ padding: '8px 16px', background: '#0062AF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    View Transactions
                </button>
                <button style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Generate Report
                </button>
            </div>
        </>
    );
};

export default AccountingSummary;
