import { questions } from '@/data/questions';
import {
  Answers,
  AnswerValue,
  ScoreCategory,
  ScoringConfig,
  AllScores,
  ShopifyFitScore,
  ShopifyFitBand,
  MigrationReadinessScore,
  MigrationReadinessBand,
  DefinitionConfidenceScore,
  DefinitionConfidenceBand,
  ComplexityScore,
  ComplexityBand,
} from './types';

// ── Score a single question ─────────────────────────────────────

export function scoreQuestion(
  config: ScoringConfig,
  answer: AnswerValue | undefined
): number {
  if (answer === undefined || answer === null || answer === '') return 0;

  switch (config.type) {
    case 'single_select': {
      const val = answer as string;
      return config.scores[val] ?? 0;
    }

    case 'multi_select': {
      const selected = answer as string[];
      if (!Array.isArray(selected) || selected.length === 0) return 0;

      const scorableSelected = selected.filter(
        (item) => !config.excludedOptions.includes(item)
      );

      if (scorableSelected.length === 0) return 0;

      // normalized = (checked_scorable / total_scorable) × 2
      const raw = (scorableSelected.length / config.scorableCount) * 2;
      // Round to 1 decimal place
      return Math.round(raw * 10) / 10;
    }

    case 'opinion_scale': {
      const val = answer as number;
      if (config.high.includes(val)) return 2;
      if (config.mid.includes(val)) return 1;
      if (config.low.includes(val)) return 0;
      return 0;
    }
  }
}

// ── Aggregate scores by category ────────────────────────────────

interface CategoryConfig {
  questionIds: string[];
  maxPoints: number;
}

const CATEGORY_CONFIGS: Record<ScoreCategory, CategoryConfig> = {
  shopify_fit: {
    questionIds: ['Q3', 'Q8', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15'],
    maxPoints: 14,
  },
  migration_readiness: {
    questionIds: ['Q10', 'Q35', 'Q36', 'Q38', 'Q39'],
    maxPoints: 10,
  },
  definition_confidence: {
    questionIds: ['Q20', 'Q22', 'Q25', 'Q26', 'Q34', 'Q37'],
    maxPoints: 12,
  },
  complexity: {
    questionIds: [
      'Q6', 'Q7', 'Q16', 'Q17', 'Q18', 'Q21', 'Q23', 'Q24',
      'Q27', 'Q28', 'Q29', 'Q30', 'Q31', 'Q32', 'Q33',
    ],
    maxPoints: 30,
  },
};

function sumCategory(category: ScoreCategory, answers: Answers): number {
  const config = CATEGORY_CONFIGS[category];
  let total = 0;

  for (const qId of config.questionIds) {
    const question = questions.find((q) => q.id === qId);
    if (!question?.scoring) continue;
    total += scoreQuestion(question.scoring, answers[qId]);
  }

  return total;
}

// ── Band mapping ────────────────────────────────────────────────

function getShopifyFitBand(pct: number): ShopifyFitBand {
  if (pct >= 80) return 'Strong fit';
  if (pct >= 60) return 'Good fit';
  if (pct >= 40) return 'Fit needs validation';
  return 'Fit unclear';
}

function getMigrationReadinessBand(pct: number): MigrationReadinessBand {
  if (pct >= 80) return 'Ready to scope now';
  if (pct >= 60) return 'Discovery-ready';
  if (pct >= 40) return 'Discovery & planning recommended';
  return 'Let\'s build your foundation together';
}

function getDefinitionConfidenceBand(pct: number): DefinitionConfidenceBand {
  if (pct >= 80) return 'Clearly defined';
  if (pct >= 60) return 'Mostly defined';
  if (pct >= 40) return 'Several unknowns remain';
  return 'Too undefined for accurate scoping';
}

function getComplexityBand(pct: number): ComplexityBand {
  if (pct <= 25) return 'Low';
  if (pct <= 50) return 'Moderate';
  if (pct <= 75) return 'High';
  return 'Enterprise / architect-led';
}

const COMPLEXITY_DESCRIPTIONS: Record<ComplexityBand, string> = {
  'Low': 'Straightforward migration, standard Shopify capabilities likely sufficient',
  'Moderate': 'Some custom requirements, may need select apps or middleware',
  'High': 'Significant custom work expected across multiple dimensions',
  'Enterprise / architect-led': 'Complex multi-system environment requiring detailed architecture and phased approach',
};

// ── Main scoring function ───────────────────────────────────────

export function calculateAllScores(answers: Answers): AllScores {
  // Shopify Fit
  const sfRaw = sumCategory('shopify_fit', answers);
  const sfMax = CATEGORY_CONFIGS.shopify_fit.maxPoints;
  const sfPct = Math.round((sfRaw / sfMax) * 100);
  const shopifyFit: ShopifyFitScore = {
    rawPoints: sfRaw,
    maxPoints: sfMax,
    percentage: sfPct,
    band: getShopifyFitBand(sfPct),
  };

  // Migration Readiness
  const mrRaw = sumCategory('migration_readiness', answers);
  const mrMax = CATEGORY_CONFIGS.migration_readiness.maxPoints;
  const mrPct = Math.round((mrRaw / mrMax) * 100);
  const migrationReadiness: MigrationReadinessScore = {
    rawPoints: mrRaw,
    maxPoints: mrMax,
    percentage: mrPct,
    band: getMigrationReadinessBand(mrPct),
  };

  // Definition Confidence
  const dcRaw = sumCategory('definition_confidence', answers);
  const dcMax = CATEGORY_CONFIGS.definition_confidence.maxPoints;
  const dcPct = Math.round((dcRaw / dcMax) * 100);
  const definitionConfidence: DefinitionConfidenceScore = {
    rawPoints: dcRaw,
    maxPoints: dcMax,
    percentage: dcPct,
    band: getDefinitionConfidenceBand(dcPct),
  };

  // Complexity
  const cxRaw = sumCategory('complexity', answers);
  const cxMax = CATEGORY_CONFIGS.complexity.maxPoints;
  const cxPct = Math.round((cxRaw / cxMax) * 100);
  const cxBand = getComplexityBand(cxPct);
  const complexity: ComplexityScore = {
    rawPoints: cxRaw,
    maxPoints: cxMax,
    percentage: cxPct,
    band: cxBand,
    bandDescription: COMPLEXITY_DESCRIPTIONS[cxBand],
  };

  return { shopifyFit, migrationReadiness, definitionConfidence, complexity };
}
