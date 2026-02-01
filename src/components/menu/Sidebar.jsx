import React from 'react';
import '../window/ModalWindow.css'; // shared animation classes (sidebar-wave-in/out, menu-item-enter/exit)

const Sidebar = ({
  isMobile,
  sidebarOpen,
  sidebarClosing,
  searchQuery,
  setSearchQuery,
  expandedCategories,
  activeMenu,
  filteredMenu,
  onClose,
  onToggleCategory,
  onMenuItemClick,  // (item) => void – fires for leaf items
}) => {
  if (!sidebarOpen && !sidebarClosing) return null;

  /* ─── Recursive menu-item renderer ─── */
  const renderMenuItem = (item, itemIdx, depth = 0) => {
    const isActive = activeMenu === item.id;
    const isExpanded = expandedCategories[item.id];

    // Check if any nested child is currently active
    const hasActiveChild = item.children?.some((child) => {
      if (activeMenu === child.id) return true;
      return child.children?.some((sub) => activeMenu === sub.id);
    });

    const paddingLeft = 20 + depth * 20;

    return (
      <li
        key={item.id}
        className={sidebarClosing ? 'menu-item-exit' : 'menu-item-enter'}
        style={{
          overflow: 'hidden',
          animationDelay: sidebarClosing ? `${itemIdx * 0.03}s` : `${itemIdx * 0.05 + 0.2}s`,
        }}
      >
        {/* Row */}
        <div
          onClick={() => {
            if (item.children) {
              onToggleCategory(item.id);
            } else {
              onMenuItemClick(item);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${depth === 0 ? '18px' : '12px'} ${paddingLeft}px`,
            borderBottom: depth === 0 ? '1px solid #eee' : '1px solid #f0f0f0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: depth === 0 ? '0.95rem' : '0.85rem',
            backgroundColor: hasActiveChild ? '#1976d2' : isActive ? '#e3f2fd' : 'transparent',
            color: hasActiveChild ? 'white' : 'inherit',
            fontWeight: hasActiveChild ? 'bold' : 'normal',
            transform: 'translateX(0)',
          }}
          onMouseEnter={(e) => {
            if (!hasActiveChild && !isActive) {
              e.currentTarget.style.backgroundColor = depth === 0 ? '#f8f9fa' : '#f5f5f5';
              e.currentTarget.style.transform = 'translateX(5px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!hasActiveChild && !isActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateX(0)';
            }
          }}
        >
          {/* Left: icon + label + optional badge */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ marginRight: '2px' }}>{item.icon}</span>
            {item.label}
            {item.hasLabel && (
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 6px',
                borderRadius: '3px',
                backgroundColor: item.labelColor,
                color: 'white',
                fontWeight: 'bold',
                marginLeft: '5px',
                textTransform: 'uppercase',
              }}>
                {item.labelText}
              </span>
            )}
          </div>

          {/* Expand / collapse indicator */}
          {item.children && (
            <span style={{
              fontSize: '1.2rem',
              padding: '0 5px',
              color: hasActiveChild ? 'white' : '#0062AF',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease',
              display: 'inline-block',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              {isExpanded ? '−' : '+'}
            </span>
          )}
        </div>

        {/* Nested children (animated height) */}
        {item.children && (
          <div style={{
            maxHeight: isExpanded ? '2000px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease, opacity 0.3s ease',
            opacity: isExpanded ? 1 : 0,
            background: depth === 0 ? '#f8f9fa' : '#fafafa',
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {item.children.map((child, ci) => renderMenuItem(child, ci, depth + 1))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1070,
          animation: sidebarClosing
            ? 'backdropFadeOut 0.5s ease forwards'
            : 'backdropFadeIn 0.6s ease forwards',
        }}
      />

      {/* Panel */}
      <div
        className={sidebarClosing ? 'sidebar-wave-out' : 'sidebar-wave-in'}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: isMobile ? '280px' : '320px',
          height: '100%',
          backgroundColor: '#fff',
          zIndex: 1071,
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search header */}
        <div style={{
          padding: '15px',
          borderBottom: '1px solid #eee',
          background: 'linear-gradient(135deg, #0062AF 0%, #004a85 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <input
            type="text"
            placeholder="🔍 Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 15px',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '0.9rem',
              outline: 'none',
              background: 'white',
              color: '#333',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.3)')}
            onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
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
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          >
            ×
          </button>
        </div>

        {/* Menu list */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflowY: 'auto', flex: 1 }}>
          {filteredMenu.length === 0 ? (
            <li style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '0.9rem' }}>
              No results found
            </li>
          ) : (
            filteredMenu.map((item, idx) => renderMenuItem(item, idx, 0))
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
