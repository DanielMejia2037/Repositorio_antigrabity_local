import { useState } from 'react';
import type { ReportRow, SortKey } from '@/types/reports';
import { SortableHeader } from '@/components/molecules/SortableHeader';
import { Badge } from '@/components/atoms/Badge';
import { useSort } from '@/hooks/useSort';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface DataTableProps {
  data: ReportRow[];
  pageSize?: number;
}

const CATEGORY_VARIANTS: Record<string, 'info' | 'success' | 'warning' | 'error' | 'neutral'> = {
  Electrónica: 'info',
  Ropa: 'neutral',
  Hogar: 'success',
  Deportes: 'warning',
  Libros: 'error',
};

export function DataTable({ data, pageSize = 10 }: DataTableProps) {
  const { sortedData, sortKey, sortDir, toggleSort } = useSort<ReportRow>(data, 'revenue');
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const pageData = sortedData.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[640px] border-collapse bg-white text-sm">
          <thead className="bg-slate-50">
            <tr>
              <SortableHeader label="Producto" sortKey="product" currentKey={sortKey} currentDir={sortDir} onSort={toggleSort} />
              <SortableHeader label="Categoría" sortKey="category" currentKey={sortKey} currentDir={sortDir} onSort={toggleSort} />
              <SortableHeader label="Ventas" sortKey="sales" currentKey={sortKey} currentDir={sortDir} onSort={toggleSort} />
              <SortableHeader label="Ingresos" sortKey="revenue" currentKey={sortKey} currentDir={sortDir} onSort={toggleSort} />
              <SortableHeader label="Crecimiento" sortKey="growth" currentKey={sortKey} currentDir={sortDir} onSort={toggleSort} />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageData.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{row.product}</td>
                <td className="px-4 py-3">
                  <Badge variant={CATEGORY_VARIANTS[row.category] ?? 'neutral'}>
                    {row.category}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.sales.toLocaleString()}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{formatCurrency(row.revenue)}</td>
                <td className="px-4 py-3">
                  <span className={row.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                    {formatPercent(row.growth)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>
            Mostrando {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sortedData.length)} de {sortedData.length}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="rounded-lg px-3 py-1.5 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
