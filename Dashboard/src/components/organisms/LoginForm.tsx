import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Completa todos los campos.');
      return;
    }
    setLoading(true);
    const ok = await login({ email, password });
    setLoading(false);
    if (ok) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Credenciales incorrectas. Intenta con admin@flit.com / admin123');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-label="Formulario de inicio de sesión">
      <FormField
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        placeholder="admin@flit.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {error}
        </p>
      )}
      <Button type="submit" variant="warning" loading={loading} size="lg" className="w-full">
        Iniciar sesión
      </Button>
    </form>
  );
}
