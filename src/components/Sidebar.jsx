import React from 'react';
import MenuList from '../menu/MenuList';

const Sidebar = ({
                     isOpen,
                     isClosing,
                     isMobile,
                     searchQuery,
                     onClose,
                     onSearchChange,
                     onItemClick,
                     onToggleExpand,
                     activeMenu,
                     expandedCategories,
                     menuItems
                 }) => {
    if (!isOpen && !isClosing) return null;

    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1070,
                    animation: isClosing ? 'backdropFadeOut 0.5s ease forwards' : 'backdropFadeIn 0.6s ease forwards'
                }}
            />
            <div
                className={isClosing ? 'sidebar-wave-out' : 'sidebar-wave-in'}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isMobile ? '280px' : '320px',
                    height: '100%',
                    backgroundColor: '#fff',
                    zIndex: 1071,
                    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    background: 'linear-gradient(135deg, #0062AF 0%, #004a85 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <input
                        type="text"
                        placeholder="🔍 Search menu..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '10px 15px',
                            border: '2px solid white',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            background: 'white',
                            color: '#333'
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.3)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                    <button
                        onClick={onClose}
                        style={{
                            border: 'none',
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    >×</button>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflowY: 'auto', flex: 1 }}>
                    <MenuList
                        items={menuItems}
                        activeMenu={activeMenu}
                        expandedCategories={expandedCategories}
                        sidebarClosing={isClosing}
                        onItemClick={onItemClick}
                        onToggleExpand={onToggleExpand}
                        searchQuery={searchQuery}
                    />
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
