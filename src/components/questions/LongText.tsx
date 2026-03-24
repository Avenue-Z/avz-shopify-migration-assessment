'use client';

import { Question } from '@/lib/types';

interface LongTextProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function LongText({ question, value, onChange, error }: LongTextProps) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-bold text-white">
        {question.text}
        {question.required && <span className="text-brand-cyan ml-1">*</span>}
      </label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your thoughts..."
        rows={4}
        className="w-full text-white text-base placeholder:text-text-muted outline-none transition-all resize-y"
        style={{
          background: '#272727',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '14px 18px',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#60FDFF';
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(96,253,255,0.15)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
