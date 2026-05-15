import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/components/organisms/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <span className="text-3xl font-bold text-white tracking-tight">
              Flit<span className="text-blue-400">Analytics</span>
            </span>
            <p className="mt-2 text-sm text-slate-400">
              Ingresa tus credenciales para continuar
            </p>
          </div>
          {/* Hint */}
          <div className="mb-6 rounded-xl bg-blue-900/40 px-4 py-3 text-xs text-blue-300">
            <strong>Demo:</strong> admin@flit.com / admin123
          </div>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Flit Workshop — Día 2
        </p>
      </div>
    </div>
  );
}
