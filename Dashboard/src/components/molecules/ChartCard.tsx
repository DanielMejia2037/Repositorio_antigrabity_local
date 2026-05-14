import type { ReactNode } from 'react';
import { Card } from '@/components/atoms/Card';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card padding="md" className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        {description && (
          <p className="text-xs text-slate-400">{description}</p>
        )}
      </div>
      <div className="w-full">{children}</div>
    </Card>
  );
}
