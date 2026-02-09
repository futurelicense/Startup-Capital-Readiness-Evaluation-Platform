import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  recommendations: string[];
  status: 'good' | 'warning' | 'bad';
}

const statusConfig = {
  good: {
    icon: CheckCircle,
    iconClass: 'text-emerald-600',
    cardClass: 'border-emerald-200 bg-emerald-50/80',
    titleClass: 'text-emerald-800',
  },
  warning: {
    icon: AlertCircle,
    iconClass: 'text-amber-600',
    cardClass: 'border-amber-200 bg-amber-50/80',
    titleClass: 'text-amber-800',
  },
  bad: {
    icon: XCircle,
    iconClass: 'text-red-600',
    cardClass: 'border-red-200 bg-red-50/80',
    titleClass: 'text-red-800',
  },
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  recommendations,
  status,
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`border rounded-card p-5 ${config.cardClass} transition-shadow hover:shadow-card`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`h-6 w-6 shrink-0 ${config.iconClass}`} aria-hidden />
        <h3 className={`font-display text-lg font-semibold ${config.titleClass}`}>{title}</h3>
      </div>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="text-sm text-slate-700 leading-relaxed pl-0 flex gap-2">
            <span className="text-slate-400 mt-1.5">•</span>
            <span>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationCard;
