'use client';

import { Question, Answers, AnswerValue } from '@/lib/types';
import ShortText from './ShortText';
import WebsiteInput from './WebsiteInput';
import EmailInput from './EmailInput';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import OpinionScale from './OpinionScale';
import RankingInput from './RankingInput';
import LongText from './LongText';

interface QuestionRendererProps {
  question: Question;
  answers: Answers;
  error?: string;
  onAnswer: (questionId: string, value: AnswerValue) => void;
}

export default function QuestionRenderer({
  question,
  answers,
  error,
  onAnswer,
}: QuestionRendererProps) {
  const value = answers[question.id];

  switch (question.type) {
    case 'short_text':
      return (
        <ShortText
          question={question}
          value={(value as string) || ''}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    case 'website':
      return (
        <WebsiteInput
          question={question}
          value={(value as string) || ''}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    case 'email':
      return (
        <EmailInput
          question={question}
          value={(value as string) || ''}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    case 'single_select':
      return (
        <SingleSelect
          question={question}
          value={(value as string) || ''}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    case 'multi_select':
      return (
        <MultiSelect
          question={question}
          value={(value as string[]) || []}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    case 'opinion_scale':
      return (
        <OpinionScale
          question={question}
          value={value as number | undefined}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    case 'ranking':
      return (
        <RankingInput
          question={question}
          value={(value as string[]) || []}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    case 'long_text':
      return (
        <LongText
          question={question}
          value={(value as string) || ''}
          onChange={(v) => onAnswer(question.id, v)}
          error={error}
        />
      );
    default:
      return null;
  }
}
