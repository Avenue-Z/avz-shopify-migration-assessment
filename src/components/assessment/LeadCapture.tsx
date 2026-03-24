'use client';

import { Question, Answers, AnswerValue } from '@/lib/types';
import ShortText from '@/components/questions/ShortText';
import EmailInput from '@/components/questions/EmailInput';
import SingleSelect from '@/components/questions/SingleSelect';

interface LeadCaptureProps {
  questions: Question[];
  answers: Answers;
  errors: Record<string, string>;
  onAnswer: (questionId: string, value: AnswerValue) => void;
}

export default function LeadCapture({ questions, answers, errors, onAnswer }: LeadCaptureProps) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-text-muted font-bold mb-2">
          Almost done
        </p>
        <h2
          className="text-2xl md:text-3xl font-extrabold mb-3"
          style={{
            background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Get Your Results
        </h2>
        <p className="text-text-muted text-base">
          Enter your details below to see your personalized migration readiness report.
        </p>
        <div
          className="mt-6"
          style={{
            height: '1px',
            background: 'linear-gradient(135deg, #FFFC60, #60FF80, #60FDFF, #39A0FF, #6034FF)',
          }}
        />
      </div>

      {questions.map((q) => {
        if (q.type === 'short_text') {
          return (
            <ShortText
              key={q.id}
              question={q}
              value={(answers[q.id] as string) || ''}
              onChange={(v) => onAnswer(q.id, v)}
              error={errors[q.id]}
            />
          );
        }
        if (q.type === 'email') {
          return (
            <EmailInput
              key={q.id}
              question={q}
              value={(answers[q.id] as string) || ''}
              onChange={(v) => onAnswer(q.id, v)}
              error={errors[q.id]}
            />
          );
        }
        if (q.type === 'single_select') {
          return (
            <SingleSelect
              key={q.id}
              question={q}
              value={(answers[q.id] as string) || ''}
              onChange={(v) => onAnswer(q.id, v)}
              error={errors[q.id]}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
