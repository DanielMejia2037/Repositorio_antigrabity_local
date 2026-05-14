export type KpiUnit = 'currency' | 'percent' | 'number';

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  delta: number;
  unit: KpiUnit;
  description: string;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategoryDataPoint {
  category: string;
  value: number;
  fill: string;
}
