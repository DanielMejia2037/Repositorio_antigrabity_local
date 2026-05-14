import { useState, useMemo } from 'react';
import { DataTable } from '@/components/organisms/DataTable';
import { MOCK_REPORTS } from '@/mocks/reports';

const ALL_CATEGORIES = ['Todas', ...Array.from(new Set(MOCK_REPORTS.map((r) => r.category))).sort()];

export function ReportsPage() {
  const [category, setCategory] = useState('Todas');

  const filtered = useMemo(
    () => (category === 'Todas' ? MOCK_REPORTS : MOCK_REPORTS.filter((r) => r.category === category)),
    [category],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-400">{filtered.length} productos encontrados</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            ].join(' ')}
          >
            {cat}
          </button>
        ))}
      </div>

      <DataTable data={filtered} pageSize={10} />
    </div>
  );
}
