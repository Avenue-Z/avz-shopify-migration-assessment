import {
  AllScores,
  AssessmentResults,
  Answers,
} from './types';
import { calculateAllScores } from './scoring';

// ── Strengths pool ──────────────────────────────────────────────

interface StrengthRule {
  text: string;
  test: (scores: AllScores, answers: Answers) => boolean;
  priority: number; // lower = higher priority
}

const STRENGTH_RULES: StrengthRule[] = [
  {
    text: 'Clear business case for migration',
    test: (s) => s.shopifyFit.percentage >= 60,
    priority: 1,
  },
  {
    text: 'Strong internal sponsorship',
    test: (_s, a) => {
      const val = a['Q11'] as string;
      return val === 'CEO / Founder' || val === 'Ecommerce leadership';
    },
    priority: 2,
  },
  {
    text: 'Well-defined requirements',
    test: (s) => s.definitionConfidence.percentage >= 70,
    priority: 3,
  },
  {
    text: 'Strong content and SEO preparedness',
    test: (_s, a) => {
      const val = a['Q20'] as string[] | undefined;
      return Array.isArray(val) && val.filter((v) => v !== 'None of the above').length >= 3;
    },
    priority: 4,
  },
  {
    text: 'Manageable integration environment',
    test: (_s, a) => {
      const val = a['Q24'] as string;
      return val === 'Mostly native / app-based integrations';
    },
    priority: 5,
  },
  {
    text: 'High confidence in data quality',
    test: (_s, a) => {
      const val = a['Q26'] as number;
      return val >= 4;
    },
    priority: 6,
  },
  {
    text: 'Clear ownership and internal resources',
    test: (s) => s.migrationReadiness.percentage >= 60,
    priority: 7,
  },
];

// ── Considerations pool ─────────────────────────────────────────

interface ConsiderationRule {
  text: string;
  test: (scores: AllScores, answers: Answers) => boolean;
  priority: number;
}

const CONSIDERATION_RULES: ConsiderationRule[] = [
  {
    text: 'Requirements need further definition before scoping',
    test: (s) => s.definitionConfidence.percentage < 50,
    priority: 1,
  },
  {
    text: 'Integration landscape may increase implementation complexity',
    test: (s) => s.complexity.percentage > 50,
    priority: 2,
  },
  {
    text: 'SEO and content migration planning is still incomplete',
    test: (_s, a) => {
      const val = a['Q20'] as string[] | undefined;
      if (!Array.isArray(val)) return true;
      return val.filter((v) => v !== 'None of the above').length < 3;
    },
    priority: 3,
  },
  {
    text: 'Ownership or internal resourcing needs to be clarified',
    test: (_s, a) => {
      const val = a['Q35'] as string[] | undefined;
      if (!Array.isArray(val)) return true;
      return val.includes('No dedicated team yet') || val.filter((v) => v !== 'No dedicated team yet').length < 3;
    },
    priority: 4,
  },
  {
    text: 'Checkout or payment requirements may require deeper discovery',
    test: (_s, a) => {
      const val = a['Q31'] as string[] | undefined;
      if (!Array.isArray(val)) return false;
      return val.filter((v) => v !== 'Minimal complexity').length >= 3;
    },
    priority: 5,
  },
  {
    text: 'Operational complexity may affect implementation approach',
    test: (_s, a) => {
      const val = a['Q27'] as string;
      return val === 'Very complex hybrid model' || val === 'International / multi-node';
    },
    priority: 6,
  },
];

// ── Summary paragraph generation ────────────────────────────────

function generateSummary(brandName: string, scores: AllScores): string {
  const brand = brandName || 'Your brand';

  // Shopify fit descriptor
  let fitDesc: string;
  if (scores.shopifyFit.percentage >= 80) fitDesc = 'a strong';
  else if (scores.shopifyFit.percentage >= 60) fitDesc = 'a good';
  else fitDesc = 'a possible';

  // Readiness descriptor
  let readinessDesc: string;
  if (scores.migrationReadiness.percentage >= 70) readinessDesc = 'ready to begin discovery';
  else if (scores.migrationReadiness.percentage >= 40) readinessDesc = 'in early planning';
  else readinessDesc = 'not yet ready for scoping';

  // Complexity descriptor
  let complexityDesc: string;
  switch (scores.complexity.band) {
    case 'Low': complexityDesc = 'low'; break;
    case 'Moderate': complexityDesc = 'moderate'; break;
    case 'High': complexityDesc = 'high'; break;
    case 'Enterprise / architect-led': complexityDesc = 'enterprise-level'; break;
  }

  // Definition confidence descriptor
  let definitionDesc: string;
  if (scores.definitionConfidence.percentage >= 70) definitionDesc = 'A few';
  else if (scores.definitionConfidence.percentage >= 50) definitionDesc = 'Some';
  else definitionDesc = 'Several';

  return `${brand} appears to be ${fitDesc} fit for Shopify. Your responses suggest your team is ${readinessDesc}, with a ${complexityDesc} degree of migration complexity. ${definitionDesc} important requirements may still need to be clarified before accurate scoping can begin.`;
}

// ── CTA selection ───────────────────────────────────────────────

type CtaType = AssessmentResults['ctaType'];

function selectCta(scores: AllScores): { text: string; type: CtaType } {
  const highFit = scores.shopifyFit.percentage >= 70;
  const highReadiness = scores.migrationReadiness.percentage >= 70;
  const midReadiness = scores.migrationReadiness.percentage >= 40 && scores.migrationReadiness.percentage < 70;
  const highComplexity = scores.complexity.percentage > 60;
  const lowConfidence = scores.definitionConfidence.percentage < 40;
  const lowFit = scores.shopifyFit.percentage < 40;

  if (highFit && highReadiness) {
    return { text: 'Book a migration consultation', type: 'book_consultation' };
  }
  if (highFit && midReadiness) {
    return { text: 'Start discovery planning', type: 'start_discovery' };
  }
  if (highComplexity) {
    return { text: 'Talk to a migration expert', type: 'talk_expert' };
  }
  if (lowConfidence) {
    return { text: 'Clarify your migration requirements', type: 'clarify_requirements' };
  }
  if (lowFit) {
    return { text: 'Explore whether Shopify is the right fit', type: 'explore_fit' };
  }

  // Default fallback
  return { text: 'Start discovery planning', type: 'start_discovery' };
}

// ── Main results generation ─────────────────────────────────────

export function generateResults(answers: Answers): AssessmentResults {
  const scores = calculateAllScores(answers);
  const brandName = (answers['Q1'] as string) || '';

  // Collect strengths (up to 3)
  const strengths = STRENGTH_RULES
    .filter((rule) => rule.test(scores, answers))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3)
    .map((r) => r.text);

  // Collect considerations (up to 3)
  const considerations = CONSIDERATION_RULES
    .filter((rule) => rule.test(scores, answers))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3)
    .map((r) => r.text);

  const summary = generateSummary(brandName, scores);
  const cta = selectCta(scores);

  return {
    scores,
    brandName,
    summary,
    strengths,
    considerations,
    ctaText: cta.text,
    ctaType: cta.type,
  };
}
