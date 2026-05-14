import type { KpiMetric } from '@/types/dashboard';

export const MOCK_KPIS: KpiMetric[] = [
  {
    id: 'total-revenue',
    label: 'Ingresos Totales',
    value: 128450,
    delta: 12.5,
    unit: 'currency',
    description: 'vs mes anterior',
  },
  {
    id: 'new-clients',
    label: 'Nuevos Clientes',
    value: 843,
    delta: -3.2,
    unit: 'number',
    description: 'vs mes anterior',
  },
  {
    id: 'conversion-rate',
    label: 'Tasa de Conversión',
    value: 4.7,
    delta: 0.8,
    unit: 'percent',
    description: 'vs mes anterior',
  },
  {
    id: 'avg-ticket',
    label: 'Ticket Promedio',
    value: 152.3,
    delta: -1.4,
    unit: 'currency',
    description: 'vs mes anterior',
  },
];
