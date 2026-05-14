import type { SortKey, SortDir } from '@/types/reports';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

interface SortableHeaderProps {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
}

export function SortableHeader({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
}: SortableHeaderProps) {
  const isActive = currentKey === sortKey;
  return (
    <th scope="col" className="px-4 py-3 text-left">
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          'flex items-center gap-1 text-xs font-semibold uppercase tracking-wide',
          'transition-colors hover:text-blue-600',
          isActive ? 'text-blue-600' : 'text-slate-500',
        )}
        aria-label={`Ordenar por ${label} ${isActive && currentDir === 'asc' ? 'descendente' : 'ascendente'}`}
      >
        {label}
        <span className="flex flex-col">
          <Icon
            name="chevron-up"
            size={10}
            className={cn(isActive && currentDir === 'asc' ? 'text-blue-600' : 'text-slate-300')}
          />
          <Icon
            name="chevron-down"
            size={10}
            className={cn(isActive && currentDir === 'desc' ? 'text-blue-600' : 'text-slate-300')}
          />
        </span>
      </button>
    </th>
  );
}
