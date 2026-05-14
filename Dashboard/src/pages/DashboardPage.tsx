import { KpiGrid } from '@/components/organisms/KpiGrid';
import { RevenueLineChart } from '@/components/organisms/RevenueLineChart';
import { CategoryBarChart } from '@/components/organisms/CategoryBarChart';
import { DataTable } from '@/components/organisms/DataTable';
import { ChartCard } from '@/components/molecules/ChartCard';
import { MOCK_REPORTS } from '@/mocks/reports';

export function DashboardPage() {
  const preview = MOCK_REPORTS.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <KpiGrid />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Ingresos y Pedidos" description="Evolución mensual del año en curso">
          <RevenueLineChart />
        </ChartCard>
        <ChartCard title="Ingresos por Categoría" description="Distribución del período actual">
          <CategoryBarChart />
        </ChartCard>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">Top Productos</h2>
          <a href="/reports" className="text-sm font-medium text-blue-600 hover:underline">
            Ver todos →
          </a>
        </div>
        <DataTable data={preview} pageSize={5} />
      </div>
    </div>
  );
}
