import { useLocation } from 'react-router-dom';
import { UserMenu } from '@/components/molecules/UserMenu';

const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/reports': 'Reportes',
};

export function Header() {
  const { pathname } = useLocation();
  const pageTitle = routeLabels[pathname] ?? 'Analytics';

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-slate-800">{pageTitle}</h1>
        <p className="text-xs text-slate-400">
          {new Date().toLocaleDateString('es-CO', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
      </div>
      <UserMenu />
    </header>
  );
}
