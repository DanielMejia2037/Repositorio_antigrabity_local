import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthContextValue, LoginCredentials, User } from '@/types/auth';
import { MOCK_USERS, VALID_CREDENTIALS } from '@/mocks/auth';

const STORAGE_KEY = 'flit_auth_user';

export const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(loadUser);

  const login = useCallback(async ({ email, password }: LoginCredentials): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 400)); // simulate network
    const validPassword = VALID_CREDENTIALS[email];
    if (!validPassword || validPassword !== password) return false;
    const found = MOCK_USERS.find((u) => u.email === email) ?? null;
    if (!found) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    setUser(found);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
