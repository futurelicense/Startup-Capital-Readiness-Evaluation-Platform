import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Building2,
  Users,
  DollarSign,
  MapPin,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { geocodeAddress, getStartupEcosystem } from '../services/geoapify';
import { analyzeProductNarrative } from '../services/huggingface';
import { calculateCapitalReadinessScore, generateRecommendations } from '../services/scoring';

interface FormData {
  companyName: string;
  foundingYear: string;
  industry: string;
  productDescription: string;
  founderCount: string;
  teamSize: string;
  techBackgroundPercentage: string;
  previousStartups: string;
  monthlyRevenue: string;
  userCount: string;
  growthRate: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const initialFormData: FormData = {
  companyName: '',
  foundingYear: '',
  industry: '',
  productDescription: '',
  founderCount: '',
  teamSize: '',
  techBackgroundPercentage: '',
  previousStartups: '',
  monthlyRevenue: '',
  userCount: '',
  growthRate: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

const STEPS = [
  { id: 1, label: 'Company', icon: Building2 },
  { id: 2, label: 'Team', icon: Users },
  { id: 3, label: 'Traction', icon: DollarSign },
  { id: 4, label: 'Location', icon: MapPin },
];

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
  'Manufacturing', 'Energy', 'Other',
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
];

const inputBase =
  'w-full px-4 py-2.5 rounded-button border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors';

const Intake: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setProcessingStep('Geocoding location data...');
      const geocodeResult = await geocodeAddress(
        formData.address,
        formData.city,
        formData.state,
        formData.zipCode
      );
      if (!geocodeResult) throw new Error('Failed to geocode address');

      setProcessingStep('Analyzing startup ecosystem...');
      const ecosystemData = await getStartupEcosystem(geocodeResult.lat, geocodeResult.lon);

      setProcessingStep('Evaluating product narrative...');
      const narrativeAnalysis = await analyzeProductNarrative(
        formData.productDescription,
        formData.industry
      );

      setProcessingStep('Calculating capital readiness score...');
      const scoreBreakdown = calculateCapitalReadinessScore(
        {
          founderCount: parseInt(formData.founderCount) || 0,
          teamSize: parseInt(formData.teamSize) || 0,
          techBackgroundPercentage: parseInt(formData.techBackgroundPercentage) || 0,
          previousStartups: parseInt(formData.previousStartups) || 0,
        },
        {
          monthlyRevenue: parseInt(formData.monthlyRevenue) || 0,
          userCount: parseInt(formData.userCount) || 0,
          growthRate: parseInt(formData.growthRate) || 0,
        },
        narrativeAnalysis,
        ecosystemData
      );

      setProcessingStep('Generating recommendations...');
      const recommendations = generateRecommendations(scoreBreakdown);

      sessionStorage.setItem(
        'scoreData',
        JSON.stringify({
          companyName: formData.companyName,
          scoreBreakdown,
          recommendations,
          locationData: {
            city: geocodeResult.city,
            state: geocodeResult.state,
            country: geocodeResult.country,
          },
          narrativeSummary: narrativeAnalysis.summary,
        })
      );
      navigate('/results');
    } catch (error) {
      console.error('Assessment error:', error);
      alert('There was an error processing your assessment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="bg-surface-elevated p-8 rounded-card shadow-card border border-slate-200 max-w-md w-full text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <Loader2 className="h-14 w-14 text-brand-600 animate-spin" aria-hidden />
          </div>
          <h2 className="font-display text-xl font-semibold text-slate-900 mb-2">
            Processing Your Assessment
          </h2>
          <p className="text-slate-600 mb-4">{processingStep}</p>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full animate-pulse"
              style={{ width: '70%' }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-4">This may take a minute or two…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-10 sm:py-14">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-elevated rounded-card shadow-card border border-slate-100 p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-100 text-brand-600 mb-4">
              <ClipboardList className="h-6 w-6" aria-hidden />
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Startup Capital Readiness Assessment
            </h1>
            <p className="text-slate-600 mt-2 text-sm">
              Complete the steps below to get your AI-powered score and recommendations.
            </p>
          </div>

          {/* Stepper with progress line */}
          <div className="relative mb-10">
            <div className="flex justify-between">
              {STEPS.map(({ id, label, icon: Icon }) => (
                <div
                  key={id}
                  className="flex flex-col items-center relative z-10"
                  style={{ flex: 1 }}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors ${
                      currentStep >= id
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-surface-elevated border-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      currentStep >= id ? 'text-brand-600' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2"
              aria-hidden
            >
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Company */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Company Information
                </h2>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={inputBase}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="foundingYear" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Founding Year
                  </label>
                  <input
                    type="number"
                    id="foundingYear"
                    name="foundingYear"
                    value={formData.foundingYear}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className={inputBase}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={inputBase}
                    required
                  >
                    <option value="">Select Industry</option>
                    {INDUSTRIES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="productDescription" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Product Description
                    <span className="text-slate-500 font-normal ml-1">(AI will evaluate narrative quality)</span>
                  </label>
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputBase} resize-y min-h-[100px]`}
                    required
                    placeholder="Describe your product, unique value proposition, and target market…"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    Tip: Clear, concise descriptions with specific details about innovation and market fit score higher.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Team */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-slate-900">Team Information</h2>
                <div>
                  <label htmlFor="founderCount" className="block text-sm font-medium text-slate-700 mb-1.5">Number of Founders</label>
                  <input
                    type="number"
                    id="founderCount"
                    name="founderCount"
                    value={formData.founderCount}
                    onChange={handleChange}
                    min={1}
                    max={10}
                    className={inputBase}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-slate-700 mb-1.5">Total Team Size</label>
                  <input
                    type="number"
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    min={Number(formData.founderCount) || 1}
                    className={inputBase}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="techBackgroundPercentage" className="block text-sm font-medium text-slate-700 mb-1.5">% of Team with Technical Background</label>
                  <input
                    type="number"
                    id="techBackgroundPercentage"
                    name="techBackgroundPercentage"
                    value={formData.techBackgroundPercentage}
                    onChange={handleChange}
                    min={0}
                    max={100}
                    className={inputBase}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="previousStartups" className="block text-sm font-medium text-slate-700 mb-1.5">Previous Startups Founded by Team</label>
                  <input
                    type="number"
                    id="previousStartups"
                    name="previousStartups"
                    value={formData.previousStartups}
                    onChange={handleChange}
                    min={0}
                    className={inputBase}
                    required
                  />
                </div>
                <div className="bg-brand-50 border border-brand-100 p-4 rounded-button">
                  <h3 className="text-sm font-semibold text-brand-800 mb-1.5">Why Team Composition Matters</h3>
                  <p className="text-xs text-brand-700">
                    Investors look for diverse teams with complementary skills. Technical founders and prior startup experience often improve scores.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Traction */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-slate-900">Traction & Metrics</h2>
                <div>
                  <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Revenue (USD)</label>
                  <input
                    type="number"
                    id="monthlyRevenue"
                    name="monthlyRevenue"
                    value={formData.monthlyRevenue}
                    onChange={handleChange}
                    min={0}
                    className={inputBase}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userCount" className="block text-sm font-medium text-slate-700 mb-1.5">Users/Customers</label>
                  <input
                    type="number"
                    id="userCount"
                    name="userCount"
                    value={formData.userCount}
                    onChange={handleChange}
                    min={0}
                    className={inputBase}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="growthRate" className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Growth Rate (%)</label>
                  <input
                    type="number"
                    id="growthRate"
                    name="growthRate"
                    value={formData.growthRate}
                    onChange={handleChange}
                    min={0}
                    max={1000}
                    className={inputBase}
                    required
                  />
                </div>
                <div className="bg-brand-50 border border-brand-100 p-4 rounded-button">
                  <h3 className="text-sm font-semibold text-brand-800 mb-1.5">Traction Impact</h3>
                  <p className="text-xs text-brand-700">
                    Demonstrable traction increases your score. Pre-revenue startups can show traction via user growth, pilots, or letters of intent.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Location */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-display text-lg font-semibold text-slate-900">Location</h2>
                <p className="text-sm text-slate-600">
                  Your location is analyzed for proximity to startup resources, investors, and ecosystem advantages.
                </p>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1.5">Street Address</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={inputBase} required />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className={inputBase} required />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
                  <select id="state" name="state" value={formData.state} onChange={handleChange} className={inputBase} required>
                    <option value="">Select State</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1.5">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    pattern="[0-9]{5}"
                    className={inputBase}
                    required
                  />
                </div>
                <div className="bg-brand-50 border border-brand-100 p-4 rounded-button">
                  <h3 className="text-sm font-semibold text-brand-800 mb-1.5">Location Impact</h3>
                  <p className="text-xs text-brand-700">
                    Location affects score via proximity to resources. Remote teams can still score well through virtual ecosystem engagement.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-button border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
                </button>
              ) : (
                <span />
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-brand-600 text-white font-medium hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ml-auto"
                >
                  Next <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-brand-600 text-white font-medium hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ml-auto"
                >
                  Submit Assessment <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Intake;
