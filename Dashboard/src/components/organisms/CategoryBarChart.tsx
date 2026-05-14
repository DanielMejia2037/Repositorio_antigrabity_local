import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { CATEGORY_DATA } from '@/mocks/charts';
import { formatCurrency } from '@/lib/utils';

export function CategoryBarChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={CATEGORY_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
          contentStyle={{
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          cursor={{ fill: '#f8fafc' }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {CATEGORY_DATA.map((entry) => (
            <Cell key={entry.category} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
