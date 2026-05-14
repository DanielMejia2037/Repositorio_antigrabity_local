import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { REVENUE_DATA } from '@/mocks/charts';
import { formatCurrency } from '@/lib/utils';

export function RevenueLineChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="revenue"
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={55}
        />
        <YAxis
          yAxisId="orders"
          orientation="right"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value: number, name: string) =>
            name === 'revenue' ? [formatCurrency(value), 'Ingresos'] : [value, 'Pedidos']
          }
          contentStyle={{
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Legend
          formatter={(value) => (value === 'revenue' ? 'Ingresos' : 'Pedidos')}
          iconType="circle"
          iconSize={8}
        />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="orders"
          type="monotone"
          dataKey="orders"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
