'use client';

import { Question } from '@/lib/types';

interface MultiSelectProps {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export default function MultiSelect({ question, value, onChange, error }: MultiSelectProps) {
  const selected = value || [];

  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-white">
        {question.text}
      </label>
      <p className="text-sm text-text-muted">Select all that apply</p>
      <div className="grid gap-3">
        {question.options?.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className="text-left transition-all"
              style={{
                background: isSelected ? 'rgba(96, 253, 255, 0.08)' : '#272727',
                border: isSelected
                  ? '1px solid #60FDFF'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '14px 18px',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: isSelected
                      ? '2px solid #60FDFF'
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    background: isSelected ? '#60FDFF' : 'transparent',
                  }}
                >
                  {isSelected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-base text-white">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}
