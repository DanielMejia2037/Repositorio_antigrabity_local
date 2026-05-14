import { MOCK_KPIS } from '@/mocks/kpis';
import { KpiCard } from '@/components/molecules/KpiCard';

export function KpiGrid() {
  return (
    <section aria-label="Métricas clave" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {MOCK_KPIS.map((metric) => (
        <KpiCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}
