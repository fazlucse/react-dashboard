import React from 'react';

const DashboardOverview = ({ title, data, isMobile, onCreateChildWindow }) => {
    return (
        <>
            <h5 style={{ fontSize: isMobile ? '1rem' : '1.2rem', marginTop: 0 }}>📊 {title}</h5>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
                    <h6 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Total Users</h6>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{data.stats?.users || 0}</p>
                </div>
                <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '8px' }}>
                    <h6 style={{ margin: '0 0 10px 0', color: '#388e3c' }}>Revenue</h6>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>${data.stats?.revenue || 0}</p>
                </div>
            </div>
            <button
                onClick={() => onCreateChildWindow(`${title} - Analytics`, { parent: data.parent, type: 'analytics' })}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0062AF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                View Detailed Analytics
            </button>
        </>
    );
};

export default DashboardOverview;
