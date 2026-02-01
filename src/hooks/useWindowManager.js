import { useState, useCallback } from 'react';

const useWindowManager = () => {
  const [windows, setWindows] = useState([]);
  const [exitingWindows, setExitingWindows] = useState([]);
  const [globalZIndex, setGlobalZIndex] = useState(4000);
  const [activeMenu, setActiveMenu] = useState(null);
  const [backdropExiting, setBackdropExiting] = useState(false);

  const createWindow = useCallback((title, data = {}, menuId = null) => {
    setWindows((prev) => {
      const newZIndex = globalZIndex + 1;
      const newWindow = {
        id: `win-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title,
        data,
        size: 'default',
        zIndex: newZIndex,
        menuId,
      };
      setGlobalZIndex(newZIndex);
      setActiveMenu(menuId);
      setBackdropExiting(false);
      return [...prev, newWindow];
    });
  }, [globalZIndex]);

  const closeWindow = useCallback((id) => {
    setExitingWindows((prev) => [...prev, id]);

    setWindows((prev) => {
      if (prev.length === 1) {
        setBackdropExiting(true);
      }
      return prev;
    });

    setTimeout(() => {
      setWindows((prev) => {
        const remaining = prev.filter((w) => w.id !== id);
        if (remaining.length > 0) {
          const top = remaining.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), remaining[0]);
          setActiveMenu(top.menuId);
        } else {
          setActiveMenu(null);
          setBackdropExiting(false);
        }
        return remaining;
      });
      setExitingWindows((prev) => prev.filter((wid) => wid !== id));
    }, 350);
  }, []);

  const resizeWindow = useCallback((id, mode) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (mode === 'max') {
          return w.size === 'maximize'
            ? { ...w, size: w.previousSize || 'default' }
            : { ...w, size: 'maximize', previousSize: w.size };
        }
        if (mode === 'min') {
          return w.size === 'minimize'
            ? { ...w, size: w.previousSize || 'default' }
            : { ...w, size: 'minimize', previousSize: w.size };
        }
        return w;
      })
    );
  }, []);

  const bringToFront = useCallback((id) => {
    const newZIndex = globalZIndex + 1;
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          setActiveMenu(w.menuId);
          return { ...w, zIndex: newZIndex };
        }
        return w;
      })
    );
    setGlobalZIndex(newZIndex);
  }, [globalZIndex]);

  return {
    windows,
    exitingWindows,
    activeMenu,
    backdropExiting,
    createWindow,
    closeWindow,
    resizeWindow,
    bringToFront,
  };
};

export default useWindowManager;
