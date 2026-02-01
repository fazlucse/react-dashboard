import React from 'react';

const WindowFooter = ({ isMobile, onAction1, onAction2, windowId }) => {
  return (
    <div style={{
      background: '#f8f9fa',
      padding: isMobile ? '12px 15px' : '14px 20px',
      borderTop: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        fontSize: '0.75rem',
        color: '#6c757d',
        fontFamily: 'monospace',
      }}>
        ID: {windowId.substring(0, 12)}...
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={onAction1}
          style={{
            padding: isMobile ? '6px 12px' : '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: isMobile ? '0.8rem' : '0.85rem',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
        >
          Save
        </button>

        <button
          onClick={onAction2}
          style={{
            padding: isMobile ? '6px 12px' : '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: isMobile ? '0.8rem' : '0.85rem',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5a6268')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6c757d')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WindowFooter;
