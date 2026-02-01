const menuStructure = [
  {
    id: 'dashboard',
    icon: '📊',
    label: 'Dashboard',
    title: 'Dashboard Control',
    hasLabel: true,
    labelText: 'NEW',
    labelColor: '#28a745',
    data: { type: 'dashboard', stats: { users: 1234, revenue: 45678 } },
    children: [
      { id: 'analytics', icon: '📈', label: 'Analytics', title: 'Analytics Overview', data: { type: 'analytics' } },
      { id: 'reports', icon: '📄', label: 'Reports', title: 'Report Center', data: { type: 'reports' } },
      { id: 'charts', icon: '📊', label: 'Charts', title: 'Chart Builder', data: { type: 'charts' } },
    ]
  },
  {
    id: 'accounting',
    icon: '📈',
    label: 'Accounting',
    title: 'Financial Ledger',
    hasLabel: true,
    labelText: 'HOT',
    labelColor: '#dc3545',
    data: { type: 'accounting', balance: 123456.78 },
    children: [
      {
        id: 'transactions',
        icon: '💰',
        label: 'Transactions',
        title: 'Transaction Management',
        data: { type: 'transactions' },
        children: [
          { id: 'trans-income', icon: '💵', label: 'Income Transactions', title: 'Income Transactions', data: { type: 'income-trans' } },
          { id: 'trans-expense', icon: '💸', label: 'Expense Transactions', title: 'Expense Transactions', data: { type: 'expense-trans' } },
          { id: 'trans-transfer', icon: '🔄', label: 'Transfer Transactions', title: 'Transfer Transactions', data: { type: 'transfer-trans' } },
          { id: 'trans-recurring', icon: '🔁', label: 'Recurring Transactions', title: 'Recurring Transactions', data: { type: 'recurring-trans' } },
        ]
      },
      { id: 'invoices', icon: '🧾', label: 'Invoices', title: 'Invoice Management', data: { type: 'invoices' } },
      { id: 'expenses', icon: '💸', label: 'Expenses', title: 'Expense Tracking', data: { type: 'expenses' } },
    ]
  },
  {
    id: 'support',
    icon: '🎧',
    label: 'Support Center',
    title: 'Customer Support',
    data: { type: 'support', tickets: 42 },
    children: [
      { id: 'tickets', icon: '🎫', label: 'Tickets', title: 'Support Tickets', data: { type: 'tickets' } },
      { id: 'chat', icon: '💬', label: 'Live Chat', title: 'Chat Support', data: { type: 'chat' } },
      { id: 'knowledge', icon: '📚', label: 'Knowledge Base', title: 'Knowledge Base', data: { type: 'knowledge' } },
    ]
  },
  {
    id: 'documents',
    icon: '📁',
    label: 'Documents',
    title: 'Document Manager',
    hasLabel: true,
    labelText: 'PRO',
    labelColor: '#ffc107',
    data: { type: 'documents', count: 156 },
    children: [
      { id: 'files', icon: '📄', label: 'Files', title: 'File Browser', data: { type: 'files' } },
      { id: 'templates', icon: '📋', label: 'Templates', title: 'Document Templates', data: { type: 'templates' } },
      { id: 'archive', icon: '🗄️', label: 'Archive', title: 'Document Archive', data: { type: 'archive' } },
    ]
  },
  {
    id: 'users',
    icon: '👥',
    label: 'Users',
    title: 'User Management',
    data: { type: 'users', total: 890 },
    children: [
      { id: 'list', icon: '📋', label: 'User List', title: 'All Users', data: { type: 'userlist' } },
      { id: 'roles', icon: '🎭', label: 'Roles', title: 'Role Management', data: { type: 'roles' } },
      { id: 'permissions', icon: '🔐', label: 'Permissions', title: 'Permission Settings', data: { type: 'permissions' } },
    ]
  },
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    title: 'System Settings',
    data: { type: 'settings' },
    children: [
      {
        id: 'person',
        icon: '👤',           // changed icon to more fitting
        label: 'Persons',
        title: 'Person Management',
        data: { type: 'person' },   // ← important: this type will be used in router
      },
      { id: 'general', icon: '🔧', label: 'General', title: 'General Settings', data: { type: 'general' } },
      { id: 'security', icon: '🔒', label: 'Security', title: 'Security Settings', data: { type: 'security' } },
      { id: 'integrations', icon: '🔌', label: 'Integrations', title: 'Integration Settings', data: { type: 'integrations' } },
    ]
  },
];

export default menuStructure;
