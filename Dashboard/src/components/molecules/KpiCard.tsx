import type { KpiMetric } from '@/types/dashboard';
import { Card } from '@/components/atoms/Card';
import { DeltaIndicator } from '@/components/atoms/DeltaIndicator';
import { Icon } from '@/components/atoms/Icon';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';

interface KpiCardProps {
  metric: KpiMetric;
}

function formatValue(metric: KpiMetric): string {
  if (metric.unit === 'currency') return formatCurrency(metric.value);
  if (metric.unit === 'percent') return formatPercent(metric.value).replace('+', '') + '';
  return formatNumber(metric.value);
}

export function KpiCard({ metric }: KpiCardProps) {
  return (
    <Card className="flex flex-col gap-4 animate-fade-in">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{metric.label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon
            name={
              metric.id === 'total-revenue' ? 'dollar'
              : metric.id === 'new-clients' ? 'users'
              : metric.id === 'conversion-rate' ? 'chart'
              : 'tag'
            }
            size={18}
          />
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-bold text-slate-900">{formatValue(metric)}</p>
        <div className="flex items-center gap-1.5">
          <DeltaIndicator delta={metric.delta} />
          <span className="text-xs text-slate-400">{metric.description}</span>
        </div>
      </div>
    </Card>
  );
}
