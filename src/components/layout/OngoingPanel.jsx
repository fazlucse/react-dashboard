import React from 'react';

const OngoingPanel = ({ isMobile, expanded, windows, onExpand, onCollapse }) => {
  return (
    <div
      onClick={() => !expanded && onExpand()}
      style={{
        position: 'fixed',
        left: 0,
        top: expanded ? 0 : '50%',
        transform: expanded ? 'none' : 'translateY(-50%)',
        backgroundColor: '#0062AF',
        width: expanded ? '100vw' : (isMobile ? '30px' : '35px'),
        height: expanded ? '100vh' : (isMobile ? '120px' : '140px'),
        cursor: expanded ? 'default' : 'pointer',
        display: 'flex',
        alignItems: expanded ? 'flex-start' : 'center',
        justifyContent: expanded ? 'flex-start' : 'center',
        transition: 'all 0.4s ease',
        zIndex: expanded ? 1090 : 1045,
        borderRadius: expanded ? 0 : '0 8px 8px 0',
        color: 'white',
        padding: expanded ? (isMobile ? '20px' : '40px') : 0,
        overflowY: expanded ? 'auto' : 'hidden',
      }}
    >
      {!expanded ? (
        /* Vertical label */
        <div style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontSize: isMobile ? '0.6rem' : '0.7rem',
          fontWeight: 'bold',
          pointerEvents: 'none',
        }}>
          ONGOING
        </div>
      ) : (
        /* Expanded content */
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}>
            <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.8rem', margin: 0 }}>
              Workflow Status
            </h2>
            <button
              onClick={(e) => { e.stopPropagation(); onCollapse(); }}
              style={{
                border: '1px solid white',
                background: 'transparent',
                color: 'white',
                padding: isMobile ? '6px 12px' : '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: isMobile ? '0.85rem' : '1rem',
                marginTop: isMobile ? '10px' : 0,
              }}
            >
              Close [X]
            </button>
          </div>

          <p style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
            Your current active operations will be listed here.
          </p>

          <div style={{ marginTop: '20px' }}>
            <h5 style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>
              Active Windows: {windows.length}
            </h5>
            <ul style={{ paddingLeft: '20px' }}>
              {windows.map((w) => (
                <li key={w.id} style={{ marginBottom: '8px', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                  {w.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingPanel;
