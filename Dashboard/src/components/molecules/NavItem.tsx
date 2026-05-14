import { NavLink } from 'react-router-dom';
import type { IconName } from '@/components/atoms/Icon';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  label: string;
  icon: IconName;
  collapsed?: boolean;
}

export function NavItem({ to, label, icon, collapsed = false }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:bg-slate-700 hover:text-white',
        )
      }
      title={collapsed ? label : undefined}
    >
      <Icon name={icon} size={18} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
