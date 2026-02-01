import React from 'react';

/* ─── Dashboard ─── */
export const DashboardContent = ({ data, title, isMobile, onOpenChild }) => (
  <>
    <h5 style={{ fontSize: isMobile ? '1rem' : '1.2rem', marginTop: 0 }}>📊 {title}</h5>
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '15px',
      marginBottom: '20px',
    }}>
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
      onClick={() => onOpenChild(`${title} - Analytics`, { type: 'analytics' })}
      style={{
        padding: '10px 20px',
        backgroundColor: '#0062AF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      View Detailed Analytics
    </button>
  </>
);

/* ─── Support ─── */
export const SupportContent = ({ data, title, isMobile }) => (
  <>
    <h5 style={{ fontSize: isMobile ? '1rem' : '1.2rem', marginTop: 0 }}>🎧 {title}</h5>
    <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h6 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>Active Tickets</h6>
      <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{data.tickets || 0}</p>
    </div>
    <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
      <p style={{ margin: 0, fontSize: '0.9rem' }}>
        Recent ticket: #TK-{Math.floor(Math.random() * 10000)}
      </p>
      <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#666' }}>
        Status: Pending Review
      </p>
    </div>
  </>
);

/* ─── Accounting ─── */
export const AccountingContent = ({ data, title, isMobile }) => (
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

/* ─── Generic / Fallback ─── */
export const GenericContent = ({ data, title, id, isMobile, windowIndex, totalWindows, onOpenChild }) => (
  <>
    <h5 style={{ fontSize: isMobile ? '1rem' : '1.2rem', marginTop: 0 }}>{title}</h5>
    <p style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', color: '#666' }}>
      Window ID: {id}
    </p>

    {data && Object.keys(data).length > 0 && (
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '15px',
        marginBottom: '15px',
      }}>
        <h6 style={{ marginTop: 0, color: '#0062AF' }}>Window Data:</h6>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '8px', fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
            <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </div>
        ))}
      </div>
    )}

    <hr style={{ margin: '15px 0' }} />

    <div style={{
      minHeight: isMobile ? '200px' : '400px',
      background: '#fafafa',
      border: '1px dashed #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      borderRadius: '8px',
    }}>
      <p style={{ fontSize: isMobile ? '0.9rem' : '1rem', marginBottom: '10px' }}>
        Content area for {title}
      </p>
      <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '15px' }}>
        Window: {windowIndex + 1} / {totalWindows}
      </p>
      <button
        onClick={() => onOpenChild(`${title} - Child`, { parent: id, timestamp: new Date().toISOString() })}
        style={{
          marginTop: '15px',
          padding: isMobile ? '8px 16px' : '10px 20px',
          backgroundColor: '#0062AF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: isMobile ? '0.85rem' : '0.95rem',
        }}
      >
        Open Child Window
      </button>
    </div>
  </>
);
