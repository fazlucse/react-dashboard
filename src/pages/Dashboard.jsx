import React, { useState, useEffect } from 'react';
import '../assets/styles/animations.css';
import useMediaQuery from '../hooks/useMediaQuery';
import { menuStructure, bottomNavItems, actionButtons } from '../data/menuData';
import TopNavbar from '../components/layout/TopNavbar';
import Sidebar from '../components/layout/Sidebar';
import OngoingPanel from '../components/layout/OngoingPanel';
import ActionFab from '../components/layout/ActionFab';
import BottomNav from '../components/layout/BottomNav';

const SignetDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarClosing, setSidebarClosing] = useState(false);
    const [ongoingExpanded, setOngoingExpanded] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [windows, setWindows] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    const isMobile = useMediaQuery('(max-width: 768px)');

    // Add handleCloseSidebar function
    const handleCloseSidebar = () => {
        setSidebarClosing(true);
        setTimeout(() => {
            setSidebarOpen(false);
            setSidebarClosing(false);
            setExpandedCategories({});
        }, 500);
    };

    const toggleSidebar = () => {
        if (sidebarOpen) {
            handleCloseSidebar();
        } else {
            setSidebarOpen(true);
            setSidebarClosing(false);
        }
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const createWindow = (title, data = {}, menuId = null) => {
        const newWindow = {
            id: `win-${Date.now()}`,
            title,
            data,
            size: 'default',
            zIndex: 1000 + windows.length
        };
        setWindows([...windows, newWindow]);
        setActiveMenu(menuId);
        handleCloseSidebar();
    };

    const handleMenuItemClick = (item) => {
        createWindow(item.title, item.data, item.id);
    };

    const handleActionButtonClick = (btn) => {
        createWindow(btn.label, btn.data);
    };

    const handleBottomNavClick = (item) => {
        createWindow(`${item.label} Module`, item.data);
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
                onToggleSidebar={toggleSidebar}
                isMobile={isMobile}
            />

            <Sidebar
                isOpen={sidebarOpen}
                isClosing={sidebarClosing}
                isMobile={isMobile}
                onClose={handleCloseSidebar}
                onItemClick={handleMenuItemClick}
                onToggleExpand={toggleCategory}
                menuItems={menuStructure}
                activeMenu={activeMenu}
                expandedCategories={expandedCategories}
            />

            <OngoingPanel
                isExpanded={ongoingExpanded}
                isMobile={isMobile}
                windows={windows}
                onToggle={setOngoingExpanded}
            />

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
