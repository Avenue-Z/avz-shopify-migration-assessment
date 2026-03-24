'use client';

import { Question } from '@/lib/types';

interface SingleSelectProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function SingleSelect({ question, value, onChange, error }: SingleSelectProps) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-white">
        {question.text}
        {question.required && <span className="text-brand-cyan ml-1">*</span>}
      </label>
      <div className="grid gap-3">
        {question.options?.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className="text-left transition-all"
              style={{
                background: isSelected ? 'rgba(96, 253, 255, 0.08)' : '#272727',
                border: isSelected
                  ? '1px solid #60FDFF'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '14px 18px',
                color: isSelected ? '#FFFFFF' : '#FFFFFF',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: isSelected
                      ? '2px solid #60FDFF'
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    background: isSelected ? '#60FDFF' : 'transparent',
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#000000',
                      }}
                    />
                  )}
                </div>
                <span className="text-base">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}
