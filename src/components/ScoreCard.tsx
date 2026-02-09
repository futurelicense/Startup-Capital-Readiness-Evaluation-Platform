import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ScoreCardProps {
  score: number;
  category: string;
  color: string;
  description: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  score,
  category,
  color,
  description,
}) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];
  const COLORS = [color, '#E2E8F0'];

  return (
    <div className="bg-surface-elevated p-6 rounded-card shadow-card border border-slate-100 hover:shadow-card-hover hover:border-brand-100 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-slate-900">{category}</h3>
        <span className="text-2xl font-bold tabular-nums" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={64}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}`, 'Score']}
              contentStyle={{
                borderRadius: 'var(--radius-button)',
                border: '1px solid #e2e8f0',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed mt-4">{description}</p>
    </div>
  );
};

export default ScoreCard;
