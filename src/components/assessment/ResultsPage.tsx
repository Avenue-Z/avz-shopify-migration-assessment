'use client';

import { AssessmentResults } from '@/lib/types';

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export default function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const { scores, summary, strengths, considerations, ctaText } = results;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-widest text-text-muted font-bold">
            Avenue Z
          </p>
          <h1
            className="text-3xl md:text-4xl font-extrabold"
            style={{
              background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Your Migration Readiness Report
          </h1>
        </div>

        {/* Gradient divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
          }}
        />

        {/* Summary */}
        <p className="text-lg text-text-muted leading-relaxed text-center">{summary}</p>

        {/* Score cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shopify Fit */}
          <div
            className="relative overflow-hidden"
            style={{
              background: '#272727',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '24px',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '2px',
                background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF)',
              }}
            />
            <p className="text-sm text-text-muted uppercase tracking-wider font-bold mb-1">Shopify Fit</p>
            <p className="text-4xl font-extrabold text-white">{scores.shopifyFit.percentage}<span className="text-lg text-text-muted">/100</span></p>
            <p className="text-brand-cyan font-bold mt-1">{scores.shopifyFit.band}</p>
          </div>

          {/* Migration Readiness */}
          <div
            className="relative overflow-hidden"
            style={{
              background: '#272727',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '24px',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '2px',
                background: 'linear-gradient(135deg, #60FF80, #60FDFF, #39A0FF)',
              }}
            />
            <p className="text-sm text-text-muted uppercase tracking-wider font-bold mb-1">Migration Readiness</p>
            <p className="text-4xl font-extrabold text-white">{scores.migrationReadiness.percentage}<span className="text-lg text-text-muted">/100</span></p>
            <p className="text-brand-green font-bold mt-1">{scores.migrationReadiness.band}</p>
          </div>

          {/* Definition Confidence */}
          <div
            className="relative overflow-hidden"
            style={{
              background: '#272727',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '24px',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '2px',
                background: 'linear-gradient(135deg, #39A0FF, #6034FF)',
              }}
            />
            <p className="text-sm text-text-muted uppercase tracking-wider font-bold mb-1">Definition Confidence</p>
            <p className="text-4xl font-extrabold text-white">{scores.definitionConfidence.percentage}<span className="text-lg text-text-muted">/100</span></p>
            <p className="text-brand-blue font-bold mt-1">{scores.definitionConfidence.band}</p>
          </div>

          {/* Complexity */}
          <div
            className="relative overflow-hidden"
            style={{
              background: '#272727',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '24px',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: '2px',
                background: 'linear-gradient(135deg, #FFFC60, #6034FF)',
              }}
            />
            <p className="text-sm text-text-muted uppercase tracking-wider font-bold mb-1">Complexity</p>
            <p className="text-2xl font-extrabold text-white mt-1">{scores.complexity.band}</p>
            <p className="text-sm text-text-muted mt-2">{scores.complexity.bandDescription}</p>
          </div>
        </div>

        {/* Helper copy */}
        <div
          style={{
            background: '#1a1a1a',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '20px 24px',
          }}
        >
          <p className="text-sm text-text-muted leading-relaxed">
            A strong Shopify Fit Score does not always mean a simple migration. Some businesses are an excellent fit for Shopify but still require a more complex implementation.
          </p>
          <p className="text-sm text-text-muted leading-relaxed mt-3">
            Likewise, a lower Readiness or Definition Confidence Score does not mean Shopify is the wrong choice. It may simply mean there are still open questions to resolve before accurate planning and scoping can begin.
          </p>
        </div>

        {/* Strengths & Considerations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-brand-green mb-3">Top Strengths</h3>
              <ul className="space-y-2">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-green mt-0.5">+</span>
                    <span className="text-white text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {considerations.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-brand-yellow mb-3">Top Considerations</h3>
              <ul className="space-y-2">
                {considerations.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-yellow mt-0.5">!</span>
                    <span className="text-white text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Gradient divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
          }}
        />

        {/* CTA */}
        <div className="text-center space-y-4">
          <button
            className="inline-block uppercase tracking-wider transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF)',
              color: '#000000',
              border: 'none',
              borderRadius: '9999px',
              padding: '14px 32px',
              fontWeight: 800,
              fontSize: '14px',
              letterSpacing: '0.06em',
              cursor: 'pointer',
            }}
          >
            {ctaText}
          </button>
          <div>
            <button
              onClick={onRestart}
              className="text-sm text-text-muted hover:text-white transition-colors underline"
            >
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
