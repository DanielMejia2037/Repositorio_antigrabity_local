import { useState } from 'react';
import { NavItem } from '@/components/molecules/NavItem';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/atoms/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-slate-900 transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
      )}
      aria-label="Navegación principal"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-700">
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-tight">
            Flit<span className="text-blue-400">Analytics</span>
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <Icon name={collapsed ? 'chevron-right' : 'menu'} size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <NavItem to="/dashboard" label="Dashboard" icon="dashboard" collapsed={collapsed} />
        <NavItem to="/reports" label="Reportes" icon="reports" collapsed={collapsed} />
      </nav>

      {/* Footer */}
      {user && (
        <div className={cn(
          'flex items-center gap-3 border-t border-slate-700 p-3',
          collapsed && 'justify-center',
        )}>
          <Avatar initials={user.avatarInitials} size="sm" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-400">{user.role}</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
