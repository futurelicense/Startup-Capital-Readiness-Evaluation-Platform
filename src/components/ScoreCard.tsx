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
  description
}) => {
  const data = [{
    name: 'Score',
    value: score
  }, {
    name: 'Remaining',
    value: 100 - score
  }];
  const COLORS = [color, '#E5E7EB'];
  return <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{category}</h3>
        <span className="text-2xl font-bold" style={{
        color
      }}>
          {score}/100
        </span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} startAngle={90} endAngle={-270} dataKey="value">
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-600 text-sm mt-4">{description}</p>
    </div>;
};
export default ScoreCard;