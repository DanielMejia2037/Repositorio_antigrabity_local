import type { User } from '@/types/auth';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Daniel Mejia', email: 'admin@flit.com', role: 'admin', avatarInitials: 'DM' },
  { id: '2', name: 'Ana García', email: 'viewer@flit.com', role: 'viewer', avatarInitials: 'AG' },
];

export const VALID_CREDENTIALS: Record<string, string> = {
  'admin@flit.com': 'admin123',
  'viewer@flit.com': 'viewer123',
};
