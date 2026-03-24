'use client';

import { useReducer, useCallback, useMemo } from 'react';
import { sections } from '@/data/sections';
import { getQuestionsForSection } from '@/data/questions';
import { Answers, AnswerValue, Question } from '@/lib/types';
import { generateResults } from '@/lib/results';

// ── State ───────────────────────────────────────────────────────

export type AssessmentScreen = 'intro' | 'questions' | 'results';

interface AssessmentState {
  screen: AssessmentScreen;
  currentSectionIndex: number; // 0-based index into sections array
  answers: Answers;
  errors: Record<string, string>;
  submitted: boolean;
}

const initialState: AssessmentState = {
  screen: 'intro',
  currentSectionIndex: 0,
  answers: {},
  errors: {},
  submitted: false,
};

// ── Actions ─────────────────────────────────────────────────────

type Action =
  | { type: 'START' }
  | { type: 'SET_ANSWER'; questionId: string; value: AnswerValue }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREV_SECTION' }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'SUBMIT' }
  | { type: 'RESTART' };

function reducer(state: AssessmentState, action: Action): AssessmentState {
  switch (action.type) {
    case 'START':
      return { ...state, screen: 'questions', currentSectionIndex: 0 };

    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
        errors: { ...state.errors, [action.questionId]: '' },
      };

    case 'NEXT_SECTION': {
      const nextIndex = state.currentSectionIndex + 1;
      if (nextIndex >= sections.length) {
        return { ...state, screen: 'results', submitted: true };
      }
      return { ...state, currentSectionIndex: nextIndex, errors: {} };
    }

    case 'PREV_SECTION': {
      const prevIndex = state.currentSectionIndex - 1;
      if (prevIndex < 0) {
        return { ...state, screen: 'intro' };
      }
      return { ...state, currentSectionIndex: prevIndex, errors: {} };
    }

    case 'SET_ERRORS':
      return { ...state, errors: action.errors };

    case 'SUBMIT':
      return { ...state, screen: 'results', submitted: true };

    case 'RESTART':
      return initialState;

    default:
      return state;
  }
}

// ── Validation ──────────────────────────────────────────────────

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUrl(url: string): boolean {
  if (!url) return true; // URL fields are optional unless required
  try {
    // Allow URLs without protocol by prepending https://
    const testUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
    new URL(testUrl);
    return true;
  } catch {
    return false;
  }
}

function validateSection(
  sectionQuestions: Question[],
  answers: Answers
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const q of sectionQuestions) {
    const answer = answers[q.id];

    // Required check
    if (q.required) {
      if (answer === undefined || answer === null || answer === '') {
        errors[q.id] = 'This field is required';
        continue;
      }
      if (Array.isArray(answer) && answer.length === 0) {
        errors[q.id] = 'Please select at least one option';
        continue;
      }
    }

    // Type-specific validation
    if (answer && q.type === 'email' && !validateEmail(answer as string)) {
      errors[q.id] = 'Please enter a valid email address';
    }
    if (answer && q.type === 'website' && !validateUrl(answer as string)) {
      errors[q.id] = 'Please enter a valid URL';
    }
  }

  return errors;
}

// ── Hook ────────────────────────────────────────────────────────

export function useAssessment() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentSection = sections[state.currentSectionIndex];
  const currentQuestions = useMemo(
    () => (currentSection ? getQuestionsForSection(currentSection.number) : []),
    [currentSection]
  );

  const totalSections = sections.length;
  const progressPercentage = Math.round(
    ((state.currentSectionIndex) / totalSections) * 100
  );

  const start = useCallback(() => dispatch({ type: 'START' }), []);

  const setAnswer = useCallback(
    (questionId: string, value: AnswerValue) =>
      dispatch({ type: 'SET_ANSWER', questionId, value }),
    []
  );

  const nextSection = useCallback(() => {
    // Validate current section first
    const errors = validateSection(currentQuestions, state.answers);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return false;
    }
    dispatch({ type: 'NEXT_SECTION' });
    return true;
  }, [currentQuestions, state.answers]);

  const prevSection = useCallback(() => {
    dispatch({ type: 'PREV_SECTION' });
  }, []);

  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  const results = useMemo(() => {
    if (!state.submitted) return null;
    return generateResults(state.answers);
  }, [state.submitted, state.answers]);

  return {
    screen: state.screen,
    currentSection,
    currentSectionIndex: state.currentSectionIndex,
    currentQuestions,
    answers: state.answers,
    errors: state.errors,
    totalSections,
    progressPercentage,
    results,
    start,
    setAnswer,
    nextSection,
    prevSection,
    restart,
  };
}
