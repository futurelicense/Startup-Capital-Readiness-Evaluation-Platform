// Service for calculating the overall capital readiness score
interface TeamData {
  founderCount: number;
  teamSize: number;
  techBackgroundPercentage: number;
  previousStartups: number;
}
interface TractionData {
  monthlyRevenue: number;
  userCount: number;
  growthRate: number;
}
interface NarrativeData {
  clarity: number;
  innovation: number;
  marketFit: number;
  professionalism: number;
  overallScore: number;
}
interface EcosystemData {
  ecosystemScore: number;
}
interface ScoreBreakdown {
  operationalReadiness: number;
  teamStrength: number;
  marketFit: number;
  narrativeAndInnovation: number;
  geoEcosystem: number;
  overallScore: number;
}
/**
 * Calculate the operational readiness score based on traction data
 */
const calculateOperationalReadiness = (traction: TractionData): number => {
  let score = 0;
  // Revenue score (0-40 points)
  if (traction.monthlyRevenue >= 50000) score += 40;else if (traction.monthlyRevenue >= 20000) score += 30;else if (traction.monthlyRevenue >= 10000) score += 20;else if (traction.monthlyRevenue > 0) score += 10;
  // User count score (0-30 points)
  if (traction.userCount >= 10000) score += 30;else if (traction.userCount >= 1000) score += 20;else if (traction.userCount >= 100) score += 10;else if (traction.userCount > 0) score += 5;
  // Growth rate score (0-30 points)
  if (traction.growthRate >= 50) score += 30;else if (traction.growthRate >= 20) score += 20;else if (traction.growthRate >= 10) score += 10;else if (traction.growthRate > 0) score += 5;
  return score;
};
/**
 * Calculate the team strength score
 */
const calculateTeamStrength = (team: TeamData): number => {
  let score = 0;
  // Founder count score (0-25 points)
  if (team.founderCount >= 3) score += 25;else if (team.founderCount === 2) score += 20;else if (team.founderCount === 1) score += 15;
  // Team size score (0-25 points)
  if (team.teamSize >= 10) score += 25;else if (team.teamSize >= 5) score += 20;else if (team.teamSize >= 2) score += 15;else score += 10;
  // Technical background percentage score (0-25 points)
  if (team.techBackgroundPercentage >= 70) score += 25;else if (team.techBackgroundPercentage >= 50) score += 20;else if (team.techBackgroundPercentage >= 30) score += 15;else score += 10;
  // Previous startup experience score (0-25 points)
  if (team.previousStartups >= 3) score += 25;else if (team.previousStartups >= 1) score += 15;else score += 5;
  return score;
};
/**
 * Calculate the overall capital readiness score
 */
export const calculateCapitalReadinessScore = (team: TeamData, traction: TractionData, narrative: NarrativeData, ecosystem: EcosystemData): ScoreBreakdown => {
  // Calculate individual component scores
  const operationalReadiness = calculateOperationalReadiness(traction);
  const teamStrength = calculateTeamStrength(team);
  const marketFit = narrative.marketFit;
  const narrativeAndInnovation = narrative.overallScore;
  const geoEcosystem = ecosystem.ecosystemScore;
  // Calculate weighted overall score
  // Weights: Operational (20%), Team (20%), Market Fit (20%), Narrative (25%), Ecosystem (15%)
  const overallScore = Math.round(operationalReadiness * 0.2 + teamStrength * 0.2 + marketFit * 0.2 + narrativeAndInnovation * 0.25 + geoEcosystem * 0.15);
  return {
    operationalReadiness,
    teamStrength,
    marketFit,
    narrativeAndInnovation,
    geoEcosystem,
    overallScore
  };
};
/**
 * Generate recommendations based on the score breakdown
 */
export const generateRecommendations = (scores: ScoreBreakdown) => {
  const recommendations = [];
  // Team recommendations
  if (scores.teamStrength < 70) {
    recommendations.push({
      title: 'Team Development',
      status: scores.teamStrength >= 60 ? 'warning' : 'bad',
      recommendations: ['Consider adding more technical talent to your founding team.', 'Recruit advisors with industry-specific expertise.', 'Seek mentorship from experienced entrepreneurs in your field.']
    });
  } else {
    recommendations.push({
      title: 'Team Development',
      status: 'good',
      recommendations: ['Strong technical team composition with experienced founders.', 'Consider adding advisors with industry-specific expertise.', 'Maintain the current leadership structure which demonstrates clear roles.']
    });
  }
  // Market recommendations
  if (scores.marketFit < 70) {
    recommendations.push({
      title: 'Market Strategy',
      status: scores.marketFit >= 60 ? 'warning' : 'bad',
      recommendations: ['Further define your target market segments to improve positioning.', 'Conduct additional customer interviews to validate product-market fit.', 'Develop a more detailed competitive analysis to highlight unique advantages.']
    });
  }
  // Ecosystem recommendations
  if (scores.geoEcosystem < 70) {
    recommendations.push({
      title: 'Geo-Ecosystem Utilization',
      status: scores.geoEcosystem >= 60 ? 'warning' : 'bad',
      recommendations: ['Consider participating in local accelerator programs to improve network.', 'Leverage nearby university partnerships for talent acquisition.', 'Attend regional investor events to increase visibility in your ecosystem.']
    });
  }
  // Operational recommendations
  if (scores.operationalReadiness < 70) {
    recommendations.push({
      title: 'Operational Efficiency',
      status: scores.operationalReadiness >= 60 ? 'warning' : 'bad',
      recommendations: ['Implement more robust financial tracking and reporting systems.', 'Document your business processes to demonstrate scalability.', 'Develop clear metrics for measuring growth and customer satisfaction.']
    });
  }
  // Narrative recommendations
  if (scores.narrativeAndInnovation < 70) {
    recommendations.push({
      title: 'Narrative Improvement',
      status: scores.narrativeAndInnovation >= 60 ? 'warning' : 'bad',
      recommendations: ['Refine your product description to more clearly articulate your value proposition.', 'Emphasize unique technological innovations in your pitch materials.', "Develop stronger storytelling around your company's origin and mission."]
    });
  }
  return recommendations;
};