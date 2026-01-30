// src/hooks/useWindowManager.js
import { useState, useCallback } from 'react';

export function useWindowManager() {
    const [windows, setWindows] = useState([]);
    const [exitingWindows, setExitingWindows] = useState([]);
    const [globalZIndex, setGlobalZIndex] = useState(4000);
    const [activeMenu, setActiveMenu] = useState(null);

    const createWindow = useCallback((title, data = {}, menuId = null, fromBottomNav = false) => {
        const id = `win-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        const newWindow = {
            id,
            title,
            data,
            menuId,
            size: 'default',
            zIndex: globalZIndex + 1,
            previousSize: null,           // used for restore after max/min
        };

        setWindows(prev => [...prev, newWindow]);
        setGlobalZIndex(prev => prev + 1);
        setActiveMenu(menuId);

        return id; // optional: return newly created id
    }, [globalZIndex]);

    const closeWindow = useCallback((id) => {
        setExitingWindows(prev => [...prev, id]);

        setTimeout(() => {
            setWindows(prev => prev.filter(w => w.id !== id));
            setExitingWindows(prev => prev.filter(wid => wid !== id));

            // After removal → update active menu
            setWindows(currentWindows => {
                if (currentWindows.length === 0) {
                    setActiveMenu(null);
                    return currentWindows;
                }

                const topWindow = currentWindows.reduce((max, w) =>
                    w.zIndex > max.zIndex ? w : max
                );
                setActiveMenu(topWindow?.menuId ?? null);
                return currentWindows;
            });
        }, 380); // slightly longer than animation
    }, []);

    const toggleWindowSize = useCallback((id, mode) => {   // 'min' or 'max'
        setWindows(prev =>
            prev.map(w => {
                if (w.id !== id) return w;

                if (mode === 'max') {
                    if (w.size === 'maximize') {
                        return { ...w, size: w.previousSize || 'default', previousSize: null };
                    }
                    return { ...w, size: 'maximize', previousSize: w.size };
                }

                if (mode === 'min') {
                    if (w.size === 'minimize') {
                        return { ...w, size: w.previousSize || 'default', previousSize: null };
                    }
                    return { ...w, size: 'minimize', previousSize: w.size };
                }

                return w;
            })
        );
    }, []);

    const bringToFront = useCallback((id) => {
        setWindows(prev => {
            const target = prev.find(w => w.id === id);
            if (!target) return prev;

            const newZ = globalZIndex + 1;
            setGlobalZIndex(newZ);

            return prev.map(w =>
                w.id === id ? { ...w, zIndex: newZ } : w
            );
        });

        const window = windows.find(w => w.id === id);
        if (window?.menuId) {
            setActiveMenu(window.menuId);
        }
    }, [globalZIndex, windows]);

    return {
        windows,
        exitingWindows,
        activeMenu,
        createWindow,
        closeWindow,
        toggleWindowSize,      // ← renamed from resizeWindow
        bringToFront,
    };
}
