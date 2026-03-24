// ── Question Types ──────────────────────────────────────────────

export type QuestionType =
  | 'short_text'
  | 'website'
  | 'email'
  | 'single_select'
  | 'multi_select'
  | 'opinion_scale'
  | 'ranking'
  | 'long_text';

export type ScoreCategory =
  | 'shopify_fit'
  | 'migration_readiness'
  | 'definition_confidence'
  | 'complexity';

// ── Scoring Config ──────────────────────────────────────────────

export interface SingleSelectScoring {
  type: 'single_select';
  category: ScoreCategory;
  /** Map of option label → point value */
  scores: Record<string, number>;
}

export interface MultiSelectScoring {
  type: 'multi_select';
  category: ScoreCategory;
  /** Total number of scorable items (excludes null options) */
  scorableCount: number;
  /** Options that are excluded from scoring */
  excludedOptions: string[];
}

export interface OpinionScaleScoring {
  type: 'opinion_scale';
  category: ScoreCategory;
  /** Which scale values map to 2, 1, or 0 points */
  high: number[]; // 2 pts
  mid: number[];  // 1 pt
  low: number[];  // 0 pts
}

export type ScoringConfig =
  | SingleSelectScoring
  | MultiSelectScoring
  | OpinionScaleScoring;

// ── Question Definition ─────────────────────────────────────────

export interface Question {
  id: string;        // e.g. "Q1"
  number: number;    // 1–43
  section: number;   // 1–10 or 11 for lead capture
  text: string;
  type: QuestionType;
  options?: string[];
  /** For ranking questions: items available to rank */
  rankingItems?: string[];
  /** For opinion_scale: low label and high label */
  scaleLabels?: { low: string; high: string };
  required?: boolean;
  scoring?: ScoringConfig;
}

// ── Section Definition ──────────────────────────────────────────

export interface Section {
  number: number;
  title: string;
  description?: string;
  questionIds: string[];
}

// ── Answer Types ────────────────────────────────────────────────

export type AnswerValue =
  | string                 // short_text, website, email, long_text, single_select
  | string[]               // multi_select, ranking (ordered array)
  | number;                // opinion_scale (1–5)

export type Answers = Record<string, AnswerValue>;

// ── Scoring Results ─────────────────────────────────────────────

export type ShopifyFitBand = 'Strong fit' | 'Good fit' | 'Fit needs validation' | 'Fit unclear';
export type MigrationReadinessBand = 'Ready to scope now' | 'Discovery-ready' | 'Early planning stage' | 'Foundational work needed';
export type DefinitionConfidenceBand = 'Clearly defined' | 'Mostly defined' | 'Several unknowns remain' | 'Too undefined for accurate scoping';
export type ComplexityBand = 'Low' | 'Moderate' | 'High' | 'Enterprise / architect-led';

export interface ScoreResult {
  rawPoints: number;
  maxPoints: number;
  percentage: number;
}

export interface ShopifyFitScore extends ScoreResult {
  band: ShopifyFitBand;
}

export interface MigrationReadinessScore extends ScoreResult {
  band: MigrationReadinessBand;
}

export interface DefinitionConfidenceScore extends ScoreResult {
  band: DefinitionConfidenceBand;
}

export interface ComplexityScore extends ScoreResult {
  band: ComplexityBand;
  bandDescription: string;
}

export interface AllScores {
  shopifyFit: ShopifyFitScore;
  migrationReadiness: MigrationReadinessScore;
  definitionConfidence: DefinitionConfidenceScore;
  complexity: ComplexityScore;
}

// ── Results ─────────────────────────────────────────────────────

export interface AssessmentResults {
  scores: AllScores;
  brandName: string;
  summary: string;
  strengths: string[];
  considerations: string[];
  ctaText: string;
  ctaType: 'book_consultation' | 'start_discovery' | 'talk_expert' | 'clarify_requirements' | 'explore_fit';
}

// ── Lead Capture ────────────────────────────────────────────────

export interface LeadData {
  name: string;       // Q41
  email: string;      // Q42
  preference: string; // Q43
}
