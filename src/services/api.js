/**
 * API Service – placeholder for backend integration.
 * Each exported function returns a resolved promise with
 * the same shape the dashboard currently hard-codes.
 */

export const fetchDashboardStats = () =>
  Promise.resolve({ users: 1234, revenue: 45678 });

export const fetchAccountingBalance = () =>
  Promise.resolve({ balance: 123456.78 });

export const fetchSupportTickets = () =>
  Promise.resolve({ tickets: 42 });

export const fetchDocumentCount = () =>
  Promise.resolve({ count: 156 });

export const fetchUserTotal = () =>
  Promise.resolve({ total: 890 });
