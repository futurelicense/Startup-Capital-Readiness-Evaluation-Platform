import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_IDS = [
  'cover',
  'abstract',
  'introduction',
  'architecture',
  'scoring',
  'ai-apis',
  'security',
  'roadmap',
  'references',
];

const SLIDE_TITLES: Record<string, string> = {
  cover: 'Technical Whitepaper',
  abstract: 'Abstract',
  introduction: '1. Introduction',
  architecture: '2. System Architecture',
  scoring: '3. Scoring Methodology',
  'ai-apis': '4. AI & External APIs',
  security: '5. Security & Privacy',
  roadmap: '6. Roadmap',
  references: 'References',
};

const totalSlides = SLIDE_IDS.length;

export default function Whitepaper() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(totalSlides - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, next, prev, goTo]);

  const atStart = currentIndex === 0;
  const atEnd = currentIndex === totalSlides - 1;

  return (
    <div className="wp-theme wp-slides w-full h-full flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar: TOC + progress */}
      <aside className="wp-sidebar w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-amber-900/30 flex flex-col">
        <div className="p-4 lg:p-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-200/90 hover:text-amber-100 text-sm font-medium mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <FileText className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-semibold text-amber-50 text-sm">Whitepaper</span>
          </div>
          <p className="text-amber-200/70 text-xs mb-4">
            Page {currentIndex + 1} of {totalSlides}
          </p>
          <nav aria-label="Slides" className="wp-toc">
            <ul className="space-y-1 text-sm">
              {SLIDE_IDS.map((id, i) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      i === currentIndex
                        ? 'bg-amber-500/30 text-amber-50 font-medium'
                        : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-500/10'
                    }`}
                  >
                    {i === 0 ? 'Cover' : SLIDE_TITLES[id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto p-4 pt-0">
          <div className="h-1.5 w-full bg-amber-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Slide viewport */}
      <div className="wp-main flex-1 min-h-0 min-w-0 flex flex-col relative">
        <div className="wp-slide-viewport flex-1 min-h-0 overflow-hidden relative">
          {SLIDE_IDS.map((id, index) => (
            <div
              key={id}
              role="region"
              aria-label={`Slide ${index + 1}: ${index === 0 ? 'Cover' : SLIDE_TITLES[id]}`}
              className={`wp-slide ${index === currentIndex ? 'wp-slide-active' : 'wp-slide-inactive'}`}
            >
              <div className="wp-slide-inner">
                {index === 0 && <CoverSlide />}
                {id === 'abstract' && <AbstractSlide />}
                {id === 'introduction' && <IntroductionSlide />}
                {id === 'architecture' && <ArchitectureSlide />}
                {id === 'scoring' && <ScoringSlide />}
                {id === 'ai-apis' && <AiApisSlide />}
                {id === 'security' && <SecuritySlide />}
                {id === 'roadmap' && <RoadmapSlide />}
                {id === 'references' && <ReferencesSlide />}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="wp-slide-nav flex items-center justify-between gap-4 px-4 py-4 border-t border-amber-200/30 bg-amber-50/50">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-amber-800 bg-white border border-amber-200 shadow-sm hover:bg-amber-50 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
            Previous
          </button>
          <span className="text-sm text-amber-800/80 tabular-nums">
            {currentIndex + 1} / {totalSlides}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={atEnd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm"
            aria-label="Next slide"
          >
            Next
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

function CoverSlide() {
  return (
    <div className="wp-paper wp-slide-cover flex flex-col items-center justify-center text-center px-6 py-12">
      <h1 className="wp-title text-3xl sm:text-4xl max-w-2xl mb-4">
        Startup Capital Readiness Evaluation Platform
      </h1>
      <p className="wp-subtitle text-xl mb-2">Technical Whitepaper</p>
      <p className="wp-meta text-base">Version 1.0 · © 2023</p>
      <p className="wp-meta text-base mt-2">Author: Sakera Begum</p>
      <p className="text-amber-700/80 text-sm mt-8 max-w-md">
        Use arrow keys or the buttons below to navigate page by page.
      </p>
    </div>
  );
}

function AbstractSlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">Abstract</h2>
      <p className="wp-p">
        This document describes the architecture, scoring methodology, and integration design of the
        Startup Capital Readiness Evaluation Platform—an AI-powered system that assesses early-stage
        startups across five dimensions (operational readiness, team strength, market fit, narrative &
        innovation, and geo-ecosystem) to produce a single capital readiness score and actionable
        recommendations. The platform combines deterministic scoring rules with external APIs (Geoapify
        for location data, Hugging Face for narrative analysis) to support equitable, repeatable
        assessments.
      </p>
    </div>
  );
}

function IntroductionSlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">1. Introduction</h2>
      <p className="wp-p">
        Investors and accelerators routinely evaluate startups on team, traction, market fit, and
        ecosystem context. Evaluations are often subjective and inconsistent. This platform provides a
        standardized, transparent scoring framework so founders can understand their standing and improve
        over time, and so ecosystem stakeholders can compare startups on a common basis.
      </p>
      <p className="wp-p">
        The system ingests structured intake data (company, team, traction, location), enriches it via
        geocoding and ecosystem APIs, and evaluates narrative quality via AI. A weighted combination of
        five component scores yields an overall capital readiness score (0–100) and category-level
        recommendations.
      </p>
    </div>
  );
}

function ArchitectureSlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">2. System Architecture</h2>
      <p className="wp-p">
        The application is a single-page React (TypeScript) front end built with Vite. State is
        ephemeral per session; assessment results are passed to the results view via session storage.
        No persistent backend database is required for the core flow.
      </p>
      <ul className="wp-list">
        <li><strong>Intake module:</strong> Multi-step form collecting company info, team composition, traction metrics, and full address.</li>
        <li><strong>Geocoding:</strong> Address → coordinates and locality (city, state, country) via Geoapify Geocode API.</li>
        <li><strong>Ecosystem scoring:</strong> Coordinates → counts of nearby innovation hubs, VC firms, accelerators, coworking spaces (Geoapify Places), normalized to a 0–100 geo-ecosystem score.</li>
        <li><strong>Narrative analysis:</strong> Product description and industry → clarity, innovation, market fit, professionalism, and overall narrative score (Hugging Face inference or internal heuristic).</li>
        <li><strong>Score aggregation:</strong> Weighted combination of operational readiness, team strength, market fit, narrative & innovation, and geo-ecosystem into overall capital readiness.</li>
        <li><strong>Recommendations engine:</strong> Rule-based generation of category-specific recommendations from score thresholds.</li>
      </ul>
    </div>
  );
}

function ScoringSlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">3. Scoring Methodology</h2>
      <p className="wp-p">
        All component scores are normalized to 0–100 where applicable. The overall score is a weighted
        sum of the five components. Weights are fixed and documented below.
      </p>
      <div className="wp-table-wrap">
        <table className="wp-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Weight</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Operational Readiness</td><td>20%</td><td>Revenue tiers, user/customer count, monthly growth rate.</td></tr>
            <tr><td>Team Strength</td><td>20%</td><td>Founder count, team size, % technical background, prior startups.</td></tr>
            <tr><td>Market Fit</td><td>20%</td><td>Derived from narrative analysis (clarity, market positioning).</td></tr>
            <tr><td>Narrative & Innovation</td><td>25%</td><td>AI/heuristic evaluation of product description quality and innovation signals.</td></tr>
            <tr><td>Geo-Ecosystem</td><td>15%</td><td>Proximity and density of innovation hubs, VCs, accelerators, coworking.</td></tr>
          </tbody>
        </table>
      </div>
      <p className="wp-p">
        Operational readiness and team strength use explicit point bands (e.g., revenue ≥$50k/month,
        team size ≥10) mapped into 0–100. Narrative and geo-ecosystem scores are produced by
        external or internal analytics and then used directly in the weighted formula. The final
        overall score is rounded to an integer.
      </p>
    </div>
  );
}

function AiApisSlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">4. AI & External APIs</h2>
      <h3 className="wp-h3">4.1 Geoapify</h3>
      <p className="wp-p">
        Geoapify is used for (1) geocoding the startup address to coordinates and (2) querying places
        (innovation hubs, VC firms, accelerators, coworking spaces) within a radius of the location.
        Counts and optional distance weighting are normalized to a single geo-ecosystem score (0–100).
        API keys are configured client-side for this reference implementation; production deployments
        should proxy these calls through a backend to protect keys and enforce rate limits.
      </p>
      <h3 className="wp-h3">4.2 Hugging Face</h3>
      <p className="wp-p">
        The narrative module is designed to call Hugging Face inference APIs (e.g., sentiment,
        classification, or summarization models) to evaluate product descriptions. In the current
        implementation, a heuristic based on word count, sentence structure, and term diversity may be
        used when API calls are not available. Outputs include clarity, innovation, market fit,
        professionalism, and an overall narrative score, which feed into the weighted capital readiness
        formula.
      </p>
    </div>
  );
}

function SecuritySlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">5. Security & Privacy</h2>
      <p className="wp-p">
        Data is processed in the browser and in third-party APIs. No assessment data is persisted on
        platform servers in the current design. Session storage is used only to pass results from the
        intake flow to the results page; clearing the session or closing the tab removes that data.
      </p>
      <p className="wp-p">
        For production, recommendations include: (1) moving API keys and Geoapify/Hugging Face calls
        behind a backend; (2) optional authentication and encrypted storage if results are saved;
        (3) explicit privacy policy and consent for data sent to external APIs; (4) rate limiting and
        abuse prevention on intake and scoring endpoints.
      </p>
    </div>
  );
}

function RoadmapSlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">6. Roadmap</h2>
      <ul className="wp-list">
        <li>Backend persistence and user accounts for historical score tracking.</li>
        <li>PDF export of the capital readiness report for sharing with investors.</li>
        <li>Calibration of weights and bands using historical funding outcomes.</li>
        <li>Optional integration with additional data sources (e.g., LinkedIn, Crunchbase) for richer team and traction signals.</li>
      </ul>
    </div>
  );
}

function ReferencesSlide() {
  return (
    <div className="wp-paper wp-slide-content">
      <h2 className="wp-h2">References</h2>
      <ul className="wp-list">
        <li>Geoapify: Geocoding and Places APIs — <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer" className="wp-link">geoapify.com</a></li>
        <li>Hugging Face: Inference API — <a href="https://huggingface.co/inference-api" target="_blank" rel="noopener noreferrer" className="wp-link">huggingface.co/inference-api</a></li>
        <li>Platform source: React, TypeScript, Vite, Tailwind CSS, Recharts, React Router.</li>
      </ul>
      <footer className="wp-footer mt-8 pt-6 border-t border-amber-200/40">
        <p className="text-sm text-stone-500">
          © 2023 Startup Capital Readiness Platform. Technical and product reference only.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 mt-4 text-amber-700 hover:text-amber-800 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Return to platform
        </Link>
      </footer>
    </div>
  );
}
