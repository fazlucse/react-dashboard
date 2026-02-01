import { useState, useCallback } from 'react';

const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarClosing, setSidebarClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    setSidebarClosing(false);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarClosing(true);
    setTimeout(() => {
      setSidebarOpen(false);
      setSidebarClosing(false);
      setSearchQuery('');
      setExpandedCategories({});
    }, 500);
  }, []);

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }, []);

  // Recursive filter: keeps a parent if it or any descendant matches
  const filterMenuItems = useCallback((items, query) => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();

    return items
      .map((item) => {
        const labelMatch = item.label.toLowerCase().includes(lower);
        const filteredChildren = item.children ? filterMenuItems(item.children, query) : [];

        if (labelMatch || filteredChildren.length > 0) {
          return { ...item, children: labelMatch ? item.children : filteredChildren };
        }
        return null;
      })
      .filter(Boolean);
  }, []);

  return {
    sidebarOpen,
    sidebarClosing,
    searchQuery,
    setSearchQuery,
    expandedCategories,
    openSidebar,
    closeSidebar,
    toggleCategory,
    filterMenuItems,
  };
};

export default useSidebar;
