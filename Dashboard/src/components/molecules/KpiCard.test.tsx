import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KpiCard } from './KpiCard';
import type { KpiMetric } from '@/types/dashboard';

const positiveMetric: KpiMetric = {
  id: 'total-revenue',
  label: 'Ingresos Totales',
  value: 128450,
  delta: 12.5,
  unit: 'currency',
  description: 'vs mes anterior',
};

const negativeMetric: KpiMetric = {
  id: 'new-clients',
  label: 'Nuevos Clientes',
  value: 843,
  delta: -3.2,
  unit: 'number',
  description: 'vs mes anterior',
};

describe('KpiCard', () => {
  it('renders label and description', () => {
    render(<KpiCard metric={positiveMetric} />);
    expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
    expect(screen.getByText('vs mes anterior')).toBeInTheDocument();
  });

  it('shows positive delta indicator', () => {
    render(<KpiCard metric={positiveMetric} />);
    const delta = screen.getByLabelText(/incremento/i);
    expect(delta).toHaveClass('text-emerald-600');
  });

  it('shows negative delta indicator', () => {
    render(<KpiCard metric={negativeMetric} />);
    const delta = screen.getByLabelText(/decremento/i);
    expect(delta).toHaveClass('text-red-500');
  });

  it('formats currency value', () => {
    render(<KpiCard metric={positiveMetric} />);
    expect(screen.getByText(/\$128/)).toBeInTheDocument();
  });
});
