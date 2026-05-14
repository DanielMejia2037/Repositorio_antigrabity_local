import type { ChartDataPoint, CategoryDataPoint } from '@/types/dashboard';

export const REVENUE_DATA: ChartDataPoint[] = [
  { month: 'Ene', revenue: 85000, orders: 620 },
  { month: 'Feb', revenue: 92000, orders: 680 },
  { month: 'Mar', revenue: 78000, orders: 590 },
  { month: 'Abr', revenue: 104000, orders: 750 },
  { month: 'May', revenue: 115000, orders: 820 },
  { month: 'Jun', revenue: 98000, orders: 710 },
  { month: 'Jul', revenue: 121000, orders: 870 },
  { month: 'Ago', revenue: 128450, orders: 843 },
  { month: 'Sep', revenue: 109000, orders: 790 },
  { month: 'Oct', revenue: 135000, orders: 920 },
  { month: 'Nov', revenue: 142000, orders: 980 },
  { month: 'Dic', revenue: 160000, orders: 1100 },
];

export const CATEGORY_DATA: CategoryDataPoint[] = [
  { category: 'Electrónica', value: 42000, fill: '#3b82f6' },
  { category: 'Ropa', value: 28000, fill: '#8b5cf6' },
  { category: 'Hogar', value: 21000, fill: '#10b981' },
  { category: 'Deportes', value: 17000, fill: '#f59e0b' },
  { category: 'Libros', value: 9000, fill: '#ef4444' },
];
