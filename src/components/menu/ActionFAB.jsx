import React, { useState } from 'react';
import { actionButtons } from '../../data/menuData';

const ActionFAB = ({ isMobile, onButtonClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      right: isMobile ? '15px' : '20px',
      top: isMobile ? 'auto' : '50%',
      bottom: isMobile ? '110px' : 'auto',
      transform: isMobile ? 'none' : 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      zIndex: 1040,
    }}>
      {/* Mobile toggle (+/×) */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontSize: '1.4rem',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
        >
          {mobileMenuOpen ? '×' : '+'}
        </button>
      )}

      {/* Action buttons – always shown on desktop, toggled on mobile */}
      {(!isMobile || mobileMenuOpen) && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: isMobile ? 'fadeIn 0.3s ease' : 'none',
        }}>
          {actionButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => onButtonClick(btn)}
              style={{
                width: isMobile ? '52px' : '48px',
                height: isMobile ? '52px' : '48px',
                borderRadius: '50%',
                backgroundColor: btn.color,
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                fontSize: isMobile ? '1.4rem' : '1.2rem',
                cursor: 'pointer',
                transition: '0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionFAB;
