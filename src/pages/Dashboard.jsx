import React from 'react';

// Hooks
import useWindowManager from '../hooks/useWindowManager';
import useSidebar from '../hooks/useSidebar';
import useResponsive from '../hooks/useResponsive';

// Layout
import Navbar from '../components/layout/Navbar';
import BottomNav from '../components/layout/BottomNav';
import OngoingPanel from '../components/layout/OngoingPanel';

// Menu
import Sidebar from '../components/menu/Sidebar';
import ActionFAB from '../components/menu/ActionFAB';

// Window
import ModalWindow from '../components/window/ModalWindow';

// Content
import {
  DashboardContent,
  SupportContent,
  AccountingContent,
  GenericContent,
} from '../components/content/WindowContent';

// Data
import menuStructure from '../data/menuStructure';

/* ─── Content router – picks the right template based on data.type ─── */
const renderWindowContent = (win, isMobile, windows, createWindow) => {
  const { data, title, id } = win;
  const idx = windows.findIndex((w) => w.id === id);

  const openChild = (childTitle, childData) =>
    createWindow(childTitle, childData, null);

  switch (data?.type) {
    case 'dashboard':
      return <DashboardContent data={data} title={title} isMobile={isMobile} onOpenChild={openChild} />;
    case 'support':
      return <SupportContent data={data} title={title} isMobile={isMobile} />;
    case 'accounting':
      return <AccountingContent data={data} title={title} isMobile={isMobile} />;
    case 'person':
      return <PersonsList />;
    default:
      return (
        <GenericContent
          data={data}
          title={title}
          id={id}
          isMobile={isMobile}
          windowIndex={idx}
          totalWindows={windows.length}
          onOpenChild={openChild}
        />
      );
  }
};

/* ─── Dashboard Page ─── */
const Dashboard = () => {
  const { isMobile } = useResponsive();

  // Window manager
  const {
    windows,
    exitingWindows,
    activeMenu,
    backdropExiting,
    createWindow,
    closeWindow,
    resizeWindow,
    bringToFront,
  } = useWindowManager();

  // Sidebar
  const {
    sidebarOpen,
    sidebarClosing,
    searchQuery,
    setSearchQuery,
    expandedCategories,
    openSidebar,
    closeSidebar,
    toggleCategory,
    filterMenuItems,
  } = useSidebar();

  // Ongoing panel
  const [ongoingExpanded, setOngoingExpanded] = React.useState(false);

  // Filtered menu derived from search
  const filteredMenu = filterMenuItems(menuStructure, searchQuery);

  /* ─── Handlers ─── */
  const handleSidebarToggle = (open) => {
    open ? openSidebar() : closeSidebar();
  };

  // Sidebar leaf click  → open window + close sidebar
  const handleMenuItemClick = (item) => {
    createWindow(item.title, item.data, item.id);
    closeSidebar();
  };

  // Bottom nav / FAB click  → open window, keep sidebar alone
  const handleBottomNavClick = (item) => {
    createWindow(`${item.label} Module`, item.data, null);
  };

  const handleFABClick = (btn) => {
    createWindow(btn.label, btn.data, null);
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      height: '100vh',
      width: '100vw',
      margin: 0,
      position: 'fixed',
      top: 0,
      left: 0,
    }}>

      {/* ── Top bar ── */}
      <Navbar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleSidebarToggle}
      />

      {/* ── Sidebar ── */}
      <Sidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        sidebarClosing={sidebarClosing}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        expandedCategories={expandedCategories}
        activeMenu={activeMenu}
        filteredMenu={filteredMenu}
        onClose={closeSidebar}
        onToggleCategory={toggleCategory}
        onMenuItemClick={handleMenuItemClick}
      />

      {/* ── Ongoing (left edge) ── */}
      <OngoingPanel
        isMobile={isMobile}
        expanded={ongoingExpanded}
        windows={windows}
        onExpand={() => setOngoingExpanded(true)}
        onCollapse={() => setOngoingExpanded(false)}
      />

      {/* ── Modal backdrop ── */}
      {windows.length > 0 && (
        <div
          className={backdropExiting ? 'backdrop-exiting' : 'backdrop-entering'}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 2999,
            pointerEvents: 'all',
            cursor: 'not-allowed',
          }}
        />
      )}

      {/* ── Popup windows ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 3000,
      }}>
        {windows.map((win, index) => {
          const isTopWindow = windows.every((w) => w.id === win.id || w.zIndex <= win.zIndex);
          const isExiting = exitingWindows.includes(win.id);

          return (
            <React.Fragment key={win.id}>
              {/* Per-window dim layer for non-top windows */}
              {!isTopWindow && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    zIndex: win.zIndex,
                    pointerEvents: 'all',
                    cursor: 'not-allowed',
                  }}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                />
              )}

              <ModalWindow
                id={win.id}
                title={win.title}
                zIndex={win.zIndex + 1}
                size={win.size}
                isMobile={isMobile}
                windowIndex={index}
                isTopWindow={isTopWindow}
                isExiting={isExiting}
                onClose={() => closeWindow(win.id)}
                onResize={(mode) => resizeWindow(win.id, mode)}
                onBringToFront={() => bringToFront(win.id)}
              >
                {renderWindowContent(win, isMobile, windows, createWindow)}
              </ModalWindow>
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Hero / landing content ── */}
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '60px',
        paddingBottom: '95px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}>
        <h1 style={{
          fontSize: isMobile ? '2.5rem' : '6rem',
          fontWeight: 'bold',
          color: '#0062AF',
          opacity: 0.25,
          letterSpacing: isMobile ? '4px' : '8px',
          margin: 0,
          lineHeight: 1,
        }}>
          SIGNET
        </h1>
        <p style={{ color: '#6c757d', fontSize: isMobile ? '0.85rem' : '1rem', marginTop: '10px' }}>
          Multi-Dimensional Data Portal
        </p>
        {!isMobile && (
          <p style={{ color: '#6c757d', marginTop: '20px', fontSize: '0.9rem' }}>
            Click menu items to open multiple windows
          </p>
        )}
      </div>

      {/* ── FAB ── */}
      <ActionFAB isMobile={isMobile} onButtonClick={handleFABClick} />

      {/* ── Bottom nav ── */}
      <BottomNav isMobile={isMobile} onItemClick={handleBottomNavClick} />
    </div>
  );
};

export default Dashboard;
