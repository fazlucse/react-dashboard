export const bottomNavItems = [
  { code: 'MS', label: 'MARGIN SHEET', data: { module: 'margin', value: 12.5 } },
  { code: 'PC', label: 'PURCHASE', data: { module: 'purchase', orders: 23 } },
  { code: 'UAC', label: 'ACCESS', data: { module: 'access', level: 'admin' } },
  { code: 'MN', label: 'MENU', data: { module: 'menu' } },
  { code: 'OR', label: 'ORDER', data: { module: 'order', pending: 15 } },
  { code: 'CI', label: 'INVOICE', data: { module: 'invoice', count: 34 } },
  { code: 'BA', label: 'BANK', data: { module: 'bank', balance: 98765.43 } },
];

export const actionButtons = [
  { icon: '📅', color: '#0062AF', label: 'Calendar', data: { events: 5, today: '2026-01-28' } },
  { icon: '📎', color: '#0062AF', label: 'Attachments', data: { files: 12, size: '45MB' } },
  { icon: '📶', color: '#0062AF', label: 'Network', data: { status: 'online', speed: '100Mbps' } },
  { icon: '🎧', color: '#28a745', label: 'Support', data: { available: true, queue: 3 } },
];
