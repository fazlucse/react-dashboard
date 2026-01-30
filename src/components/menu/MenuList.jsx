import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({
                      items,
                      activeMenu,
                      expandedCategories,
                      sidebarClosing,
                      onItemClick,
                      onToggleExpand,
                      searchQuery = ''
                  }) => {
    const filterMenuItems = (items, query) => {
        if (!query.trim()) return items;

        const lowerQuery = query.toLowerCase();

        return items.map(item => {
            const labelMatches = item.label.toLowerCase().includes(lowerQuery);
            const filteredChildren = item.children ? filterMenuItems(item.children, query) : [];

            if (labelMatches || filteredChildren.length > 0) {
                return {
                    ...item,
                    children: labelMatches ? item.children : filteredChildren
                };
            }
            return null;
        }).filter(Boolean);
    };

    const filteredItems = filterMenuItems(items, searchQuery);

    if (filteredItems.length === 0) {
        return (
            <li style={{
                padding: '20px',
                textAlign: 'center',
                color: '#6c757d',
                fontSize: '0.9rem'
            }}>
                No results found
            </li>
        );
    }

    return filteredItems.map((item, itemIdx) => {
        const isActive = activeMenu === item.id;
        const isExpanded = expandedCategories[item.id];
        const hasActiveChild = item.children?.some(child => {
            if (activeMenu === child.id) return true;
            if (child.children) {
                return child.children.some(subChild => activeMenu === subChild.id);
            }
            return false;
        });

        return (
            <MenuItem
                key={item.id}
                item={item}
                depth={0}
                index={itemIdx}
                isActive={isActive}
                isExpanded={isExpanded}
                hasActiveChild={hasActiveChild}
                sidebarClosing={sidebarClosing}
                onItemClick={onItemClick}
                onToggleExpand={onToggleExpand}
            />
        );
    });
};

export default MenuList;
