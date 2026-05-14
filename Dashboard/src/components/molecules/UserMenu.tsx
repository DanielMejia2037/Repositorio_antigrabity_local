import { useState, useRef, useEffect } from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { useAuth } from '@/hooks/useAuth';

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Avatar initials={user.avatarInitials} size="sm" />
        <span className="hidden font-medium sm:block">{user.name}</span>
        <Icon name="chevron-down" size={14} className="text-slate-400" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-lg animate-fade-in"
        >
          <div className="border-b border-slate-100 px-4 py-2">
            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
          <div className="p-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-600"
              leftIcon={<Icon name="logout" size={15} />}
              onClick={() => { setOpen(false); logout(); }}
              role="menuitem"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
