import React from 'react';
import MenuLabel from './MenuLabel';

const MenuItem = ({
                      item,
                      depth = 0,
                      index,
                      isActive,
                      isExpanded,
                      hasActiveChild,
                      sidebarClosing,
                      onItemClick,
                      onToggleExpand
                  }) => {
    const paddingLeft = 20 + (depth * 20);

    const handleClick = () => {
        if (item.children) {
            onToggleExpand(item.id);
        } else {
            onItemClick(item);
        }
    };

    return (
        <li
            className={sidebarClosing ? 'menu-item-exit' : 'menu-item-enter'}
            style={{
                overflow: 'hidden',
                animationDelay: sidebarClosing ? `${index * 0.03}s` : `${index * 0.05 + 0.2}s`
            }}
        >
            <div
                onClick={handleClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: `${depth === 0 ? '18px' : '12px'} ${paddingLeft}px`,
                    borderBottom: depth === 0 ? '1px solid #eee' : '1px solid #f0f0f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: depth === 0 ? '0.95rem' : '0.85rem',
                    backgroundColor: hasActiveChild ? '#1976d2' : (isActive ? '#e3f2fd' : 'transparent'),
                    color: hasActiveChild ? 'white' : 'inherit',
                    fontWeight: hasActiveChild ? 'bold' : 'normal',
                    transform: 'translateX(0)',
                    position: 'relative'
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
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ marginRight: '2px', transition: 'transform 0.3s ease' }}>{item.icon}</span>
                    {item.label}
                    {item.hasLabel && <MenuLabel labelText={item.labelText} labelColor={item.labelColor} />}
                </div>
                {item.children && (
                    <span
                        style={{
                            fontSize: '1.2rem',
                            padding: '0 5px',
                            color: hasActiveChild ? 'white' : '#0062AF',
                            fontWeight: 'bold',
                            transition: 'transform 0.3s ease',
                            display: 'inline-block',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    >
            {isExpanded ? '−' : '+'}
          </span>
                )}
            </div>

            {item.children && (
                <div
                    style={{
                        maxHeight: isExpanded ? '2000px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s ease, opacity 0.3s ease',
                        opacity: isExpanded ? 1 : 0,
                        background: depth === 0 ? '#f8f9fa' : '#fafafa'
                    }}
                >
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {item.children.map((child, childIdx) => (
                            <MenuItem
                                key={child.id}
                                item={child}
                                depth={depth + 1}
                                index={childIdx}
                                isActive={isActive}
                                isExpanded={isExpanded}
                                hasActiveChild={hasActiveChild}
                                sidebarClosing={sidebarClosing}
                                onItemClick={onItemClick}
                                onToggleExpand={onToggleExpand}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default MenuItem;
