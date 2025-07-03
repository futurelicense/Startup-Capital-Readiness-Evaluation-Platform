import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2Icon, UsersIcon, TrendingUpIcon, MapPinIcon, BrainIcon, CheckCircleIcon, ArrowRightIcon, LightbulbIcon, LineChartIcon, AwardIcon, ClipboardCheckIcon, ZapIcon } from 'lucide-react';
const Home = () => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
              <div className="inline-block bg-blue-800 text-blue-200 px-4 py-1 rounded-full text-sm font-medium mb-4">
                AI-Powered Startup Assessment
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get Your Startup{' '}
                <span className="text-blue-300">Investor-Ready</span> in Minutes
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Our AI-powered platform analyzes your startup's strengths and
                weaknesses across 5 key dimensions to determine your funding
                readiness and provide actionable recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/intake" className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition flex items-center justify-center">
                  Get Your Score Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/results" className="bg-blue-800 text-white border border-blue-600 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition flex items-center justify-center">
                  View Sample Report
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    <AwardIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg">
                      Capital Readiness Score
                    </h3>
                    <p className="text-gray-600">Sample Report</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-3xl font-bold text-blue-600">78</span>
                    <span className="text-gray-500">/100</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-700 w-1/2">Team Strength</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                      width: '85%'
                    }}></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 w-1/2">Market Fit</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                      width: '70%'
                    }}></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-700 w-1/2">Geo-Ecosystem</span>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{
                      width: '65%'
                    }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium border border-blue-200">
                Ready for Seed Funding
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">94%</p>
              <p className="text-gray-600 text-sm">Accuracy Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">5,000+</p>
              <p className="text-gray-600 text-sm">Startups Evaluated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">$120M+</p>
              <p className="text-gray-600 text-sm">Funding Secured</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">15 min</p>
              <p className="text-gray-600 text-sm">Average Assessment Time</p>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our platform uses advanced AI to analyze your startup's funding
              readiness in just 3 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="text-blue-600 mb-4">
                <ClipboardCheckIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Complete Assessment
              </h3>
              <p className="text-gray-600">
                Answer questions about your startup's team, traction, product,
                and location in our easy-to-use form.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="text-blue-600 mb-4">
                <ZapIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your inputs across 5 key dimensions, comparing
                to successful funding patterns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="text-blue-600 mb-4">
                <LineChartIcon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results & Plan</h3>
              <p className="text-gray-600">
                Receive your detailed scorecard with actionable recommendations
                to improve your funding readiness.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Objectives Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our Platform
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We provide objective, data-driven insights that help startups
              understand and improve their funding readiness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex">
              <div className="text-blue-600 mr-4 flex-shrink-0">
                <BarChart2Icon className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Objective Assessment
                </h3>
                <p className="text-gray-600">
                  Get an unbiased evaluation of your startup's funding readiness
                  based on the same criteria investors use to make decisions.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex">
              <div className="text-blue-600 mr-4 flex-shrink-0">
                <UsersIcon className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Equitable Access</h3>
                <p className="text-gray-600">
                  Our AI-driven approach removes human bias, giving all founders
                  equal opportunity to showcase their startup's potential.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex">
              <div className="text-blue-600 mr-4 flex-shrink-0">
                <TrendingUpIcon className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Bridge Trust Gaps
                </h3>
                <p className="text-gray-600">
                  Use your scorecard to demonstrate credibility to investors and
                  accelerate the funding conversation.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex">
              <div className="text-blue-600 mr-4 flex-shrink-0">
                <BrainIcon className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Actionable Recommendations
                </h3>
                <p className="text-gray-600">
                  Receive personalized suggestions to address weaknesses and
                  improve your capital readiness score over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Founders Say
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Hear from founders who have used our platform to improve their
              funding readiness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <h3 className="font-semibold">Jessica Davis</h3>
                  <p className="text-sm text-gray-600">CEO, TechNova</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The assessment highlighted weaknesses in our team structure
                that we hadn't considered. After implementing the
                recommendations, we secured $2M in seed funding."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <span className="font-bold">MJ</span>
                </div>
                <div>
                  <h3 className="font-semibold">Michael Johnson</h3>
                  <p className="text-sm text-gray-600">Founder, HealthSync</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The geo-ecosystem analysis showed us we needed to engage more
                with local resources. Six months later, we connected with an
                angel investor through a local event."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <span className="font-bold">AR</span>
                </div>
                <div>
                  <h3 className="font-semibold">Aisha Rodriguez</h3>
                  <p className="text-sm text-gray-600">CTO, FinEdge</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a technical founder, I struggled with the narrative aspect.
                The AI feedback helped us refine our pitch, making it much more
                compelling to investors."
              </p>
              <div className="flex text-yellow-400 mt-4">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Platform Core Features
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our comprehensive assessment evaluates your startup across all
              dimensions that matter to investors
            </p>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <ClipboardCheckIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Startup Intake Module
                  </h3>
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <p className="text-gray-600 mb-4">
                    Comprehensive data collection through an intuitive
                    form-based interface:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Company and product information
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Revenue and traction metrics
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Team structure and experience
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Location and ecosystem details
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <MapPinIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Geo-Ecosystem Scoring
                  </h3>
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <p className="text-gray-600 mb-4">
                    Geoapify API integration to analyze your startup's location
                    advantages:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Proximity to innovation hubs
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Access to VC firms and accelerators
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Coworking and infrastructure access
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Regional economic indicators
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <LightbulbIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    AI-Powered Narrative Evaluation
                  </h3>
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <p className="text-gray-600 mb-4">
                    Hugging Face API integration to analyze your startup's
                    story:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Product description quality
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Market clarity and uniqueness
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Professional tone evaluation
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Innovation signal detection
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <BarChart2Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Capital Readiness Scorecard
                  </h3>
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <p className="text-gray-600 mb-4">
                    Comprehensive score breakdown across key dimensions:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Operational Readiness
                        </span>
                        <span className="text-sm font-bold">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                        width: '20%'
                      }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Team Strength
                        </span>
                        <span className="text-sm font-bold">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                        width: '20%'
                      }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Market Fit</span>
                        <span className="text-sm font-bold">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                        width: '20%'
                      }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Narrative & Innovation
                        </span>
                        <span className="text-sm font-bold">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                        width: '25%'
                      }}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Geo-Ecosystem
                        </span>
                        <span className="text-sm font-bold">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{
                        width: '15%'
                      }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-4">
              Everything you need to know about the Capital Readiness Platform
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is the assessment?
              </h3>
              <p className="text-gray-600">
                Our platform has been trained on data from thousands of
                successful and unsuccessful funding rounds, achieving a 94%
                correlation with actual investor decisions in blind tests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does the assessment take?
              </h3>
              <p className="text-gray-600">
                Most founders complete the assessment in 10-15 minutes. The AI
                analysis takes just a few minutes to process and generate your
                complete report.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I share my results with investors?
              </h3>
              <p className="text-gray-600">
                Yes! You can download a shareable PDF report that highlights
                your strengths and demonstrates your commitment to improvement.
                Many investors appreciate seeing this level of preparation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How often should I update my assessment?
              </h3>
              <p className="text-gray-600">
                We recommend updating your assessment quarterly or whenever you
                hit significant milestones like completing an accelerator
                program, reaching revenue targets, or expanding your team.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-blue-700 text-blue-200 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Get Started Today
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get your startup investor-ready?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Join thousands of founders who have used our platform to improve
            their funding readiness and secure investment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/intake" className="bg-white text-blue-700 px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-50 transition flex items-center justify-center">
              Start Your Free Assessment
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/results" className="bg-blue-700 border border-blue-500 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-blue-600 transition">
              View Sample Report
            </Link>
          </div>
          <p className="text-blue-200 mt-6 text-sm">
            No credit card required • Get your results in minutes • 100% secure
            and confidential
          </p>
        </div>
      </section>
    </div>;
};
export default Home;