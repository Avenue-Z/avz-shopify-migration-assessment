'use client';

import { useAssessment } from '@/hooks/useAssessment';
import IntroScreen from './IntroScreen';
import ProgressBar from './ProgressBar';
import SectionHeader from './SectionHeader';
import ResultsPage from './ResultsPage';
import QuestionRenderer from '@/components/questions/QuestionRenderer';

export default function AssessmentWizard() {
  const {
    screen,
    currentSection,
    currentSectionIndex,
    currentQuestions,
    answers,
    errors,
    totalSections,
    results,
    start,
    setAnswer,
    nextSection,
    prevSection,
    restart,
  } = useAssessment();

  // ── Intro Screen ──────────────────────────────────────────────
  if (screen === 'intro') {
    return <IntroScreen onStart={start} />;
  }

  // ── Results Screen ────────────────────────────────────────────
  if (screen === 'results' && results) {
    return <ResultsPage results={results} onRestart={restart} />;
  }

  // ── Question Sections ─────────────────────────────────────────
  const isLastSection = currentSectionIndex === totalSections - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar with progress */}
      <header className="sticky top-0 z-50 px-6 py-4" style={{ background: '#000000' }}>
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            currentSectionIndex={currentSectionIndex}
            totalSections={totalSections}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {currentSection && <SectionHeader section={currentSection} />}

          <div className="space-y-8">
            {currentQuestions.map((q) => (
              <div
                key={q.id}
                style={{
                  background: '#272727',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '24px',
                }}
              >
                <QuestionRenderer
                  question={q}
                  answers={answers}
                  error={errors[q.id]}
                  onAnswer={setAnswer}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="sticky bottom-0 z-50 px-6 py-4" style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={prevSection}
            className="transition-all hover:opacity-80"
            style={{
              background: '#3a3a3a',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Back
          </button>

          <button
            onClick={nextSection}
            className="transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider"
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
            {isLastSection ? 'See My Results' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  );
}
