'use client';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Logo / brand mark area */}
        <p className="text-sm uppercase tracking-widest text-text-muted font-bold">
          Avenue Z
        </p>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          style={{
            background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Shopify Migration Readiness Assessment
        </h1>

        {/* Body */}
        <p className="text-lg text-text-muted max-w-lg mx-auto leading-relaxed">
          Find out if your brand is ready to migrate to Shopify. This assessment evaluates
          your fit, readiness, requirements clarity, and migration complexity across 10
          focused sections.
        </p>

        <p className="text-sm text-text-muted">
          Takes approximately 8–12 minutes to complete.
        </p>

        {/* Gradient divider */}
        <div
          className="mx-auto"
          style={{
            width: '200px',
            height: '1px',
            background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
          }}
        />

        {/* CTA */}
        <button
          onClick={onStart}
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
          Start Assessment
        </button>

        <p className="text-xs text-text-muted">
          Your responses are confidential and used only to generate your personalized report.
        </p>
      </div>
    </div>
  );
}
