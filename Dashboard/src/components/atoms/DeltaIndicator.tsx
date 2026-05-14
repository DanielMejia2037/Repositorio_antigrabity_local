import { cn } from '@/lib/utils';

interface DeltaIndicatorProps {
  delta: number;
  className?: string;
}

export function DeltaIndicator({ delta, className }: DeltaIndicatorProps) {
  const isPositive = delta >= 0;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-xs font-semibold',
        isPositive ? 'text-emerald-600' : 'text-red-500',
        className,
      )}
      aria-label={`${isPositive ? 'Incremento' : 'Decremento'} de ${Math.abs(delta)}%`}
    >
      <span aria-hidden="true">{isPositive ? '↑' : '↓'}</span>
      {Math.abs(delta).toFixed(1)}%
    </span>
  );
}
