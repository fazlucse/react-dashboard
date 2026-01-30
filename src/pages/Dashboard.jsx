import React, { useState, useEffect } from 'react';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import OngoingPanel from '../components/layout/OngoingPanel';
import ActionFab from '../components/layout/ActionFab';
import BottomNav from '../components/layout/BottomNav';
import ModalBackdrop from '../components/layout/ModalBackdrop';
import ModalWindow from '../components/window/ModalWindow';
import WindowContentRouter from '../components/content/WindowContentRouter';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { menuStructure, bottomNavItems, actionButtons } from '../data/menuData';

const SignetDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarClosing, setSidebarClosing] = useState(false);
    const [ongoingExpanded, setOngoingExpanded] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [windows, setWindows] = useState([]);
    const [exitingWindows, setExitingWindows] = useState([]);
    const [globalZIndex, setGlobalZIndex] = useState(4000);
    const [activeMenu, setActiveMenu] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [backdropExiting, setBackdropExiting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isMobile = useMediaQuery('(max-width: 768px)');

    // Toggle category expansion
    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    // Handle sidebar close with animation
    const handleCloseSidebar = () => {
        setSidebarClosing(true);
        setTimeout(() => {
            setSidebarOpen(false);
            setSidebarClosing(false);
            setSearchQuery('');
            setExpandedCategories({});
        }, 500);
    };

    // Create window with dynamic content
    const createWindow = (title, data = {}, menuId = null, fromBottomMenu = false) => {
        const newWindow = {
            id: `win-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            title,
            data,
            size: 'default',
            zIndex: globalZIndex + 1,
            menuId
        };
        setWindows([...windows, newWindow]);
        setGlobalZIndex(globalZIndex + 1);

        // Only close sidebar if not from bottom menu
        if (!fromBottomMenu) {
            handleCloseSidebar();
        }

        setMobileMenuOpen(false);
        setActiveMenu(menuId);
        setBackdropExiting(false);
    };

    const closeWindow = (id) => {
        const closedWindow = windows.find(w => w.id === id);

        setExitingWindows([...exitingWindows, id]);

        if (windows.length === 1) {
            setBackdropExiting(true);
        }

        setTimeout(() => {
            setWindows(prev => prev.filter(w => w.id !== id));
            setExitingWindows(prev => prev.filter(wid => wid !== id));

            if (closedWindow && windows.length > 1) {
                const remainingWindows = windows.filter(w => w.id !== id);
                const topWindow = remainingWindows.reduce((max, w) =>
                    w.zIndex > max.zIndex ? w : max, remainingWindows[0]
                );
                setActiveMenu(topWindow.menuId);
            } else if (windows.length === 1) {
                setActiveMenu(null);
                setBackdropExiting(false);
            }
        }, 350);
    };

    const resizeWindow = (id, mode) => {
        setWindows(windows.map(w => {
            if (w.id === id) {
                if (mode === 'max') {
                    // Maximize button: toggle between current state and 100%
                    if (w.size === 'maximize') {
                        // If already maximized, restore to previous size
                        return { ...w, size: w.previousSize || 'default' };
                    } else {
                        // If not maximized, save current size and maximize
                        return { ...w, size: 'maximize', previousSize: w.size };
                    }
                } else if (mode === 'min') {
                    // Minimize button: toggle between minimize and previous state
                    if (w.size === 'minimize') {
                        // If already minimized, restore to previous size
                        return { ...w, size: w.previousSize || 'default' };
                    } else {
                        // If not minimized, save current size and minimize
                        return { ...w, size: 'minimize', previousSize: w.size };
                    }
                }
            }
            return w;
        }));
    };

    const bringToFront = (id) => {
        const newZIndex = globalZIndex + 1;
        const window = windows.find(w => w.id === id);
        setWindows(windows.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w));
        setGlobalZIndex(newZIndex);
        if (window) {
            setActiveMenu(window.menuId);
        }
    };

    const handleMenuToggle = () => {
        if (sidebarOpen) {
            handleCloseSidebar();
        } else {
            setSidebarOpen(true);
            setSidebarClosing(false);
        }
    };

    const handleMenuItemClick = (item) => {
        createWindow(item.title, item.data, item.id);
    };

    const handleActionButtonClick = (btn) => {
        createWindow(btn.label, btn.data, null, true);
    };

    const handleBottomNavClick = (item) => {
        createWindow(`${item.label} Module`, item.data, null, true);
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
            left: 0
        }}>
            <TopNavbar
                onMenuToggle={handleMenuToggle}
                isMobile={isMobile}
            />

            <Sidebar
                isOpen={sidebarOpen}
                isClosing={sidebarClosing}
                isMobile={isMobile}
                searchQuery={searchQuery}
                onClose={handleCloseSidebar}
                onSearchChange={setSearchQuery}
                onItemClick={handleMenuItemClick}
                onToggleExpand={toggleCategory}
                activeMenu={activeMenu}
                expandedCategories={expandedCategories}
                menuItems={menuStructure}
            />

            <OngoingPanel
                isExpanded={ongoingExpanded}
                isMobile={isMobile}
                windows={windows}
                onToggle={setOngoingExpanded}
            />

            <ModalBackdrop
                isVisible={windows.length > 0}
                isExiting={backdropExiting}
            />

            {/* Popup Windows Container */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 3000
            }}>
                {windows.map((win, index) => {
                    const isTopWindow = windows.every(w => w.id === win.id || w.zIndex <= win.zIndex);
                    const isExiting = exitingWindows.includes(win.id);

                    return (
                        <ModalWindow
                            key={win.id}
                            id={win.id}
                            title={win.title}
                            zIndex={win.zIndex}
                            size={win.size}
                            isMobile={isMobile}
                            windowIndex={index}
                            totalWindows={windows.length}
                            isTopWindow={isTopWindow}
                            isExiting={isExiting}
                            onClose={() => closeWindow(win.id)}
                            onResize={(mode) => resizeWindow(win.id, mode)}
                            onBringToFront={() => bringToFront(win.id)}
                        >
                            <WindowContentRouter
                                window={win}
                                isMobile={isMobile}
                                windows={windows}
                                onCreateChildWindow={createWindow}
                            />
                        </ModalWindow>
                    );
                })}
            </div>

            {/* Main Content */}
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                paddingTop: '60px',
                paddingBottom: isMobile ? '95px' : '95px',
                paddingLeft: '20px',
                paddingRight: '20px'
            }}>
                <h1 style={{
                    fontSize: isMobile ? '2.5rem' : '6rem',
                    fontWeight: 'bold',
                    color: '#0062AF',
                    opacity: 0.25,
                    letterSpacing: isMobile ? '4px' : '8px',
                    margin: 0,
                    lineHeight: 1
                }}>SIGNET</h1>
                <p style={{
                    color: '#6c757d',
                    fontSize: isMobile ? '0.85rem' : '1rem',
                    marginTop: '10px'
                }}>Multi-Dimensional Data Portal</p>
                {!isMobile && (
                    <p style={{ color: '#6c757d', marginTop: '20px', fontSize: '0.9rem' }}>
                        Click menu items to open multiple windows
                    </p>
                )}
            </div>

            <ActionFab
                isMobile={isMobile}
                isMenuOpen={mobileMenuOpen}
                actionButtons={actionButtons}
                onButtonClick={handleActionButtonClick}
                onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            />

            <BottomNav
                items={bottomNavItems}
                isMobile={isMobile}
                onItemClick={handleBottomNavClick}
            />
        </div>
    );
};

export default SignetDashboard;
