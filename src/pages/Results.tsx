import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon, RefreshCwIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ScoreCard from '../components/ScoreCard';
import RecommendationCard from '../components/RecommendationCard';
const Results = () => {
  const [scoreData, setScoreData] = useState([{
    category: 'Operational Readiness',
    score: 65,
    weight: 0.2
  }, {
    category: 'Team Strength',
    score: 80,
    weight: 0.2
  }, {
    category: 'Market Fit',
    score: 70,
    weight: 0.2
  }, {
    category: 'Narrative & Innovation',
    score: 85,
    weight: 0.25
  }, {
    category: 'Geo-Ecosystem',
    score: 55,
    weight: 0.15
  }]);
  const [overallScore, setOverallScore] = useState(72);
  const [companyName, setCompanyName] = useState('TechStartup Inc.');
  const [recommendations, setRecommendations] = useState([{
    title: 'Team Development',
    status: 'good',
    recommendations: ['Strong technical team composition with experienced founders.', 'Consider adding advisors with industry-specific expertise.', 'Maintain the current leadership structure which demonstrates clear roles.']
  }, {
    title: 'Market Strategy',
    status: 'warning',
    recommendations: ['Further define your target market segments to improve positioning.', 'Conduct additional customer interviews to validate product-market fit.', 'Develop a more detailed competitive analysis to highlight unique advantages.']
  }, {
    title: 'Geo-Ecosystem Utilization',
    status: 'bad',
    recommendations: ['Consider participating in local accelerator programs to improve network.', 'Leverage nearby university partnerships for talent acquisition.', 'Attend regional investor events to increase visibility in your ecosystem.']
  }]);
  useEffect(() => {
    // Try to load data from sessionStorage if available
    const savedData = sessionStorage.getItem('scoreData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.scoreBreakdown) {
          const {
            scoreBreakdown
          } = parsedData;
          setScoreData([{
            category: 'Operational Readiness',
            score: scoreBreakdown.operationalReadiness,
            weight: 0.2
          }, {
            category: 'Team Strength',
            score: scoreBreakdown.teamStrength,
            weight: 0.2
          }, {
            category: 'Market Fit',
            score: scoreBreakdown.marketFit,
            weight: 0.2
          }, {
            category: 'Narrative & Innovation',
            score: scoreBreakdown.narrativeAndInnovation,
            weight: 0.25
          }, {
            category: 'Geo-Ecosystem',
            score: scoreBreakdown.geoEcosystem,
            weight: 0.15
          }]);
          setOverallScore(scoreBreakdown.overallScore);
        }
        if (parsedData.companyName) {
          setCompanyName(parsedData.companyName);
        }
        if (parsedData.recommendations) {
          setRecommendations(parsedData.recommendations);
        }
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);
  const getScoreColor = score => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };
  const getOverallScoreColor = () => {
    if (overallScore >= 80) return 'bg-green-100 text-green-800';
    if (overallScore >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  const getOverallScoreText = () => {
    if (overallScore >= 80) return 'Investor Ready';
    if (overallScore >= 60) return 'Approaching Ready';
    return 'Needs Improvement';
  };
  const chartData = scoreData.map(item => ({
    name: item.category.split(' ')[0],
    score: item.score
  }));
  const handleDownloadReport = () => {
    // In a real application, this would generate a PDF report
    alert('Report download functionality would be implemented here.');
  };
  return <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Capital Readiness Score
            </h1>
            <p className="text-gray-600 mt-1">{companyName}</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button onClick={handleDownloadReport} className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download Report
            </button>
            <Link to="/intake" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Update Data
            </Link>
          </div>
        </div>
        {/* Overall Score Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
              <div className={`text-6xl font-bold ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {overallScore}
              </div>
              <div className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${getOverallScoreColor()}`}>
                {getOverallScoreText()}
              </div>
            </div>
            <div className="flex-grow w-full md:w-auto h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Score Breakdown */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Score Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {scoreData.map((item, index) => <ScoreCard key={item.category} score={item.score} category={item.category} color={getScoreColor(item.score)} description={getScoreDescription(item.category)} />)}
        </div>
        {/* Recommendations */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recommendations
        </h2>
        <div className="space-y-6 mb-12">
          {recommendations.map((rec, index) => <RecommendationCard key={index} title={rec.title} status={rec.status} recommendations={rec.recommendations} />)}
        </div>
        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Next Steps</h2>
          <p className="text-blue-700 mb-4">
            Based on your current score of {overallScore}, we recommend focusing
            on the following areas to improve your capital readiness:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-blue-700">
            <li>
              {overallScore < 70 ? 'Strengthen your geo-ecosystem connections through networking and local resources.' : 'Continue to leverage your strong ecosystem position for partnerships and resources.'}
            </li>
            <li>
              {recommendations.some(r => r.title === 'Market Strategy' && r.status !== 'good') ? 'Refine your market strategy with more detailed customer segmentation.' : 'Maintain your strong market positioning and continue gathering customer feedback.'}
            </li>
            <li>
              {scoreData.find(s => s.category === 'Operational Readiness').score < 70 ? 'Improve operational documentation to demonstrate scalability to investors.' : 'Continue to optimize your operational efficiency to maintain investor confidence.'}
            </li>
          </ol>
          <div className="mt-6">
            <Link to="/intake" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Update Your Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
// Helper function to get descriptions for each score category
const getScoreDescription = category => {
  const descriptions = {
    'Operational Readiness': 'Assessment of your business processes, operational efficiency, and scalability potential.',
    'Team Strength': "Evaluation of your team's experience, diversity, technical skills, and leadership capabilities.",
    'Market Fit': 'Analysis of your product-market fit, addressable market size, and competitive positioning.',
    'Narrative & Innovation': 'Assessment of your product innovation, unique value proposition, and storytelling capability.',
    'Geo-Ecosystem': "Evaluation of your location's startup ecosystem, access to resources, and regional advantages."
  };
  return descriptions[category] || 'Score component analysis';
};
export default Results;