export interface ReportRow {
  id: string;
  product: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
}

export type SortKey = keyof ReportRow;
export type SortDir = 'asc' | 'desc';

export interface SortState {
  key: SortKey;
  dir: SortDir;
}
