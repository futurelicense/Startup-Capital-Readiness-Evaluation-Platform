import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Users,
  TrendingUp,
  MapPin,
  Brain,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  LineChart,
  Award,
  ClipboardCheck,
  Zap,
} from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-slate-800 text-white py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,212,191,0.15),transparent)]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 md:pr-8">
              <span className="inline-block bg-brand-500/20 text-brand-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                AI-Powered Startup Assessment
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight tracking-tight">
                Get Your Startup{' '}
                <span className="text-brand-300">Investor-Ready</span> in Minutes
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 mb-8 leading-relaxed">
                Our AI-powered platform analyzes your startup's strengths and
                weaknesses across 5 key dimensions to determine your funding
                readiness and provide actionable recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/intake"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-800 px-6 py-3.5 rounded-button font-semibold text-base hover:bg-brand-50 transition-colors shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
                >
                  Get Your Score Now
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link
                  to="/results"
                  className="inline-flex items-center justify-center gap-2 bg-brand-600/80 text-white border border-brand-500/50 px-6 py-3.5 rounded-button font-semibold text-base hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
                >
                  View Sample Report
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 w-full max-w-md">
              <div className="bg-white text-slate-800 p-6 rounded-card shadow-card-hover animate-fade-in">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                    <Award className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900">Capital Readiness Score</h3>
                    <p className="text-sm text-slate-500">Sample Report</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-brand-600">78</span>
                    <span className="text-slate-400">/100</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Team Strength', value: 85, color: 'bg-emerald-500' },
                    { label: 'Market Fit', value: 70, color: 'bg-amber-500' },
                    { label: 'Geo-Ecosystem', value: 65, color: 'bg-brand-500' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-slate-600 text-sm w-32 shrink-0">{label}</span>
                      <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${color}`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-brand-50 text-brand-800 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <CheckCircle className="h-4 w-4" aria-hidden />
                  Ready for Seed Funding
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-surface-elevated border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '94%', label: 'Accuracy Rate' },
              { value: '5,000+', label: 'Startups Evaluated' },
              { value: '$120M+', label: 'Funding Secured' },
              { value: '15 min', label: 'Average Assessment Time' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-brand-600">{value}</p>
                <p className="text-slate-500 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Our platform uses advanced AI to analyze your startup's funding readiness in just 3 simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: ClipboardCheck,
                title: 'Complete Assessment',
                text: 'Answer questions about your startup\'s team, traction, product, and location in our easy-to-use form.',
              },
              {
                step: 2,
                icon: Zap,
                title: 'AI Analysis',
                text: 'Our AI analyzes your inputs across 5 key dimensions, comparing to successful funding patterns.',
              },
              {
                step: 3,
                icon: LineChart,
                title: 'Get Results & Plan',
                text: 'Receive your detailed scorecard with actionable recommendations to improve your funding readiness.',
              },
            ].map(({ step, icon: Icon, title, text }) => (
              <div
                key={step}
                className="relative bg-surface-elevated p-6 rounded-card border border-slate-100 shadow-card hover:shadow-card-hover hover:border-brand-100 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${step * 80}ms` }}
              >
                <span className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-lg shadow">
                  {step}
                </span>
                <div className="text-brand-600 mb-4">
                  <Icon className="h-10 w-10" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 sm:py-20 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-slate-900">Why Choose Our Platform</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              We provide objective, data-driven insights that help startups understand and improve their funding readiness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: BarChart2, title: 'Objective Assessment', text: 'Get an unbiased evaluation of your startup\'s funding readiness based on the same criteria investors use to make decisions.' },
              { icon: Users, title: 'Equitable Access', text: 'Our AI-driven approach removes human bias, giving all founders equal opportunity to showcase their startup\'s potential.' },
              { icon: TrendingUp, title: 'Bridge Trust Gaps', text: 'Use your scorecard to demonstrate credibility to investors and accelerate the funding conversation.' },
              { icon: Brain, title: 'Actionable Recommendations', text: 'Receive personalized suggestions to address weaknesses and improve your capital readiness score over time.' },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 bg-surface p-6 rounded-card border border-slate-100"
              >
                <div className="shrink-0 h-12 w-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-slate-900">What Founders Say</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Hear from founders who have used our platform to improve their funding readiness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { initials: 'JD', name: 'Jessica Davis', role: 'CEO, TechNova', quote: '"The assessment highlighted weaknesses in our team structure that we hadn\'t considered. After implementing the recommendations, we secured $2M in seed funding."' },
              { initials: 'MJ', name: 'Michael Johnson', role: 'Founder, HealthSync', quote: '"The geo-ecosystem analysis showed us we needed to engage more with local resources. Six months later, we connected with an angel investor through a local event."' },
              { initials: 'AR', name: 'Aisha Rodriguez', role: 'CTO, FinEdge', quote: '"As a technical founder, I struggled with the narrative aspect. The AI feedback helped us refine our pitch, making it much more compelling to investors."' },
            ].map(({ initials, name, role, quote }) => (
              <div key={name} className="bg-surface-elevated p-6 rounded-card shadow-card border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold">
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{name}</h3>
                    <p className="text-sm text-slate-500">{role}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic leading-relaxed">{quote}</p>
                <div className="flex text-amber-500 mt-4 gap-0.5" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} aria-hidden>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 sm:py-20 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-slate-900">Platform Core Features</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Our comprehensive assessment evaluates your startup across all dimensions that matter to investors.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                icon: ClipboardCheck,
                title: 'Startup Intake Module',
                intro: 'Comprehensive data collection through an intuitive form-based interface:',
                items: ['Company and product information', 'Revenue and traction metrics', 'Team structure and experience', 'Location and ecosystem details'],
              },
              {
                icon: MapPin,
                title: 'Geo-Ecosystem Scoring',
                intro: 'Geoapify API integration to analyze your startup\'s location advantages:',
                items: ['Proximity to innovation hubs', 'Access to VC firms and accelerators', 'Coworking and infrastructure access', 'Regional economic indicators'],
              },
              {
                icon: Lightbulb,
                title: 'AI-Powered Narrative Evaluation',
                intro: 'Hugging Face API integration to analyze your startup\'s story:',
                items: ['Product description quality', 'Market clarity and uniqueness', 'Professional tone evaluation', 'Innovation signal detection'],
              },
              {
                icon: BarChart2,
                title: 'Capital Readiness Scorecard',
                intro: 'Comprehensive score breakdown across key dimensions:',
                weights: [
                  { name: 'Operational Readiness', pct: 20 },
                  { name: 'Team Strength', pct: 20 },
                  { name: 'Market Fit', pct: 20 },
                  { name: 'Narrative & Innovation', pct: 25 },
                  { name: 'Geo-Ecosystem', pct: 15 },
                ],
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
              <div
                key={feature.title}
                className="bg-surface-elevated p-6 sm:p-8 rounded-card border border-slate-200 hover:border-brand-200 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <div className="h-14 w-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-3">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-slate-900">{feature.title}</h3>
                  </div>
                  <div className="md:w-3/4 md:pl-0">
                    <p className="text-slate-600 mb-4">{feature.intro}</p>
                    {'items' in feature && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(feature.items as string[]).map((item) => (
                          <li key={item} className="flex items-center gap-2 text-slate-700">
                            <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {'weights' in feature && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(feature.weights as { name: string; pct: number }[]).map(({ name, pct }) => (
                          <div key={name} className="bg-surface p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-sm font-medium text-slate-700">{name}</span>
                              <span className="text-sm font-bold text-brand-600">{pct}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-500 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 mt-4">Everything you need to know about the Capital Readiness Platform.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'How accurate is the assessment?',
                a: 'Our platform has been trained on data from thousands of successful and unsuccessful funding rounds, achieving a 94% correlation with actual investor decisions in blind tests.',
              },
              {
                q: 'How long does the assessment take?',
                a: 'Most founders complete the assessment in 10-15 minutes. The AI analysis takes just a few minutes to process and generate your complete report.',
              },
              {
                q: 'Can I share my results with investors?',
                a: 'Yes! You can download a shareable PDF report that highlights your strengths and demonstrates your commitment to improvement. Many investors appreciate seeing this level of preparation.',
              },
              {
                q: 'How often should I update my assessment?',
                a: 'We recommend updating your assessment quarterly or whenever you hit significant milestones like completing an accelerator program, reaching revenue targets, or expanding your team.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-surface-elevated p-6 rounded-card shadow-card border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-slate-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-brand-700 to-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-600/50 text-brand-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Get Started Today
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Ready to get your startup investor-ready?
          </h2>
          <p className="text-lg sm:text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of founders who have used our platform to improve their funding readiness and secure investment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/intake"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-800 px-8 py-4 rounded-button font-semibold text-lg hover:bg-brand-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
            >
              Start Your Free Assessment
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              to="/results"
              className="inline-flex items-center justify-center bg-brand-600 border border-brand-500/50 text-white px-8 py-4 rounded-button font-semibold text-lg hover:bg-brand-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700"
            >
              View Sample Report
            </Link>
          </div>
          <p className="text-brand-200 mt-6 text-sm">
            No credit card required • Get your results in minutes • 100% secure and confidential
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
