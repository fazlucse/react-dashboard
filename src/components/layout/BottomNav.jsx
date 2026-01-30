import React from 'react';

const BottomNav = ({ items, isMobile, onItemClick }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 2500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end'
        }}>
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: isMobile ? '65px' : '72px',
                backgroundColor: '#0084C7',
                zIndex: -1
            }}></div>

            <div style={{
                display: 'flex',
                width: isMobile ? '100%' : 'auto',
                height: '100%'
            }}>
                {items.slice(0, 7).map((item, idx, arr) => (
                    <a
                        key={idx}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onItemClick(item);
                        }}
                        style={{
                            flex: isMobile ? 1 : 'none',
                            width: isMobile ? 'auto' : '140px',
                            borderLeft: '1px solid white',
                            borderRight: idx === arr.length - 1 ? '1px solid white' : 'none',
                            padding: isMobile ? '18px 8px' : '20px 15px',
                            color: 'white',
                            textDecoration: 'none',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#0084C7',
                            transition: 'background 0.2s',
                            minWidth: 0,
                            gap: '4px',
                            position: 'relative',
                            marginBottom: isMobile ? '7px' : '0px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006ba8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0084C7'}
                    >
                        <strong style={{
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            lineHeight: 1,
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            opacity: 0.9
                        }}>{item.code}</strong>
                        <span style={{
                            fontSize: isMobile ? '0.55rem' : '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontWeight: '500',
                            lineHeight: 1.2
                        }}>
              {item.label}
            </span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
