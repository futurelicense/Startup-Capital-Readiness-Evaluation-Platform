import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardIcon, BuildingIcon, UsersIcon, DollarSignIcon, MapPinIcon, LoaderIcon } from 'lucide-react';
import { geocodeAddress, getStartupEcosystem } from '../services/geoapify';
import { analyzeProductNarrative } from '../services/huggingface';
import { calculateCapitalReadinessScore, generateRecommendations } from '../services/scoring';
interface FormData {
  // Company Info
  companyName: string;
  foundingYear: string;
  industry: string;
  productDescription: string;
  // Team Info
  founderCount: string;
  teamSize: string;
  techBackgroundPercentage: string;
  previousStartups: string;
  // Traction
  monthlyRevenue: string;
  userCount: string;
  growthRate: string;
  // Location
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
  zipCode: ''
};
const Intake: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Step 1: Geocode the address
      setProcessingStep('Geocoding location data...');
      const geocodeResult = await geocodeAddress(formData.address, formData.city, formData.state, formData.zipCode);
      if (!geocodeResult) {
        throw new Error('Failed to geocode address');
      }
      // Step 2: Get ecosystem data based on location
      setProcessingStep('Analyzing startup ecosystem...');
      const ecosystemData = await getStartupEcosystem(geocodeResult.lat, geocodeResult.lon);
      // Step 3: Analyze product narrative
      setProcessingStep('Evaluating product narrative...');
      const narrativeAnalysis = await analyzeProductNarrative(formData.productDescription, formData.industry);
      // Step 4: Calculate overall score
      setProcessingStep('Calculating capital readiness score...');
      const scoreBreakdown = calculateCapitalReadinessScore({
        founderCount: parseInt(formData.founderCount) || 0,
        teamSize: parseInt(formData.teamSize) || 0,
        techBackgroundPercentage: parseInt(formData.techBackgroundPercentage) || 0,
        previousStartups: parseInt(formData.previousStartups) || 0
      }, {
        monthlyRevenue: parseInt(formData.monthlyRevenue) || 0,
        userCount: parseInt(formData.userCount) || 0,
        growthRate: parseInt(formData.growthRate) || 0
      }, narrativeAnalysis, ecosystemData);
      // Step 5: Generate recommendations
      setProcessingStep('Generating recommendations...');
      const recommendations = generateRecommendations(scoreBreakdown);
      // Store results in sessionStorage for the results page
      sessionStorage.setItem('scoreData', JSON.stringify({
        companyName: formData.companyName,
        scoreBreakdown,
        recommendations,
        locationData: {
          city: geocodeResult.city,
          state: geocodeResult.state,
          country: geocodeResult.country
        },
        narrativeSummary: narrativeAnalysis.summary
      }));
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Assessment error:', error);
      alert('There was an error processing your assessment. Please try again.');
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
          <LoaderIcon className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-2">
            Processing Your Assessment
          </h2>
          <p className="text-gray-600 mb-4">{processingStep}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{
            width: '100%'
          }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            This may take a minute or two...
          </p>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-center mb-8">
            Startup Capital Readiness Assessment
          </h1>
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <BuildingIcon className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2">Company</span>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <UsersIcon className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2">Team</span>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <DollarSignIcon className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2">Traction</span>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                <MapPinIcon className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2">Location</span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Company Information */}
            {currentStep === 1 && <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  Company Information
                </h2>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="foundingYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Founding Year
                  </label>
                  <input type="number" id="foundingYear" name="foundingYear" value={formData.foundingYear} onChange={handleChange} min="1900" max={new Date().getFullYear()} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select id="industry" name="industry" value={formData.industry} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Energy">Energy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Description
                    <span className="text-xs text-gray-500 ml-1">
                      (This will be analyzed by AI for narrative quality)
                    </span>
                  </label>
                  <textarea id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required placeholder="Describe your product, its unique value proposition, and target market..." />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Clear, concise descriptions with specific details about
                    your innovation and market fit score higher.
                  </p>
                </div>
              </div>}
            {/* Step 2: Team Information */}
            {currentStep === 2 && <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Team Information</h2>
                <div>
                  <label htmlFor="founderCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Founders
                  </label>
                  <input type="number" id="founderCount" name="founderCount" value={formData.founderCount} onChange={handleChange} min="1" max="10" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Team Size
                  </label>
                  <input type="number" id="teamSize" name="teamSize" value={formData.teamSize} onChange={handleChange} min={formData.founderCount || '1'} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="techBackgroundPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                    Percentage of Team with Technical Background
                  </label>
                  <input type="number" id="techBackgroundPercentage" name="techBackgroundPercentage" value={formData.techBackgroundPercentage} onChange={handleChange} min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="previousStartups" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Previous Startups Founded by Team
                  </label>
                  <input type="number" id="previousStartups" name="previousStartups" value={formData.previousStartups} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    Why Team Composition Matters
                  </h3>
                  <p className="text-xs text-blue-700">
                    Investors typically look for diverse teams with
                    complementary skills. Teams with technical founders and
                    prior startup experience often receive higher scores.
                  </p>
                </div>
              </div>}
            {/* Step 3: Traction */}
            {currentStep === 3 && <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  Traction & Metrics
                </h2>
                <div>
                  <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Revenue (USD)
                  </label>
                  <input type="number" id="monthlyRevenue" name="monthlyRevenue" value={formData.monthlyRevenue} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="userCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Users/Customers
                  </label>
                  <input type="number" id="userCount" name="userCount" value={formData.userCount} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="growthRate" className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Growth Rate (%)
                  </label>
                  <input type="number" id="growthRate" name="growthRate" value={formData.growthRate} onChange={handleChange} min="0" max="1000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    Traction Impact on Funding
                  </h3>
                  <p className="text-xs text-blue-700">
                    Demonstrable traction significantly increases your capital
                    readiness score. Even pre-revenue startups can show traction
                    through user growth, pilot programs, or letters of intent.
                  </p>
                </div>
              </div>}
            {/* Step 4: Location */}
            {currentStep === 4 && <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  Location Information
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Your location will be analyzed to assess proximity to startup
                  resources, investors, and other ecosystem advantages.
                </p>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select id="state" name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="DC">District of Columbia</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} pattern="[0-9]{5}" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    Location Impact
                  </h3>
                  <p className="text-xs text-blue-700">
                    Your location affects your score based on proximity to
                    startup resources. However, remote teams can still score
                    well through virtual ecosystem engagement.
                  </p>
                </div>
              </div>}
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Previous
                </button>}
              {currentStep < 4 ? <button type="button" onClick={nextStep} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Next
                </button> : <button type="submit" className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Submit Assessment
                </button>}
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default Intake;