'use client';

import { Question } from '@/lib/types';

interface OpinionScaleProps {
  question: Question;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
}

export default function OpinionScale({ question, value, onChange, error }: OpinionScaleProps) {
  const labels = question.scaleLabels || { low: '1', high: '5' };

  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-white">
        {question.text}
        {question.required && <span className="text-brand-cyan ml-1">*</span>}
      </label>
      <div className="flex items-center gap-2 justify-between mt-4">
        <span className="text-sm text-text-muted w-24 text-left">{labels.low}</span>
        <div className="flex gap-2 flex-1 justify-center">
          {[1, 2, 3, 4, 5].map((n) => {
            const isSelected = value === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                className="transition-all font-bold text-lg"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: isSelected ? '#60FDFF' : '#272727',
                  border: isSelected
                    ? '2px solid #60FDFF'
                    : '2px solid rgba(255, 255, 255, 0.06)',
                  color: isSelected ? '#000000' : '#FFFFFF',
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
        <span className="text-sm text-text-muted w-24 text-right">{labels.high}</span>
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}
