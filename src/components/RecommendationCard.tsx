import React from 'react';
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from 'lucide-react';
interface RecommendationCardProps {
  title: string;
  recommendations: string[];
  status: 'good' | 'warning' | 'bad';
}
const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  recommendations,
  status
}) => {
  const getStatusIcon = () => {
    if (status === 'good') {
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    } else if (status === 'warning') {
      return <AlertCircleIcon className="h-6 w-6 text-yellow-500" />;
    } else {
      return <XCircleIcon className="h-6 w-6 text-red-500" />;
    }
  };
  const getStatusClass = () => {
    if (status === 'good') {
      return 'border-green-200 bg-green-50';
    } else if (status === 'warning') {
      return 'border-yellow-200 bg-yellow-50';
    } else {
      return 'border-red-200 bg-red-50';
    }
  };
  return <div className={`border rounded-lg p-4 ${getStatusClass()}`}>
      <div className="flex items-center mb-3">
        {getStatusIcon()}
        <h3 className="ml-2 text-lg font-medium">{title}</h3>
      </div>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => <li key={index} className="text-sm text-gray-700">
            {rec}
          </li>)}
      </ul>
    </div>;
};
export default RecommendationCard;