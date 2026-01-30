import React from 'react';

const GenericWindowContent = ({ title, id, data, isMobile, windows, onCreateChildWindow }) => {
    const currentWindowIndex = windows.findIndex(w => w.id === id);

    return (
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
                    marginBottom: '15px'
                }}>
                    <h6 style={{ marginTop: 0, color: '#0062AF' }}>Window Data:</h6>
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '8px', fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                            <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
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
                borderRadius: '8px'
            }}>
                <p style={{ fontSize: isMobile ? '0.9rem' : '1rem', marginBottom: '10px' }}>Content area for {title}</p>
                <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '15px' }}>
                    Window: {currentWindowIndex + 1} / {windows.length}
                </p>

                <button
                    onClick={() => onCreateChildWindow(`${title} - Child`, { parent: id, timestamp: new Date().toISOString() })}
                    style={{
                        marginTop: '15px',
                        padding: isMobile ? '8px 16px' : '10px 20px',
                        backgroundColor: '#0062AF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: isMobile ? '0.85rem' : '0.95rem'
                    }}
                >
                    Open Child Window
                </button>
            </div>
        </>
    );
};

export default GenericWindowContent;
