import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ScoreCard from '../components/ScoreCard';
import RecommendationCard from '../components/RecommendationCard';

interface ScoreItem {
  category: string;
  score: number;
  weight: number;
}

const DEFAULT_SCORE_DATA: ScoreItem[] = [
  { category: 'Operational Readiness', score: 65, weight: 0.2 },
  { category: 'Team Strength', score: 80, weight: 0.2 },
  { category: 'Market Fit', score: 70, weight: 0.2 },
  { category: 'Narrative & Innovation', score: 85, weight: 0.25 },
  { category: 'Geo-Ecosystem', score: 55, weight: 0.15 },
];

const DEFAULT_RECOMMENDATIONS = [
  {
    title: 'Team Development',
    status: 'good' as const,
    recommendations: [
      'Strong technical team composition with experienced founders.',
      'Consider adding advisors with industry-specific expertise.',
      'Maintain the current leadership structure which demonstrates clear roles.',
    ],
  },
  {
    title: 'Market Strategy',
    status: 'warning' as const,
    recommendations: [
      'Further define your target market segments to improve positioning.',
      'Conduct additional customer interviews to validate product-market fit.',
      'Develop a more detailed competitive analysis to highlight unique advantages.',
    ],
  },
  {
    title: 'Geo-Ecosystem Utilization',
    status: 'bad' as const,
    recommendations: [
      'Consider participating in local accelerator programs to improve network.',
      'Leverage nearby university partnerships for talent acquisition.',
      'Attend regional investor events to increase visibility in your ecosystem.',
    ],
  },
];

function getScoreDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'Operational Readiness':
      'Assessment of your business processes, operational efficiency, and scalability potential.',
    'Team Strength':
      "Evaluation of your team's experience, diversity, technical skills, and leadership capabilities.",
    'Market Fit':
      'Analysis of your product-market fit, addressable market size, and competitive positioning.',
    'Narrative & Innovation':
      'Assessment of your product innovation, unique value proposition, and storytelling capability.',
    'Geo-Ecosystem':
      "Evaluation of your location's startup ecosystem, access to resources, and regional advantages.",
  };
  return descriptions[category] ?? 'Score component analysis';
}

const Results = () => {
  const [scoreData, setScoreData] = useState<ScoreItem[]>(DEFAULT_SCORE_DATA);
  const [overallScore, setOverallScore] = useState(72);
  const [companyName, setCompanyName] = useState('TechStartup Inc.');
  const [recommendations, setRecommendations] = useState(DEFAULT_RECOMMENDATIONS);

  useEffect(() => {
    const savedData = sessionStorage.getItem('scoreData');
    if (!savedData) return;
    try {
      const parsed = JSON.parse(savedData);
      if (parsed.scoreBreakdown) {
        const b = parsed.scoreBreakdown;
        setScoreData([
          { category: 'Operational Readiness', score: b.operationalReadiness, weight: 0.2 },
          { category: 'Team Strength', score: b.teamStrength, weight: 0.2 },
          { category: 'Market Fit', score: b.marketFit, weight: 0.2 },
          { category: 'Narrative & Innovation', score: b.narrativeAndInnovation, weight: 0.25 },
          { category: 'Geo-Ecosystem', score: b.geoEcosystem, weight: 0.15 },
        ]);
        setOverallScore(b.overallScore);
      }
      if (parsed.companyName) setCompanyName(parsed.companyName);
      if (parsed.recommendations) setRecommendations(parsed.recommendations);
    } catch (e) {
      console.error('Error parsing saved data:', e);
    }
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getOverallScoreBadge = () => {
    if (overallScore >= 80) return { className: 'bg-emerald-100 text-emerald-800', text: 'Investor Ready' };
    if (overallScore >= 60) return { className: 'bg-amber-100 text-amber-800', text: 'Approaching Ready' };
    return { className: 'bg-red-100 text-red-800', text: 'Needs Improvement' };
  };

  const getOverallScoreColor = () => {
    if (overallScore >= 80) return 'text-emerald-600';
    if (overallScore >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const chartData = scoreData.map((item) => ({
    name: item.category.split(' ')[0],
    score: item.score,
  }));

  const handleDownloadReport = () => {
    alert('Report download functionality would be implemented here.');
  };

  const operationalScore = scoreData.find((s) => s.category === 'Operational Readiness');
  const hasMarketStrategyWarning = recommendations.some(
    (r) => r.title === 'Market Strategy' && r.status !== 'good'
  );

  return (
    <div className="min-h-screen py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">
              Capital Readiness Score
            </h1>
            <p className="text-slate-600 mt-1">{companyName}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-button border border-slate-300 bg-surface-elevated text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Download className="h-4 w-4" aria-hidden /> Download Report
            </button>
            <Link
              to="/intake"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-button bg-brand-600 text-white font-medium hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <RefreshCw className="h-4 w-4" aria-hidden /> Update Data
            </Link>
          </div>
        </div>

        {/* Overall score + chart */}
        <div className="bg-surface-elevated rounded-card shadow-card border border-slate-100 p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center md:items-start shrink-0">
              <span className={`font-display text-6xl font-bold tabular-nums ${getOverallScoreColor()}`}>
                {overallScore}
              </span>
              <span
                className={`mt-2 inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${getOverallScoreBadge().className}`}
              >
                {getOverallScoreBadge().text}
              </span>
            </div>
            <div className="w-full flex-1 min-h-[260px]">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 'var(--radius-button)',
                      border: '1px solid #e2e8f0',
                    }}
                    formatter={(value: number) => [value, 'Score']}
                    labelFormatter={(label) => `Category: ${label}`}
                  />
                  <Bar dataKey="score" fill="var(--brand-500)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Score Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {scoreData.map((item) => (
            <ScoreCard
              key={item.category}
              score={item.score}
              category={item.category}
              color={getScoreColor(item.score)}
              description={getScoreDescription(item.category)}
            />
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Recommendations</h2>
        <div className="space-y-6 mb-12">
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={index}
              title={rec.title}
              status={rec.status}
              recommendations={rec.recommendations}
            />
          ))}
        </div>

        {/* Next steps */}
        <div className="bg-brand-50 border border-brand-200 rounded-card p-6">
          <h2 className="font-display text-xl font-bold text-brand-900 mb-4">Next Steps</h2>
          <p className="text-brand-800 mb-4">
            Based on your current score of {overallScore}, we recommend focusing on the following to
            improve your capital readiness:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-brand-800 pl-2">
            <li>
              {overallScore < 70
                ? 'Strengthen your geo-ecosystem connections through networking and local resources.'
                : 'Continue to leverage your strong ecosystem position for partnerships and resources.'}
            </li>
            <li>
              {hasMarketStrategyWarning
                ? 'Refine your market strategy with more detailed customer segmentation.'
                : 'Maintain your strong market positioning and continue gathering customer feedback.'}
            </li>
            <li>
              {(operationalScore?.score ?? 0) < 70
                ? 'Improve operational documentation to demonstrate scalability to investors.'
                : 'Continue to optimize your operational efficiency to maintain investor confidence.'}
            </li>
          </ol>
          <div className="mt-6">
            <Link
              to="/intake"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-button bg-brand-600 text-white font-medium hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Update Your Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
